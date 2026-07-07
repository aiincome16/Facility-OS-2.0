/************************************************
 * Facility OS 2.0
 * navigationService.js
 ************************************************/

import { router } from "../router.js";
import { appState } from "../appState.js";

class NavigationService {

    /********************************************
     * Allgemein
     ********************************************/

    open(route) {

        router.go(route);

    }

    refresh() {

        router.refresh();

    }

    getCurrentView() {

        return appState.get("ui").currentView;

    }

    /********************************************
     * Login
     ********************************************/

    openLogin() {

        this.open("login");

    }

    /********************************************
     * Dashboard
     ********************************************/

    openDashboard() {

        this.open("dashboard");

    }

    /********************************************
     * Objekte
     ********************************************/

    openObjects() {

        this.open("objects");

    }

    /********************************************
     * Räume
     ********************************************/

    openRooms() {

        this.open("rooms");

    }

    /********************************************
     * Aufgaben
     ********************************************/

    openTasks() {

        this.open("tasks");

    }

    /********************************************
     * Material
     ********************************************/

    openMaterials() {

        this.open("materials");

    }

    /********************************************
     * Tickets
     ********************************************/

    openTickets() {

        this.open("tickets");

    }

    /********************************************
     * Postfach
     ********************************************/

    openMailbox() {

        this.open("mailbox");

    }

    /********************************************
     * Urlaub
     ********************************************/

    openVacation() {

        this.open("vacation");

    }

    /********************************************
     * Krankmeldung
     ********************************************/

    openSick() {

        this.open("sick");

    }

    /********************************************
     * Benachrichtigungen
     ********************************************/

    openNotifications() {

        this.open("notifications");

    }

    /********************************************
     * Analysen
     ********************************************/

    openAnalytics() {

        this.open("analytics");

    }

    /********************************************
     * Objektinformationen
     ********************************************/

    openObjectInfo() {

        this.open("objectInfo");

    }

    /********************************************
     * Einstellungen
     ********************************************/

    openSettings() {

        this.open("settings");

    }

    /********************************************
     * Hilfe
     ********************************************/

    openHelp() {

        this.open("help");

    }

    /********************************************
     * Administration
     ********************************************/

    openAdmin() {

        this.open("admin");

    }

    /********************************************
     * Buchhaltung
     ********************************************/

    openAccounting() {

        this.open("accounting");

    }

}

export const navigationService =
    new NavigationService();