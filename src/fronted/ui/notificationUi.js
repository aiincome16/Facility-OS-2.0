/************************************************
 * Facility OS 2.0
 * notificationUi.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { notificationService } from "../services/notificationService.js";
import { navigationService } from "../services/navigationService.js";

export function renderNotificationUi() {

    const notifications =
        notificationService.getUnread();

    renderDashboardLayout(`

<div class="section-card">

    <h2>Benachrichtigungen</h2>

</div>

<div class="dashboard-grid">

${notifications.length === 0

?

`

<div class="dashboard-card">

Keine neuen Benachrichtigungen.

</div>

`

:

notifications.map(notification => `

<div class="dashboard-card">

<h3>

${notification.title}

</h3>

<p>

${notification.message}

</p>

<p>

Priorität:
<b>${notification.priority}</b>

</p>

<button

class="btn markRead"

data-id="${notification.id}"

>

Als gelesen markieren

</button>

</div>

`).join("")

}

</div>

<div class="section-card">

<button

id="markAll"

class="btn green"

>

Alle als gelesen markieren

</button>

<button

id="backDashboard"

class="btn"

>

← Dashboard

</button>

</div>

`);

    bindNotificationEvents();

}

function bindNotificationEvents() {

    document
        .querySelectorAll(".markRead")
        .forEach(button => {

            button.onclick = () => {

                notificationService.markAsRead(

                    button.dataset.id

                );

                renderNotificationUi();

            };

        });

    document
        .getElementById("markAll")
        ?.addEventListener("click", () => {

            notificationService.markAllAsRead();

            renderNotificationUi();

        });

    document
        .getElementById("backDashboard")
        ?.addEventListener("click", () => {

            navigationService.openDashboard();

        });

}