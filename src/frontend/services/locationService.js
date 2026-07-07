/************************************************
 * Facility OS 2.0
 * locationService.js
 *
 * Gebäude-, Etagen-, Bereichs- und Raumverwaltung
 ************************************************/

import { appState } from "../appState.js";
import { dataService } from "./dataService.js";

class LocationService {

    /********************************************
     * Aktuelles Objekt
     ********************************************/

    getCurrentObject() {

        return appState.get("selectedObject");

    }

    /********************************************
     * Gebäude
     ********************************************/

    getBuildings() {

        const object = this.getCurrentObject();

        if (!object) return [];

        return dataService
            .get("buildings")
            .filter(building =>
                building.objectId === object.id
            );

    }

    /********************************************
     * Etagen
     ********************************************/

    getFloors(buildingId) {

        return dataService
            .get("floors")
            .filter(floor =>
                floor.buildingId === buildingId
            );

    }

    /********************************************
     * Bereiche
     ********************************************/

    getAreas(floorId) {

        return dataService
            .get("areas")
            .filter(area =>
                area.floorId === floorId
            );

    }

    /********************************************
     * Räume
     ********************************************/

    getRooms(areaId) {

        return dataService
            .get("rooms")
            .filter(room =>
                room.areaId === areaId
            );

    }

    /********************************************
     * Raum suchen
     ********************************************/

    findRoom(roomId) {

        return dataService
            .get("rooms")
            .find(room =>
                room.id === roomId
            );

    }

    /********************************************
     * Gesamten Objektbaum laden
     ********************************************/

    getObjectTree() {

        return this.getBuildings().map(building => ({

            ...building,

            floors: this.getFloors(building.id).map(floor => ({

                ...floor,

                areas: this.getAreas(floor.id).map(area => ({

                    ...area,

                    rooms: this.getRooms(area.id)

                }))

            }))

        }));

    }

}

export const locationService =
    new LocationService();