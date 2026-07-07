/************************************************
 * Facility OS 2.0
 * roomWorkspaceUi.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { roomService } from "../services/roomService.js";
import { navigationService } from "../services/navigationService.js";

export function renderRoomWorkspace() {

    const room = roomService.getCurrentRoom();

    if (!room) {

        navigationService.openRooms();
        return;

    }

    renderDashboardLayout(`

<div class="section-card">

    <h2>${room.name}</h2>

    <p>${room.description || ""}</p>

</div>

<div class="dashboard-grid">

    <div class="dashboard-card">

        <h3>Aufgaben</h3>

        <button
            id="btnTasks"
            class="btn">

            Öffnen

        </button>

    </div>

    <div class="dashboard-card">

        <h3>Material</h3>

        <button
            id="btnMaterials"
            class="btn">

            Öffnen

        </button>

    </div>

    <div class="dashboard-card">

        <h3>Tickets</h3>

        <button
            id="btnTickets"
            class="btn">

            Öffnen

        </button>

    </div>

</div>

<div class="section-card">

    <button
        id="btnBack"
        class="btn">

        ← Räume

    </button>

</div>

`);

    bindRoomWorkspaceEvents();

}

function bindRoomWorkspaceEvents() {

    document
        .getElementById("btnTasks")
        ?.addEventListener("click", () => {

            navigationService.openTasks();

        });

    document
        .getElementById("btnMaterials")
        ?.addEventListener("click", () => {

            navigationService.openMaterials();

        });

    document
        .getElementById("btnTickets")
        ?.addEventListener("click", () => {

            navigationService.openTickets();

        });

    document
        .getElementById("btnBack")
        ?.addEventListener("click", () => {

            navigationService.openRooms();

        });

}