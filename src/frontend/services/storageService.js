/************************************************
 * Facility OS 2.0
 * storageService.js
 ************************************************/

class StorageService {

    set(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    }

    get(key, defaultValue = null) {

        const value = localStorage.getItem(key);

        if (!value) return defaultValue;

        try {

            return JSON.parse(value);

        } catch {

            return defaultValue;

        }

    }

    remove(key) {

        localStorage.removeItem(key);

    }

    clear() {

        localStorage.clear();

    }

    has(key) {

        return localStorage.getItem(key) !== null;

    }

}

export const storageService = new StorageService();