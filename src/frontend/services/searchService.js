/************************************************
 * Facility OS 2.0
 * searchService.js
 ************************************************/

class SearchService {

    search(list, text) {

        if (!text) return list;

        const query = text.toLowerCase();

        return list.filter(item =>

            JSON.stringify(item)

                .toLowerCase()

                .includes(query)

        );

    }

}

export const searchService =
    new SearchService();