/************************************************
 * Facility OS 2.0
 * mailboxUi.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { notificationService } from "../services/notificationService.js";
import { navigationService } from "../services/navigationService.js";

export function renderMailboxUi() {

    const messages =
        notificationService.getMyNotifications();

    renderDashboardLayout(`

<div class="section-card">

    <h2>Postfach</h2>

</div>

<div class="dashboard-grid">

${
messages.length === 0

?

`

<div class="dashboard-card">

Keine Nachrichten vorhanden.

</div>

`

:

messages.map(message => `

<div class="dashboard-card">

<h3>

${message.title}

</h3>

<p>

${message.message}

</p>

<p>

${new Date(message.createdAt)
    .toLocaleString()}

</p>

<p>

Status:
<b>

${message.read ? "Gelesen" : "Neu"}

</b>

</p>

<button

class="btn readMessage"

data-id="${message.id}"

>

Als gelesen markieren

</button>

</div>

`).join("")

}

</div>

<div class="section-card">

<button

id="backDashboard"

class="btn"

>

← Dashboard

</button>

</div>

`);

    bindMailboxEvents();

}

function bindMailboxEvents() {

    document
        .getElementById("backDashboard")
        ?.addEventListener("click", () => {

            navigationService.openDashboard();

        });

    document
        .querySelectorAll(".readMessage")
        .forEach(button => {

            button.addEventListener("click", () => {

                notificationService.markAsRead(

                    button.dataset.id

                );

                renderMailboxUi();

            });

        });

}