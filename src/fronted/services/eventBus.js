/************************************************
 * Facility OS 2.0
 * eventBus.js
 *
 * Zentrale Ereignisverwaltung
 ************************************************/

class EventBus {

    constructor() {

        this.events = {};

    }

    /********************************************
     * Listener registrieren
     ********************************************/

    on(eventName, callback) {

        if (typeof callback !== "function") {

            throw new Error(
                "Callback muss eine Funktion sein."
            );

        }

        if (!this.events[eventName]) {

            this.events[eventName] = [];

        }

        this.events[eventName].push(callback);

    }

    /********************************************
     * Listener entfernen
     ********************************************/

    off(eventName, callback) {

        if (!this.events[eventName]) return;

        this.events[eventName] =

            this.events[eventName].filter(

                listener => listener !== callback

            );

    }

    /********************************************
     * Ereignis auslösen
     ********************************************/

    emit(eventName, payload = null) {

        if (!this.events[eventName]) return;

        this.events[eventName].forEach(listener => {

            try {

                listener(payload);

            } catch (error) {

                console.error(

                    `EventBus Fehler (${eventName})`,

                    error

                );

            }

        });

    }

    /********************************************
     * Alle Listener löschen
     ********************************************/

    clear(eventName = null) {

        if (eventName) {

            delete this.events[eventName];

            return;

        }

        this.events = {};

    }

    /********************************************
     * Registrierte Events
     ********************************************/

    getEvents() {

        return Object.keys(this.events);

    }

}

export const eventBus = new EventBus();
