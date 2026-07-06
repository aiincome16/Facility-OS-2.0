/************************************************
 * Facility OS Platform
 * workOrderService.js
 ************************************************/

import { appState } from "../appState.js";
import { dataService } from "./dataService.js";
import { eventBus } from "./eventBus.js";
import { roomService } from "./roomService.js";

class WorkOrderService {

    /********************************************
     * Arbeitsaufträge des aktuellen Raums
     ********************************************/

    getWorkOrders() {

        const room = roomService.getCurrentRoom();

        if (!room) return [];

        return dataService
            .get("workOrders")
            .filter(order =>
                order.roomId === room.id
            );

    }

    /********************************************
     * Offene Arbeitsaufträge
     ********************************************/

    getOpen() {

        return this
            .getWorkOrders()
            .filter(order =>
                order.status !== "completed"
            );

    }

    /********************************************
     * Arbeitsauftrag laden
     ********************************************/

    get(id) {

        return dataService
            .get("workOrders")
            .find(order =>
                order.id === id
            );

    }

    /********************************************
     * Neuen Arbeitsauftrag erstellen
     ********************************************/

    create(order) {

        const user =
            appState.get("currentUser");

        const room =
            roomService.getCurrentRoom();

        const workOrder = {

            id: crypto.randomUUID(),

            organizationId: user.organizationId,

            objectId: room.objectId,

            roomId: room.id,

            type: order.type,

            title: order.title,

            description: order.description || "",

            priority: order.priority || "normal",

            status: "open",

            assignedTo: order.assignedTo || null,

            createdBy: user.id,

            createdAt: new Date().toISOString(),

            startedAt: null,

            completedAt: null

        };

        dataService.add(

            "workOrders",

            workOrder

        );

        eventBus.emit(

            "workOrderCreated",

            workOrder

        );

        return workOrder;

    }

    /********************************************
     * Starten
     ********************************************/

    start(id) {

        dataService.update(

            "workOrders",

            id,

            {

                status: "in_progress",

                startedAt: new Date().toISOString()

            }

        );

        eventBus.emit(

            "workOrderStarted",

            id

        );

    }

    /********************************************
     * Abschließen
     ********************************************/

    complete(id) {

        dataService.update(

            "workOrders",

            id,

            {

                status: "completed",

                completedAt: new Date().toISOString()

            }

        );

        eventBus.emit(

            "workOrderCompleted",

            id

        );

    }

    /********************************************
     * Löschen
     ********************************************/

    delete(id) {

        dataService.remove(

            "workOrders",

            id

        );

        eventBus.emit(

            "workOrderDeleted",

            id

        );

    }

}

export const workOrderService =
    new WorkOrderService();