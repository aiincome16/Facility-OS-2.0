/************************************************
 * Facility OS 2.0
 * permissionService.js
 ************************************************/

import { appState } from "../appState.js";

class PermissionService {

    constructor() {

        this.permissions = {

            Mitarbeiter: [

                "viewDashboard",
                "selectObject",
                "startShift",
                "stopShift",
                "viewRooms",
                "viewTasks",
                "completeTask",
                "createTicket",
                "viewMaterial",
                "requestMaterial",
                "requestVacation",
                "createSickReport",
                "viewMailbox",
                "viewObjectInfo",
                "viewNotifications"

            ],

            Objektleiter: [

                "viewDashboard",
                "selectObject",
                "startShift",
                "stopShift",
                "viewRooms",
                "editRooms",
                "viewTasks",
                "editTasks",
                "completeTask",
                "createTicket",
                "editTicket",
                "manageEmployees",
                "approveVacation",
                "manageMaterial",
                "viewMailbox",
                "viewAnalytics",
                "viewWarnings",
                "viewObjectInfo",
                "manageObject"

            ],

            Buchhaltung: [

                "viewAccounting",
                "viewShifts",
                "exportData",
                "manageInvoices",
                "viewMaterialCosts"

            ],

            Admin: [

                "*"

            ],

            Kunde: [

                "viewCustomerDashboard",
                "createCustomerRequest",
                "viewOwnTickets"

            ]

        };

    }

    /********************************************
     * Berechtigung prüfen
     ********************************************/

    can(permission) {

        const role = appState.get("currentRole");

        if (!role) {

            return false;

        }

        const rolePermissions =
            this.permissions[role] || [];

        if (rolePermissions.includes("*")) {

            return true;

        }

        const extraPermissions =
            appState.get("permissions") || [];

        return (

            rolePermissions.includes(permission) ||

            extraPermissions.includes(permission)

        );

    }

    /********************************************
     * Alle Berechtigungen
     ********************************************/

    getPermissions() {

        const role = appState.get("currentRole");

        if (!role) {

            return [];

        }

        return this.permissions[role] || [];

    }

    /********************************************
     * Mehrere Berechtigungen prüfen
     ********************************************/

    canAll(permissionList) {

        return permissionList.every(

            permission => this.can(permission)

        );

    }

    /********************************************
     * Mindestens eine Berechtigung
     ********************************************/

    canAny(permissionList) {

        return permissionList.some(

            permission => this.can(permission)

        );

    }

}

export const permissionService =
    new PermissionService();
