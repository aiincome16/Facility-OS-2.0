/************************************************
 * Facility OS 2.0
 * sessionService.js
 ************************************************/

import { storageService } from "./storageService.js";
import { appState } from "../appState.js";

class SessionService {

    restore() {

        const user = storageService.get("facilityUser");

        const object = storageService.get("selectedObject");

        if (user) {

            appState.set("currentUser", user);
            appState.set("currentRole", user.role);

        }

        if (object) {

            appState.set("selectedObject", object);

        }

    }

    saveUser(user) {

        storageService.set("facilityUser", user);

        appState.set("currentUser", user);
        appState.set("currentRole", user.role);

    }

    saveObject(object) {

        storageService.set("selectedObject", object);

        appState.set("selectedObject", object);

    }

    logout() {

        storageService.remove("facilityUser");
        storageService.remove("selectedObject");

        appState.reset();

    }

}

export const sessionService = new SessionService();