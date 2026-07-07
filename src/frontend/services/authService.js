/************************************************
 * Facility OS 2.0
 * authService.js
 ************************************************/

import { appState } from "../appState.js";
import { dataService } from "./dataService.js";
import { eventBus } from "./eventBus.js";

class AuthService {

    /********************************************
     * Login
     ********************************************/

    async login(email, password) {

        const users = dataService.get("users");

        const user = users.find(u =>
            u.email === email &&
            u.password === password &&
            u.active === true
        );

        if (!user) {

            throw new Error(
                "Benutzer oder Passwort falsch."
            );

        }

        appState.set("currentUser", user);

        appState.set("currentRole", user.role);

        appState.set(
            "organizationId",
            user.organizationId
        );

        appState.set(
            "permissions",
            user.permissions || []
        );

        localStorage.setItem(
            "facilityUser",
            JSON.stringify(user)
        );

        eventBus.emit(
            "loginSuccess",
            user
        );

        return user;

    }

    /********************************************
     * Logout
     ********************************************/

    logout() {

        localStorage.removeItem(
            "facilityUser"
        );

        localStorage.removeItem(
            "selectedObject"
        );

        appState.reset();

        eventBus.emit("logout");

    }

    /********************************************
     * Session laden
     ********************************************/

    restoreSession() {

        const saved =
            localStorage.getItem(
                "facilityUser"
            );

        if (!saved) {

            return false;

        }

        try {

            const user =
                JSON.parse(saved);

            appState.set(
                "currentUser",
                user
            );

            appState.set(
                "currentRole",
                user.role
            );

            appState.set(
                "organizationId",
                user.organizationId
            );

            appState.set(
                "permissions",
                user.permissions || []
            );

            return true;

        } catch {

            localStorage.removeItem(
                "facilityUser"
            );

            return false;

        }

    }

    /********************************************
     * Rolle
     ********************************************/

    hasRole(role) {

        const user =
            appState.get("currentUser");

        if (!user) return false;

        return user.role === role;

    }

    /********************************************
     * Berechtigung
     ********************************************/

    hasPermission(permission) {

        const permissions =
            appState.get("permissions");

        return permissions.includes(
            permission
        );

    }

    /********************************************
     * Objektfreigabe
     ********************************************/

    getAssignedObjects() {

        const user =
            appState.get("currentUser");

        if (!user) return [];

        const objects =
            dataService.get("objects");

        return objects.filter(object =>
            user.assignedObjects?.includes(
                object.id
            )
        );

    }

    /********************************************
     * Benutzer
     ********************************************/

    getCurrentUser() {

        return appState.get(
            "currentUser"
        );

    }

}

export const authService =
    new AuthService();
