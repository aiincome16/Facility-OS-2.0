/************************************************
 * Facility OS 2.0
 * widgetService.js
 ************************************************/

import { permissionService } from "./permissionService.js";

class WidgetService {

    constructor() {

        this.widgets = [];

    }

    /********************************************
     * Widget registrieren
     ********************************************/

    register(widget) {

        if (!widget?.id) {

            throw new Error("Widget benötigt eine ID.");

        }

        this.widgets.push(widget);

    }

    /********************************************
     * Widget entfernen
     ********************************************/

    unregister(id) {

        this.widgets = this.widgets.filter(

            widget => widget.id !== id

        );

    }

    /********************************************
     * Alle Widgets
     ********************************************/

    getAll() {

        return this.widgets;

    }

    /********************************************
     * Sichtbare Widgets
     ********************************************/

    getVisibleWidgets() {

        return this.widgets.filter(widget => {

            if (!widget.permission) {

                return true;

            }

            return permissionService.can(

                widget.permission

            );

        });

    }

    /********************************************
     * Nach Bereich
     ********************************************/

    getByCategory(category) {

        return this.getVisibleWidgets()

            .filter(widget =>

                widget.category === category

            );

    }

    /********************************************
     * Widget finden
     ********************************************/

    get(id) {

        return this.widgets.find(

            widget => widget.id === id

        );

    }

    /********************************************
     * Alles löschen
     ********************************************/

    clear() {

        this.widgets = [];

    }

}

export const widgetService =
    new WidgetService();

/************************************************
 * Standard-Widgets
 ************************************************/

widgetService.register({

    id: "shift",

    title: "Schicht",

    icon: "🟢",

    category: "dashboard",

    permission: "startShift",

    route: "shift"

});

widgetService.register({

    id: "rooms",

    title: "Räume",

    icon: "🚪",

    category: "dashboard",

    permission: "viewRooms",

    route: "rooms"

});

widgetService.register({

    id: "tasks",

    title: "Aufgaben",

    icon: "📋",

    category: "dashboard",

    permission: "viewTasks",

    route: "tasks"

});

widgetService.register({

    id: "material",

    title: "Material",

    icon: "📦",

    category: "dashboard",

    permission: "viewMaterial",

    route: "materials"

});

widgetService.register({

    id: "tickets",

    title: "Tickets",

    icon: "💬",

    category: "dashboard",

    permission: "createTicket",

    route: "tickets"

});

widgetService.register({

    id: "mailbox",

    title: "Postfach",

    icon: "✉️",

    category: "dashboard",

    permission: "viewMailbox",

    route: "mailbox"

});

widgetService.register({

    id: "analytics",

    title: "Analysen",

    icon: "📊",

    category: "dashboard",

    permission: "viewAnalytics",

    route: "analytics"

});

widgetService.register({

    id: "admin",

    title: "Administration",

    icon: "⚙️",

    category: "dashboard",

    permission: "manageEmployees",

    route: "admin"

});