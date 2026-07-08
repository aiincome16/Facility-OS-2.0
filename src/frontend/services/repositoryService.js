/************************************************
 * Facility OS 2.0
 * repositoryService.js
 *
 * Zentrale Datenverwaltung
 ************************************************/

import { dataService } from "./dataService.js";

class RepositoryService {

    get(entity) {
        return dataService.get(entity);
    }

    getAll(entity) {
        const data = dataService.get(entity);
        return Array.isArray(data) ? data : [];
    }

    getById(entity, id) {
        return this.getAll(entity).find(item => item.id === id) || null;
    }

    create(entity, object) {

        const list = this.getAll(entity);

        list.push(object);

        dataService.set(entity, list);

        return object;

    }

    update(entity, id, values) {

        const list = this.getAll(entity);

        const index = list.findIndex(item => item.id === id);

        if (index === -1) return null;

        list[index] = {

            ...list[index],

            ...values

        };

        dataService.set(entity, list);

        return list[index];

    }

    delete(entity, id) {

        const list = this
            .getAll(entity)
            .filter(item => item.id !== id);

        dataService.set(entity, list);

    }

}

export const repositoryService = new RepositoryService();