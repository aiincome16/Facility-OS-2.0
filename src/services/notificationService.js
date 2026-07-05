/************************************************
 * Facility OS 2.0
 * notificationService.js
 ************************************************/

import { dataService } from "./dataService.js";
import { appState } from "../appState.js";
import { eventBus } from "./eventBus.js";

class NotificationService {

    /********************************************
     * Benachrichtigung erstellen
     ********************************************/

    create({

        title,

        message,

        type = "info",

        receiverId = null,

        receiverRole = null,

        objectId = null,

        priority = "normal"

    }) {

        const notification = {

            id: crypto.randomUUID(),

            organizationId:

                appState.get("organizationId"),

            receiverId,

            receiverRole,

            objectId,

            title,

            message,

            type,

            priority,

            read: false,

            createdAt:

                new Date().toISOString()

        };

        dataService.add(

            "notifications",

            notification

        );

        eventBus.emit(

            "notificationCreated",

            notification

        );

        return notification;

    }

    /********************************************
     * Eigene Benachrichtigungen
     ********************************************/

    getMyNotifications() {

        const user =

            appState.get("currentUser");

        if (!user) return [];

        return dataService

            .get("notifications")

            .filter(notification =>

                notification.receiverId === user.id ||

                notification.receiverRole === user.role

            );

    }

    /********************************************
     * Ungelesene
     ********************************************/

    getUnread() {

        return this

            .getMyNotifications()

            .filter(

                notification =>

                    !notification.read

            );

    }

    /********************************************
     * Als gelesen markieren
     ********************************************/

    markAsRead(id) {

        dataService.update(

            "notifications",

            id,

            {

                read: true

            }

        );

        eventBus.emit(

            "notificationRead",

            id

        );

    }

    /********************************************
     * Alle gelesen
     ********************************************/

    markAllAsRead() {

        this

            .getMyNotifications()

            .forEach(notification => {

                this.markAsRead(

                    notification.id

                );

            });

    }

    /********************************************
     * Löschen
     ********************************************/

    remove(id) {

        dataService.remove(

            "notifications",

            id

        );

        eventBus.emit(

            "notificationDeleted",

            id

        );

    }

}

export const notificationService =
    new NotificationService();