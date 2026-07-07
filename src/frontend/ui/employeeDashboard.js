/************************************************
 * Facility OS 2.0
 * employeeDashboard.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { router } from "../router.js";
import { shiftService } from "../services/shiftService.js";
import { appState } from "../appState.js";

export function renderEmployeeDashboard() {

    const shift =
        appState.get("currentShift");

    const shiftRunning =
        shift?.active === true;

    renderDashboardLayout(`

<div class="dashboard-grid">

    <div class="dashboard-card">

        <h2>Schicht</h2>

        <p>

            ${
                shiftRunning
                    ? "Schicht läuft"
                    : "Keine aktive Schicht"
            }

        </p>

        <button
            id="btnShift"
            class="btn green">

            ${
                shiftRunning
                    ? "Schicht beenden"
                    : "Schicht starten"
            }

        </button>

    </div>

    <div class="dashboard-card">

        <h2>Räume</h2>

        <p>

            Räume des aktuellen Objektes

        </p>

        <button
            id="btnRooms"
            class="btn">

            Räume öffnen

        </button>

    </div>

    <div class="dashboard-card">

        <h2>Aufgaben</h2>

        <p>

            Offene Aufgaben anzeigen

        </p>

        <button
            id="btnTasks"
            class="btn">

            Aufgaben

        </button>

    </div>

    <div class="dashboard-card">

        <h2>Material</h2>

        <p>

            Materialbestand

        </p>

        <button
            id="btnMaterial"
            class="btn">

            Material

        </button>

    </div>

    <div class="dashboard-card">

        <h2>Tickets</h2>

        <p>

            Wünsche & Beschwerden

        </p>

        <button
            id="btnTickets"
            class="btn">

            Tickets

        </button>

    </div>

    <div class="dashboard-card">

        <h2>Postfach</h2>

        <p>

            Nachrichten ansehen

        </p>

        <button
            id="btnMailbox"
            class="btn">

            Postfach

        </button>

    </div>

</div>

`);

    bindDashboardEvents();

}

/************************************************
 * Events
 ************************************************/

function bindDashboardEvents() {

    document
        .getElementById("btnShift")
        ?.addEventListener("click", () => {

            if (shiftService.isShiftRunning()) {

                shiftService.stopShift();

            } else {

                shiftService.startShift();

            }

            renderEmployeeDashboard();

        });

    document
        .getElementById("btnRooms")
        ?.addEventListener("click", () => {

            router.go("rooms");

        });

    document
        .getElementById("btnTasks")
        ?.addEventListener("click", () => {

            router.go("tasks");

        });

    document
        .getElementById("btnMaterial")
        ?.addEventListener("click", () => {

            router.go("materials");

        });

    document
        .getElementById("btnTickets")
        ?.addEventListener("click", () => {

            router.go("tickets");

        });

    document
        .getElementById("btnMailbox")
        ?.addEventListener("click", () => {

            router.go("mailbox");

        });

}