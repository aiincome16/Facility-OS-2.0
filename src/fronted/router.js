/************************************************
 * Facility OS 2.0
 * router.js
 ************************************************/

import { renderLogin } from "./ui/loginUi.js";
import { renderObjectSelection } from "./ui/objectSelectionUi.js";
import { renderEmployeeDashboard } from "./ui/employeeDashboard.js";

import { renderRoomUi } from "./ui/roomUi.js";
import { renderRoomWorkspace } from "./ui/roomWorkspaceUi.js";

import { renderTaskUi } from "./ui/taskUi.js";
import { renderMaterialUi } from "./ui/materialUi.js";
import { renderTicketUi } from "./ui/ticketUi.js";
import { renderMailboxUi } from "./ui/mailboxUi.js";
import { renderNotificationUi } from "./ui/notificationUi.js";
import { renderShiftUi } from "./ui/shiftUi.js";
import { renderSettingsUi } from "./ui/settingsUi.js";

class Router {

    constructor() {

        this.currentRoute = "login";

    }

    go(route) {

        this.currentRoute = route;

        this.render();

    }

    refresh() {

        this.render();

    }

    render() {

        switch (this.currentRoute) {

            case "login":
                renderLogin();
                break;

            case "objects":
                renderObjectSelection();
                break;

            case "dashboard":
                renderEmployeeDashboard();
                break;

            case "rooms":
                renderRoomUi();
                break;

            case "room":
                renderRoomWorkspace();
                break;

            case "tasks":
                renderTaskUi();
                break;

            case "materials":
                renderMaterialUi();
                break;

            case "tickets":
                renderTicketUi();
                break;

            case "mailbox":
                renderMailboxUi();
                break;

            case "notifications":
                renderNotificationUi();
                break;

            case "shift":
                renderShiftUi();
                break;

            case "settings":
                renderSettingsUi();
                break;

            default:

                console.warn(

                    "Unbekannte Route:",

                    this.currentRoute

                );

                renderEmployeeDashboard();

        }

    }

}

export const router = new Router();