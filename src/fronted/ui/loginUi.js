/************************************************
 * Facility OS 2.0
 * loginUi.js
 ************************************************/

import { authService } from "../services/authService.js";
import { router } from "../router.js";
import { objectService } from "../services/objectService.js";

export function renderLogin() {

    const app = document.getElementById("app");

    if (!app) return;

    app.innerHTML = `

<div class="app-shell">

    <div class="header-card">

        <h1>Facility OS</h1>

        <p>Version 2.0</p>

    </div>

    <div class="section-card">

        <div class="form-group">

            <label>E-Mail</label>

            <input
                id="loginEmail"
                type="email"
                placeholder="E-Mail">

        </div>

        <div class="form-group">

            <label>Passwort</label>

            <input
                id="loginPassword"
                type="password"
                placeholder="Passwort">

        </div>

        <button
            id="btnLogin"
            class="btn green">

            Anmelden

        </button>

        <div
            id="loginError"
            class="error-message"
            style="display:none;margin-top:15px;">

        </div>

    </div>

</div>

`;

    document
        .getElementById("btnLogin")
        .addEventListener("click", login);

    document
        .getElementById("loginPassword")
        .addEventListener("keydown", e => {

            if (e.key === "Enter") {

                login();

            }

        });

}

async function login() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;

    const errorBox =
        document.getElementById("loginError");

    errorBox.style.display = "none";

    try {

        const user =
            await authService.login(
                email,
                password
            );

        const objects =
            objectService.getAvailableObjects();

        if (objects.length === 1) {

            objectService.selectObject(
                objects[0].id
            );

            router.go("dashboard");

            return;

        }

        router.go("objects");

    }

    catch (error) {

        errorBox.style.display = "block";

        errorBox.innerText =
            error.message;

    }

}