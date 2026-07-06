/************************************************
 * Facility OS 2.0
 * roomUi.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { objectService } from "../services/objectService.js";
import { navigationService } from "../services/navigationService.js";

export function renderRoomUi() {

    const rooms = objectService.getRooms();

    renderDashboardLayout(`

<div class="section-card">

    <h2>Räume</h2>

</div>

<div class="dashboard-grid">

    ${rooms.length === 0 ?

        `

        <div class="dashboard-card">

            Keine Räume vorhanden.

        </div>

        `

        :

        rooms.map(room => `

        <div class="dashboard-card">

            <h3>

                ${room.name}

            </h3>

            <p>

                ${room.description || ""}

            </p>

            <button

                class="btn green roomButton"

                data-id="${room.id}"

            >

                Raum öffnen

            </button>

        </div>

        `).join("")

    }

</div>

<div class="section-card">

    <button

        id="btnBackDashboard"

        class="btn"

    >

        ← Dashboard

    </button>

</div>

`);

    bindRoomEvents();

}

/************************************************
 * Events
 ************************************************/

function bindRoomEvents() {

    document
        .getElementById("btnBackDashboard")
        ?.addEventListener("click", () => {

            navigationService.openDashboard();

        });

    document
        .querySelectorAll(".roomButton")
        .forEach(button => {

            button.addEventListener("click", () => {

                console.log(

                    "Raum geöffnet:",

                    button.dataset.id

                );

                // Phase 3:
                // navigationService.openRoomDetails()

            });

        });

}