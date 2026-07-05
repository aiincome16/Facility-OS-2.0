/************************************************
 * Facility OS 2.0
 * objectService.js
 ************************************************/

import { appState } from "../appState.js";
import { dataService } from "./dataService.js";
import { eventBus } from "./eventBus.js";
import { authService } from "./authService.js";

class ObjectService {

    /********************************************
     * Freigegebene Objekte
     ********************************************/

    getAvailableObjects() {

        return authService.getAssignedObjects();

    }

    /********************************************
     * Objekt auswählen
     ********************************************/

    selectObject(objectId) {

        const objects =
            this.getAvailableObjects();

        const object =
            objects.find(
                item => item.id === objectId
            );

        if (!object) {

            throw new Error(
                "Objekt nicht freigegeben."
            );

        }

        appState.set(
            "selectedObject",
            object
        );

        localStorage.setItem(
            "selectedObject",
            JSON.stringify(object)
        );

        eventBus.emit(
            "objectChanged",
            object
        );

        return object;

    }

    /********************************************
     * Letztes Objekt laden
     ********************************************/

    restoreSelectedObject() {

        const saved =
            localStorage.getItem(
                "selectedObject"
            );

        if (!saved) {

            return null;

        }

        try {

            const object =
                JSON.parse(saved);

            const available =
                this.getAvailableObjects();

            const exists =
                available.find(
                    item => item.id === object.id
                );

            if (!exists) {

                localStorage.removeItem(
                    "selectedObject"
                );

                return null;

            }

            appState.set(
                "selectedObject",
                exists
            );

            return exists;

        } catch {

            localStorage.removeItem(
                "selectedObject"
            );

            return null;

        }

    }

    /********************************************
     * Objekt verlassen
     ********************************************/

    clearSelectedObject() {

        appState.set(
            "selectedObject",
            null
        );

        appState.set(
            "selectedRoom",
            null
        );

        localStorage.removeItem(
            "selectedObject"
        );

        eventBus.emit(
            "objectCleared"
        );

    }

    /********************************************
     * Aktuelles Objekt
     ********************************************/

    getCurrentObject() {

        return appState.get(
            "selectedObject"
        );

    }

    /********************************************
     * Räume des Objektes
     ********************************************/

    getRooms() {

        const object =
            this.getCurrentObject();

        if (!object) {

            return [];

        }

        return dataService
            .get("rooms")
            .filter(
                room =>
                    room.objectId === object.id
            );

    }

}

export const objectService =
    new ObjectService();