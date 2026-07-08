/************************************************
 * Facility OS 2.0
 * filterService.js
 ************************************************/

class FilterService {

    by(list, key, value) {

        return list.filter(

            item => item[key] === value

        );

    }

}

export const filterService =
    new FilterService();