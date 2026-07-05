/************************************************
 * Facility OS 2.0
 * appState.js
 *
 * Zentraler Anwendungszustand
 * inkl. Observer-System
 ************************************************/

import { APP_CONFIG } from "./config.js";

class AppState {

    constructor() {

        this.listeners = {};

        this.state = {

            app: {

                name: APP_CONFIG.appName,

                version: APP_CONFIG.version,

                initialized: false,

                online: navigator.onLine

            },

            currentUser: null,

            currentRole: null,

            organizationId: APP_CONFIG.defaultOrganizationId,

            selectedObject: null,

            selectedRoom: null,

            currentShift: {

                active: false,

                startTime: null,

                endTime: null,

                shiftId: null

            },

            permissions: [],

            notifications: [],

            mailbox: [],

            tasks: [],

            tickets: [],

            materials: [],

            rooms: [],

            objects: [],

            users: [],

            customerRequests: [],

            analytics: {},

            settings: {

                language: APP_CONFIG.language,

                darkMode: APP_CONFIG.ui.darkMode

            },

            ui: {

                currentView: "login",

                loading: false,

                modalOpen: false

            }

        };

    }

    /********************************************
     * Getter
     ********************************************/

    get(key) {

        return this.state[key];

    }

    getState() {

        return this.state;

    }

    /********************************************
     * Setter
     ********************************************/

    set(key, value) {

        this.state[key] = value;

        this.emit(key, value);

    }

    update(key, value) {

        if (

            typeof this.state[key] === "object" &&

            this.state[key] !== null

        ) {

            this.state[key] = {

                ...this.state[key],

                ...value

            };

        } else {

            this.state[key] = value;

        }

        this.emit(key, this.state[key]);

    }

    reset() {

        this.state.currentUser = null;

        this.state.currentRole = null;

        this.state.selectedObject = null;

        this.state.selectedRoom = null;

        this.state.currentShift = {

            active: false,

            startTime: null,

            endTime: null,

            shiftId: null

        };

        this.emit("reset", this.state);

    }

    /********************************************
     * Observer
     ********************************************/

    subscribe(event, callback) {

        if (!this.listeners[event]) {

            this.listeners[event] = [];

        }

        this.listeners[event].push(callback);

    }

    unsubscribe(event, callback) {

        if (!this.listeners[event]) return;

        this.listeners[event] =

            this.listeners[event]

                .filter(

                    listener => listener !== callback

                );

    }

    emit(event, payload) {

        if (!this.listeners[event]) return;

        this.listeners[event]

            .forEach(listener => {

                listener(payload);

            });

    }

    /********************************************
     * Initialisierung
     ********************************************/

    initialize() {

        this.state.app.initialized = true;

        this.emit(

            "initialized",

            this.state

        );

    }

}

export const appState = new AppState();