/************************************************
 * Facility OS 2.0
 * dashboardLayout.js
 ************************************************/

import { appState } from "../appState.js";

export function renderDashboardLayout(content = "") {

    const app = document.getElementById("app");

    if (!app) return;

    const user = appState.get("currentUser");
    const object = appState.get("selectedObject");

    app.innerHTML = `

<div class="app-shell">

    <header class="header-card">

        <div>

            <h1>

                Facility OS

            </h1>

            <p>

                ${user?.name || ""}

            </p>

            <p>

                ${user?.role || ""}

            </p>

        </div>

        <div>

            <button

                id="btnNotifications"

                class="btn"

            >

                🔔

            </button>

        </div>

    </header>

    <section class="section-card">

        <h2>

            ${object?.name || ""}

        </h2>

        <p>

            ${object?.address || ""}

        </p>

    </section>

    <main>

        ${content}

    </main>

    <footer class="bottom-navigation">

        <button id="navDashboard">

            Dashboard

        </button>

        <button id="navRooms">

            Räume

        </button>

        <button id="navTasks">

            Aufgaben

        </button>

        <button id="navMore">

            Mehr

        </button>

    </footer>

</div>

`;

}