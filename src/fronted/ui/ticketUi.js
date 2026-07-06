/************************************************
 * Facility OS 2.0
 * ticketUi.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { roomService } from "../services/roomService.js";
import { navigationService } from "../services/navigationService.js";

export function renderTicketUi() {

    const tickets = roomService.getTickets();

    renderDashboardLayout(`

<div class="section-card">

    <h2>Wünsche & Beschwerden</h2>

    <button
        id="newTicket"
        class="btn green">

        + Neue Meldung

    </button>

</div>

<div class="dashboard-grid">

${
tickets.length === 0

?

`

<div class="dashboard-card">

Noch keine Meldungen vorhanden.

</div>

`

:

tickets.map(ticket => `

<div class="dashboard-card">

<h3>

${ticket.title}

</h3>

<p>

${ticket.description || ""}

</p>

<p>

Status:
<b>${ticket.status}</b>

</p>

<p>

Priorität:
<b>${ticket.priority || "Normal"}</b>

</p>

</div>

`).join("")

}

</div>

<div class="section-card">

<button

id="backRoom"

class="btn"

>

← Zum Raum

</button>

</div>

`);

    bindTicketEvents();

}

function bindTicketEvents() {

    document
        .getElementById("backRoom")
        ?.addEventListener("click", () => {

            navigationService.openRooms();

        });

    document
        .getElementById("newTicket")
        ?.addEventListener("click", () => {

            // Phase 2:
            // Ticket-Dialog öffnen

            console.log("Neues Ticket");

        });

}