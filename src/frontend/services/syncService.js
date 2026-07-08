/************************************************
 * Facility OS 2.0
 * syncService.js
 ************************************************/

import { loggerService } from "./loggerService.js";

class SyncService {

    constructor() {

        this.running = false;
        this.lastSync = null;

    }

    async sync() {

        if (this.running) return;

        this.running = true;

        try {

            loggerService.info("Synchronisation gestartet");

            // Phase 2:
            // API / Google Sheets / Backend

            this.lastSync = new Date();

            loggerService.info("Synchronisation abgeschlossen");

        } catch (error) {

            loggerService.error(error);

        } finally {

            this.running = false;

        }

    }

    getLastSync() {

        return this.lastSync;

    }

}

export const syncService = new SyncService();