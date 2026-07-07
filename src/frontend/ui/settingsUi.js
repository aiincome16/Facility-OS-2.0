/************************************************
 * Facility OS 2.0
 * settingsUi.js
 ************************************************/

import { renderDashboardLayout } from "./dashboardLayout.js";
import { navigationService } from "../services/navigationService.js";

export function renderSettingsUi() {

    renderDashboardLayout(`

<div class="section-card">

    <h2>Einstellungen</h2>

</div>

<div class="dashboard-grid">

    <div class="dashboard-card">

        <h3>Profil</h3>

        <button
            id="btnProfile"
            class="btn">

            Profil öffnen

        </button>

    </div>

    <div class="dashboard-card">

        <h3>Passwort</h3>

        <button
            id="btnPassword"
            class="btn">

            Passwort ändern

        </button>

    </div>

    <div class="dashboard-card">

        <h3>Darstellung</h3>

        <button
            id="btnTheme"
            class="btn">

            Design

        </button>

    </div>

    <div class="dashboard-card">

        <h3>Synchronisation</h3>

        <button
            id="btnSync"
            class="btn green">

            Jetzt synchronisieren

        </button>

    </div>

    <div class="dashboard-card">

        <h3>Abmelden</h3>

        <button
            id="btnLogout"
            class="btn danger">

            Logout

        </button>

    </div>

</div>

<div class="section-card">

    <button
        id="btnBack"
        class="btn">

        ← Dashboard

    </button>

</div>

`);

    bindSettingsEvents();

}

function bindSettingsEvents() {

    document
        .getElementById("btnBack")
        ?.addEventListener("click", () => {

            navigationService.openDashboard();

        });

    document
        .getElementById("btnLogout")
        ?.addEventListener("click", () => {

            localStorage.removeItem("facilityUser");

            navigationService.openLogin();

        });

    document
        .getElementById("btnSync")
        ?.addEventListener("click", () => {

            console.log("Synchronisation gestartet");

        });

}