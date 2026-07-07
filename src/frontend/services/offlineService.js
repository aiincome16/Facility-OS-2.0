/************************************************
 * Facility OS Platform
 * offlineService.js
 *
 * Offline-Datenbank (IndexedDB)
 ************************************************/

const DB_NAME = "facility_os";

const DB_VERSION = 1;

const STORES = [

    "users",
    "organizations",
    "objects",
    "buildings",
    "floors",
    "areas",
    "rooms",
    "workOrders",
    "tasks",
    "materials",
    "photos",
    "notifications",
    "customerRequests",
    "syncQueue"

];

class OfflineService {

    constructor() {

        this.db = null;

    }

    /********************************************
     * Datenbank öffnen
     ********************************************/

    async init() {

        return new Promise((resolve, reject) => {

            const request =
                indexedDB.open(
                    DB_NAME,
                    DB_VERSION
                );

            request.onerror =
                () => reject(request.error);

            request.onsuccess =
                () => {

                    this.db = request.result;

                    resolve();

                };

            request.onupgradeneeded =
                event => {

                    const db =
                        event.target.result;

                    STORES.forEach(store => {

                        if (!db.objectStoreNames.contains(store)) {

                            db.createObjectStore(

                                store,

                                {

                                    keyPath: "id"

                                }

                            );

                        }

                    });

                };

        });

    }

    /********************************************
     * Speichern
     ********************************************/

    async save(store, entity) {

        return new Promise((resolve, reject) => {

            const tx =
                this.db.transaction(
                    store,
                    "readwrite"
                );

            tx.objectStore(store).put(entity);

            tx.oncomplete = () => resolve();

            tx.onerror = () => reject(tx.error);

        });

    }

    /********************************************
     * Laden
     ********************************************/

    async getAll(store) {

        return new Promise((resolve, reject) => {

            const tx =
                this.db.transaction(
                    store,
                    "readonly"
                );

            const request =
                tx.objectStore(store)
                    .getAll();

            request.onsuccess =
                () => resolve(request.result);

            request.onerror =
                () => reject(request.error);

        });

    }

    /********************************************
     * Löschen
     ********************************************/

    async remove(store, id) {

        return new Promise((resolve, reject) => {

            const tx =
                this.db.transaction(
                    store,
                    "readwrite"
                );

            tx.objectStore(store)
                .delete(id);

            tx.oncomplete =
                () => resolve();

            tx.onerror =
                () => reject(tx.error);

        });

    }

}

export const offlineService =
    new OfflineService();