/************************************************
 * Facility OS 2.0
 * taskUi.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { taskService } from "../services/taskService.js";
import { navigationService } from "../services/navigationService.js";

export function renderTaskUi() {

    const tasks = taskService.getTasks();

    renderDashboardLayout(`

<div class="section-card">

    <h2>Aufgaben</h2>

</div>

<div class="dashboard-grid">

${
tasks.length === 0

?

`

<div class="dashboard-card">

Keine Aufgaben vorhanden.

</div>

`

:

tasks.map(task => `

<div class="dashboard-card">

<h3>

${task.title}

</h3>

<p>

${task.description || ""}

</p>

<p>

Status:

<b>

${task.completed ? "Erledigt" : "Offen"}

</b>

</p>

<button

class="btn green completeTask"

data-id="${task.id}"

>

${task.completed ? "Erledigt" : "Erledigen"}

</button>

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

    bindTaskEvents();

}

function bindTaskEvents() {

    document
        .getElementById("backRoom")
        ?.addEventListener("click", () => {

            navigationService.openRooms();

        });

    document
        .querySelectorAll(".completeTask")
        .forEach(button => {

            button.addEventListener("click", () => {

                taskService.completeTask(

                    button.dataset.id

                );

                renderTaskUi();

            });

        });

}