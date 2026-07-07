/************************************************
 * Facility OS 2.0
 * shiftUi.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { shiftService } from "../services/shiftService.js";
import { navigationService } from "../services/navigationService.js";

export function renderShiftUi() {

    const shift =
        shiftService.getCurrentShift();

    const running =
        shift?.active === true;

    renderDashboardLayout(`

<div class="section-card">

    <h2>Schicht</h2>

</div>

<div class="dashboard-grid">

<div class="dashboard-card">

<h3>Status</h3>

<p>

${running ? "🟢 Schicht läuft" : "⚪ Keine aktive Schicht"}

</p>

<button

id="toggleShift"

class="btn green"

>

${running ? "Schicht beenden" : "Schicht starten"}

</button>

</div>

${
running
?

`

<div class="dashboard-card">

<h3>Beginn</h3>

<p>

${new Date(shift.startedAt).toLocaleString()}

</p>

</div>

`

:

""

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

    bindShiftEvents();

}

function bindShiftEvents() {

    document
        .getElementById("toggleShift")
        ?.addEventListener("click", () => {

            if (shiftService.isShiftRunning()) {

                shiftService.stopShift();

            } else {

                shiftService.startShift();

            }

            renderShiftUi();

        });

    document
        .getElementById("backDashboard")
        ?.addEventListener("click", () => {

            navigationService.openDashboard();

        });

}