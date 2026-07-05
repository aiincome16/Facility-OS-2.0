/************************************************
 * Facility OS 2.0
 * sheetLoader.js
 *
 * Lädt Daten aus:
 * - JSON
 * - Google Sheets
 * - API
 ************************************************/

import {
    DATA_CONFIG,
    API_CONFIG,
    SHEETS_CONFIG,
    getDataMode
} from "../dataConfig.js";

import { dataService } from "./dataService.js";

class SheetLoader {

    /********************************************
     * Alle Daten laden
     ********************************************/

    async loadAll() {

        const mode = getDataMode();

        switch (mode) {

            case "json":
                return this.loadJson();

            case "sheets":
                return this.loadSheets();

            case "api":
                return this.loadApi();

            default:
                throw new Error("Unbekannter Datenmodus");

        }

    }

    /********************************************
     * JSON
     ********************************************/

    async loadJson() {

        for (const [key, path] of Object.entries(DATA_CONFIG)) {

            const response = await fetch(path);

            if (!response.ok) {

                throw new Error(
                    `Datei konnte nicht geladen werden: ${path}`
                );

            }

            const rows = await response.json();

            dataService.set(key, rows);

        }

        return true;

    }

    /********************************************
     * Google Sheets
     ********************************************/

    async loadSheets() {

        if (!SHEETS_CONFIG.enabled) {

            throw new Error(
                "Google Sheets deaktiviert."
            );

        }

        console.warn(
            "Google Sheets Loader folgt."
        );

        return true;

    }

    /********************************************
     * Backend API
     ********************************************/

    async loadApi() {

        if (!API_CONFIG.enabled) {

            throw new Error(
                "Backend API deaktiviert."
            );

        }

        console.warn(
            "API Loader folgt."
        );

        return true;

    }

}

export const sheetLoader =
    new SheetLoader();