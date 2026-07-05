/************************************************
 * Facility OS 2.0
 * router.js
 *
 * Zentrale Navigation
 ************************************************/

import { appState } from "./appState.js";

import { renderLogin } from "./ui/loginUi.js";
import { renderEmployeeDashboard } from "./ui/employeeDashboard.js";
import { renderManagerDashboard } from "./ui/managerDashboard.js";
import { renderAccountingDashboard } from "./ui/accountingDashboard.js";
import { renderAdminDashboard } from "./ui/adminDashboard.js";
import { renderCustomerDashboard } from "./ui/customerDashboard.js";
import { renderObjectSelection } from "./ui/objectSelectionUi.js";
import { renderRoomUi } from "./ui/roomUi.js";

class Router {

    constructor() {

        this.currentRoute = "login";

    }

    /********************************************
     * Navigation
     ********************************************/

    go(route) {

        this.currentRoute = route;

        appState.update("ui", {

            currentView: route

        });

        this.render();

    }

    /********************************************
     * Routing
     ********************************************/

    render() {

        const user =
            appState.get("currentUser");

        const role =
            appState.get("currentRole");

        const object =
            appState.get("selectedObject");

        switch (this.currentRoute) {

            case "login":

                renderLogin();

                break;

            case "dashboard":

                if (!user) {

                    this.go("login");

                    return;

                }

                switch (role) {

                    case "Mitarbeiter":

                        renderEmployeeDashboard();

                        break;

                    case "Objektleiter":

                        renderManagerDashboard();

                        break;

                    case "Buchhaltung":

                        renderAccountingDashboard();

                        break;

                    case "Admin":

                        renderAdminDashboard();

                        break;

                    case "Kunde":

                        renderCustomerDashboard();

                        break;

                    default:

                        renderLogin();

                }

                break;

            case "objects":

                renderObjectSelection();

                break;

            case "rooms":

                if (!object) {

                    this.go("objects");

                    return;

                }

                renderRoomUi();

                break;

            default:

                renderLogin();

        }

    }

    /********************************************
     * Helfer
     ********************************************/

    refresh() {

        this.render();

    }

    getCurrentRoute() {

        return this.currentRoute;

    }

}

export const router = new Router();