/************************************************
 * Facility OS 2.0
 * materialUi.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { roomService } from "../services/roomService.js";
import { navigationService } from "../services/navigationService.js";

export function renderMaterialUi() {

    const materials = roomService.getMaterial();

    renderDashboardLayout(`

<div class="section-card">

    <h2>Material</h2>

</div>

<div class="dashboard-grid">

${
materials.length === 0

?

`

<div class="dashboard-card">

Kein Material vorhanden.

</div>

`

:

materials.map(material => `

<div class="dashboard-card">

<h3>

${material.name}

</h3>

<p>

Bestand:
<b>${material.quantity}</b>

</p>

<p>

Einheit:
${material.unit || ""}

</p>

<button

class="btn useMaterial"

data-id="${material.id}"

>

Verbrauch buchen

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

    bindMaterialEvents();

}

function bindMaterialEvents() {

    document
        .getElementById("backRoom")
        ?.addEventListener("click", () => {

            navigationService.openRooms();

        });

    document
        .querySelectorAll(".useMaterial")
        .forEach(button => {

            button.addEventListener("click", () => {

                // Phase 2:
                // materialService.consume()

                console.log(
                    "Materialverbrauch:",
                    button.dataset.id
                );

            });

        });

}