/************************************************
 * Facility OS 2.0
 * objectSelectionUi.js
 ************************************************/

import { objectService } from "../services/objectService.js";
import { router } from "../router.js";

export function renderObjectSelection() {

    const app = document.getElementById("app");

    if (!app) return;

    const objects =
        objectService.getAvailableObjects();

    app.innerHTML = `

<div class="app-shell">

    <div class="header-card">

        <h1>Objekt auswählen</h1>

        <p>${objects.length} verfügbare Objekte</p>

    </div>

    <div class="section-card">

        <input
            id="objectSearch"
            class="input"
            type="text"
            placeholder="Objekt suchen...">

    </div>

    <div
        id="objectList"
        class="section-card">

    </div>

</div>

`;

    renderObjectList(objects);

    document
        .getElementById("objectSearch")
        .addEventListener(

            "input",

            filterObjects

        );

}

/************************************************
 * Liste
 ************************************************/

function renderObjectList(objects) {

    const container =
        document.getElementById("objectList");

    if (!container) return;

    if (objects.length === 0) {

        container.innerHTML = `

<div class="info-card">

Keine Objekte freigegeben.

</div>

`;

        return;

    }

    container.innerHTML =
        objects.map(object => `

<div
class="object-card">

<h3>

${object.name}

</h3>

<p>

${object.address || ""}

</p>

<button

class="btn green"

data-id="${object.id}"

>

Objekt öffnen

</button>

</div>

`).join("");

    container

        .querySelectorAll("button")

        .forEach(button => {

            button.onclick = () => {

                objectService.selectObject(

                    button.dataset.id

                );

                router.go("dashboard");

            };

        });

}

/************************************************
 * Suche
 ************************************************/

function filterObjects(event) {

    const text =
        event.target.value
            .toLowerCase();

    const objects =
        objectService

            .getAvailableObjects()

            .filter(object =>

                object.name
                    .toLowerCase()
                    .includes(text)

            );

    renderObjectList(objects);

}