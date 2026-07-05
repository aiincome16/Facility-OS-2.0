/************************************************
 * Facility OS 2.0
 * dataService.js
 *
 * Zentrale Datenverwaltung
 ************************************************/

class DataService {

    constructor() {

        this.data = {};

    }

    /********************************************
     * Gesamten Datensatz setzen
     ********************************************/

    set(key, value) {

        this.data[key] = value;

    }

    /********************************************
     * Datensatz lesen
     ********************************************/

    get(key) {

        return this.data[key] || [];

    }

    /********************************************
     * Einzelnen Eintrag suchen
     ********************************************/

    find(key, predicate) {

        return this.get(key).find(predicate);

    }

    /********************************************
     * Filtern
     ********************************************/

    filter(key, predicate) {

        return this.get(key).filter(predicate);

    }

    /********************************************
     * Datensatz hinzufügen
     ********************************************/

    add(key, item) {

        if (!this.data[key]) {

            this.data[key] = [];

        }

        this.data[key].push(item);

    }

    /********************************************
     * Datensatz ersetzen
     ********************************************/

    update(key, id, values) {

        const items = this.get(key);

        const index = items.findIndex(

            item => item.id === id

        );

        if (index === -1) return false;

        items[index] = {

            ...items[index],

            ...values

        };

        return true;

    }

    /********************************************
     * Datensatz löschen
     ********************************************/

    remove(key, id) {

        const items = this.get(key);

        this.data[key] = items.filter(

            item => item.id !== id

        );

    }

    /********************************************
     * Alles löschen
     ********************************************/

    clear() {

        this.data = {};

    }

    /********************************************
     * Gesamten Speicher ausgeben
     ********************************************/

    getAll() {

        return this.data;

    }

}

export const dataService = new DataService();