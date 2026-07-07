/************************************************
 * Facility OS 2.0
 * roomService.js
 ************************************************/

import { appState } from "../appState.js";
import { dataService } from "./dataService.js";
import { eventBus } from "./eventBus.js";

class RoomService {

    /********************************************
     * Aktuelles Objekt
     ********************************************/

    getRooms() {

        const object =
            appState.get("selectedObject");

        if (!object) {

            return [];

        }

        return dataService

            .get("rooms")

            .filter(room =>

                room.objectId === object.id

            );

    }

    /********************************************
     * Raum auswählen
     ********************************************/

    selectRoom(roomId) {

        const room =

            this.getRooms()

            .find(room =>

                room.id === roomId

            );

        if (!room) {

            throw new Error(

                "Raum wurde nicht gefunden."

            );

        }

        appState.set(

            "selectedRoom",

            room

        );

        eventBus.emit(

            "roomSelected",

            room

        );

        return room;

    }

    /********************************************
     * Aktueller Raum
     ********************************************/

    getCurrentRoom() {

        return appState.get(

            "selectedRoom"

        );

    }

    /********************************************
     * Raum verlassen
     ********************************************/

    clearRoom() {

        appState.set(

            "selectedRoom",

            null

        );

        eventBus.emit(

            "roomClosed"

        );

    }

    /********************************************
     * Aufgaben
     ********************************************/

    getTasks() {

        const room =
            this.getCurrentRoom();

        if (!room) return [];

        return dataService

            .get("tasks")

            .filter(task =>

                task.roomId === room.id

            );

    }

    /********************************************
     * Material
     ********************************************/

    getMaterial() {

        const room =
            this.getCurrentRoom();

        if (!room) return [];

        return dataService

            .get("materials")

            .filter(material =>

                material.roomId === room.id

            );

    }

    /********************************************
     * Tickets
     ********************************************/

    getTickets() {

        const room =
            this.getCurrentRoom();

        if (!room) return [];

        return dataService

            .get("customerRequests")

            .filter(ticket =>

                ticket.roomId === room.id

            );

    }

    /********************************************
     * Fotos
     ********************************************/

    getPhotos() {

        const room =
            this.getCurrentRoom();

        if (!room) return [];

        return dataService

            .get("photos")

            .filter(photo =>

                photo.roomId === room.id

            );

    }

}

export const roomService =
    new RoomService();