/************************************************
 * Facility OS Platform
 * entityFactory.js
 *
 * Standardstruktur aller Datenobjekte
 ************************************************/

export function createEntity(data = {}) {

    const now = new Date().toISOString();

    return {

        id: crypto.randomUUID(),

        organizationId: null,

        objectId: null,

        buildingId: null,

        floorId: null,

        areaId: null,

        roomId: null,

        active: true,

        deleted: false,

        status: "active",

        createdBy: null,

        createdAt: now,

        updatedBy: null,

        updatedAt: now,

        ...data

    };
}