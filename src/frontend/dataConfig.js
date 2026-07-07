/************************************************
 * Facility OS 2.0
 * dataConfig.js
 *
 * Zentrale Datenquellen
 ************************************************/

import { APP_CONFIG } from "./config.js";

export const DATA_CONFIG = {

    users: "./data/users.json",

    objects: "./data/objects.json",

    rooms: "./data/rooms.json",

    tasks: "./data/tasks.json",

    materials: "./data/materials.json",

    shifts: "./data/shifts.json",

    qrCodes: "./data/qrCodes.json",

    notifications: "./data/notifications.json",

    customerRequests: "./data/customerRequests.json"

};

/************************************************
 * API Konfiguration
 ************************************************/

export const API_CONFIG = {

    enabled: APP_CONFIG.useBackendApi,

    baseUrl: APP_CONFIG.apiBaseUrl

};

/************************************************
 * Google Sheets
 ************************************************/

export const SHEETS_CONFIG = {

    enabled: APP_CONFIG.useGoogleSheets,

    scriptUrl: APP_CONFIG.googleScriptUrl

};

/************************************************
 * Datenmodus
 ************************************************/

export function getDataMode() {

    if (APP_CONFIG.useBackendApi) {

        return "api";

    }

    if (APP_CONFIG.useGoogleSheets) {

        return "sheets";

    }

    return "json";

}