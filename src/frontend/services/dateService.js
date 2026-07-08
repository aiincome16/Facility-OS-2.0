/************************************************
 * Facility OS 2.0
 * dateService.js
 ************************************************/

class DateService {

    now() {

        return new Date();

    }

    format(date) {

        return new Date(date)

            .toLocaleString("de-DE");

    }

    today() {

        return new Date()

            .toISOString()

            .split("T")[0];

    }

}

export const dateService =
    new DateService();