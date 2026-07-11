/************************************************
 * Facility OS 2.0
 * appDataLoader.js
 ************************************************/

import { DATA_CONFIG } from "./dataConfig.js";
import { loadAllData } from "./sheetLoader.js";
import { showToast } from "./toastUi.js";


export async function loadAppData() {

    try {

        const data = await loadAllData(DATA_CONFIG);

        console.log(
            "Alle Daten erfolgreich geladen.",
            data
        );

        return data;


    } catch (error) {

        console.error(
            "Fehler beim Laden der App-Daten:",
            error
        );


        showToast(
            "Fehler beim Laden der Daten",
            "ERROR"
        );


        return null;

    }

}