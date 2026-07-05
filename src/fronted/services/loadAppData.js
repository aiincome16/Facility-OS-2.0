/************************************************
 * Facility OS 2.0
 * loadAppData.js
 *
 * Lädt alle Anwendungsdaten
 ************************************************/

import { sheetLoader } from "./sheetLoader.js";
import { dataService } from "./dataService.js";
import { appState } from "../appState.js";

class LoadAppData {

    async load() {

        try {

            await sheetLoader.loadAll();

            appState.set(
                "users",
                dataService.get("users")
            );

            appState.set(
                "objects",
                dataService.get("objects")
            );

            appState.set(
                "rooms",
                dataService.get("rooms")
            );

            appState.set(
                "tasks",
                dataService.get("tasks")
            );

            appState.set(
                "materials",
                dataService.get("materials")
            );

            appState.set(
                "notifications",
                dataService.get("notifications")
            );

            appState.set(
                "customerRequests",
                dataService.get("customerRequests")
            );

            appState.set(
                "app",
                {
                    ...appState.get("app"),
                    initialized: true
                }
            );

            console.log(
                "Facility OS 2.0: Daten erfolgreich geladen."
            );

            return true;

        } catch (error) {

            console.error(
                "Fehler beim Laden der Daten:",
                error
            );

            throw error;

        }

    }

}

const loader = new LoadAppData();

/************************************************
 * Export
 ************************************************/

export async function loadAppData() {

    return loader.load();

}
