/************************************************
 * Facility OS 2.0
 * idService.js
 ************************************************/

class IdService {

    create(prefix = "") {

        return (

            prefix +

            Date.now().toString(36) +

            Math.random()

                .toString(36)

                .substring(2,8)

        );

    }

}

export const idService =
    new IdService();