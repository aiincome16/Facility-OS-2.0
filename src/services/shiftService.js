/************************************************
 * Facility OS 2.0
 * shiftService.js
 ************************************************/

import { appState } from "../appState.js";
import { dataService } from "./dataService.js";
import { eventBus } from "./eventBus.js";

class ShiftService {

    /********************************************
     * Schicht starten
     ********************************************/

    startShift() {

        const user = appState.get("currentUser");
        const object = appState.get("selectedObject");

        if (!user) {
            throw new Error("Kein Benutzer angemeldet.");
        }

        if (!object) {
            throw new Error("Kein Objekt ausgewählt.");
        }

        const shift = {

            id: crypto.randomUUID(),

            userId: user.id,

            objectId: object.id,

            organizationId: user.organizationId,

            startTime: new Date().toISOString(),

            endTime: null,

            active: true,

            roomsCompleted: 0,

            tasksCompleted: 0,

            createdAt: new Date().toISOString()

        };

        dataService.add("shifts", shift);

        appState.set("currentShift", shift);

        localStorage.setItem(
            "currentShift",
            JSON.stringify(shift)
        );

        eventBus.emit("shiftStarted", shift);

        return shift;

    }

    /********************************************
     * Schicht beenden
     ********************************************/

    stopShift() {

        const shift = appState.get("currentShift");

        if (!shift || !shift.active) {

            throw new Error(
                "Keine aktive Schicht."
            );

        }

        shift.active = false;

        shift.endTime = new Date().toISOString();

        dataService.update(

            "shifts",

            shift.id,

            shift

        );

        appState.set("currentShift", null);

        localStorage.removeItem(
            "currentShift"
        );

        eventBus.emit(

            "shiftStopped",

            shift

        );

        return shift;

    }

    /********************************************
     * Laufende Schicht laden
     ********************************************/

    restoreShift() {

        const saved =

            localStorage.getItem(
                "currentShift"
            );

        if (!saved) {

            return null;

        }

        try {

            const shift =
                JSON.parse(saved);

            appState.set(
                "currentShift",
                shift
            );

            return shift;

        } catch {

            localStorage.removeItem(
                "currentShift"
            );

            return null;

        }

    }

    /********************************************
     * Status
     ********************************************/

    isShiftRunning() {

        const shift =
            appState.get("currentShift");

        return !!(

            shift &&
            shift.active

        );

    }

    /********************************************
     * Aktuelle Schicht
     ********************************************/

    getCurrentShift() {

        return appState.get(
            "currentShift"
        );

    }

}

export const shiftService =
    new ShiftService();