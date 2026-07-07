/************************************************
 * Facility OS 2.0
 * app.js
 *
 * Einstiegspunkt der Anwendung
 ************************************************/

import { APP_CONFIG } from "./config.js";
import { appState } from "./appState.js";
import { router } from "./router.js";

import { loadAppData } from "./services/loadAppData.js";

class FacilityApp {

    async start() {

        try {

            console.log(
                `${APP_CONFIG.appName} ${APP_CONFIG.version}`
            );

            this.initErrorHandler();

            this.initNetworkListener();

            appState.initialize();

            await this.restoreSession();

            await loadAppData();

            this.startRouting();

        } catch (error) {

            console.error(error);

            this.showFatalError(error);

        }

    }

    /********************************************
     * Sitzung wiederherstellen
     ********************************************/

    async restoreSession() {

        const savedUser =
            localStorage.getItem("facilityUser");

        const savedObject =
            localStorage.getItem("selectedObject");

        if (savedUser) {

            appState.set(
                "currentUser",
                JSON.parse(savedUser)
            );

            appState.set(
                "currentRole",
                JSON.parse(savedUser).role
            );

        }

        if (savedObject) {

            appState.set(
                "selectedObject",
                JSON.parse(savedObject)
            );

        }

    }

    /********************************************
     * Routing starten
     ********************************************/

    startRouting() {

        const user =
            appState.get("currentUser");

        const object =
            appState.get("selectedObject");

        if (!user) {

            router.go("login");

            return;

        }

        if (!object) {

            router.go("objects");

            return;

        }

        router.go("dashboard");

    }

    /********************************************
     * Netzwerkstatus
     ********************************************/

    initNetworkListener() {

        window.addEventListener(

            "online",

            () => {

                appState.update(

                    "app",

                    {

                        online: true

                    }

                );

            }

        );

        window.addEventListener(

            "offline",

            () => {

                appState.update(

                    "app",

                    {

                        online: false

                    }

                );

            }

        );

    }

    /********************************************
     * Fehlerbehandlung
     ********************************************/

    initErrorHandler() {

        window.onerror = (

            message,

            source,

            line,

            column,

            error

        ) => {

            console.error(

                message,

                source,

                line,

                column,

                error

            );

            this.showFatalError(error);

        };

    }

    showFatalError(error) {

        const app =
            document.getElementById("app");

        if (!app) return;

        app.innerHTML = `

<div class="app-shell">

    <div class="info-card red">

        <h2>

            Facility OS

        </h2>

        <p>

            Ein schwerer Fehler ist aufgetreten.

        </p>

        <pre>

${error?.message || error}

        </pre>

    </div>

</div>

`;

    }

}

export const facilityApp =
    new FacilityApp();

/********************************************
 * Start
 ********************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        facilityApp.start();

    }

);