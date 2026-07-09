/************************************************
 * Facility OS 2.0
 * loadAppData.js
 ************************************************/

import { DATA_CONFIG } from "../data/dataConfig.js";
import { loadAllData } from "./sheetLoader.js";
import { appState } from "../appState.js";

export async function loadAppData() {

    try {

        const data = await loadAllData(DATA_CONFIG);

        Object.entries(data).forEach(([key, value]) => {

            appState.set(key, value);

        });

        console.log("Alle Daten erfolgreich geladen.");

        return true;

    } catch (error) {

        console.error("Fehler beim Laden der Daten:", error);

        throw error;

    }

}