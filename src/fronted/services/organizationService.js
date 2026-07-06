/************************************************
 * Facility OS Platform
 * organizationService.js
 ************************************************/

import { appState } from "../appState.js";
import { dataService } from "./dataService.js";

class OrganizationService {

    /********************************************
     * Aktuelle Organisation
     ********************************************/

    getCurrentOrganization() {

        return appState.get("organizationId");

    }

    /********************************************
     * Organisation laden
     ********************************************/

    getOrganization() {

        const id = this.getCurrentOrganization();

        return dataService
            .get("organizations")
            .find(org => org.id === id);

    }

    /********************************************
     * Organisation wechseln
     ********************************************/

    setOrganization(id) {

        appState.set("organizationId", id);

    }

    /********************************************
     * Daten nach Organisation filtern
     ********************************************/

    filter(list) {

        const organizationId =
            this.getCurrentOrganization();

        return list.filter(item =>

            item.organizationId === organizationId

        );

    }

    /********************************************
     * Benutzer
     ********************************************/

    getUsers() {

        return this.filter(

            dataService.get("users")

        );

    }

    /********************************************
     * Objekte
     ********************************************/

    getObjects() {

        return this.filter(

            dataService.get("objects")

        );

    }

    /********************************************
     * Räume
     ********************************************/

    getRooms() {

        return this.filter(

            dataService.get("rooms")

        );

    }

}

export const organizationService =
    new OrganizationService();