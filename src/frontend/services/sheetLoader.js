/************************************************
 * Facility OS 2.0
 * sheetLoader.js
 ************************************************/

export async function loadJsonData(url) {

    const response = await fetch(url);

    if (!response.ok) {

        throw new Error(`Datei konnte nicht geladen werden: ${url}`);

    }

    return await response.json();

}

export async function loadAllData(config) {

    const result = {};

    for (const [key, url] of Object.entries(config)) {

        result[key] = await loadJsonData(url);

    }

    return result;

}