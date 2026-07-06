/************************************************
 * Facility OS Platform
 * taskService.js
 ************************************************/

import { appState } from "../appState.js";
import { dataService } from "./dataService.js";
import { roomService } from "./roomService.js";
import { eventBus } from "./eventBus.js";

class TaskService {

    /********************************************
     * Aufgaben des aktuellen Raums
     ********************************************/

    getTasks() {

        const room = roomService.getCurrentRoom();

        if (!room) return [];

        return dataService
            .get("tasks")
            .filter(task =>

                task.roomId === room.id

            );

    }

    /********************************************
     * Offene Aufgaben
     ********************************************/

    getOpenTasks() {

        return this
            .getTasks()
            .filter(task => !task.completed);

    }

    /********************************************
     * Erledigte Aufgaben
     ********************************************/

    getCompletedTasks() {

        return this
            .getTasks()
            .filter(task => task.completed);

    }

    /********************************************
     * Aufgabe suchen
     ********************************************/

    getTask(id) {

        return dataService
            .get("tasks")
            .find(task => task.id === id);

    }

    /********************************************
     * Aufgabe erledigen
     ********************************************/

    completeTask(id) {

        const user = appState.get("currentUser");

        dataService.update(

            "tasks",

            id,

            {

                completed: true,

                completedBy: user.id,

                completedAt: new Date().toISOString()

            }

        );

        eventBus.emit(

            "taskCompleted",

            id

        );

    }

    /********************************************
     * Aufgabe wieder öffnen
     ********************************************/

    reopenTask(id) {

        dataService.update(

            "tasks",

            id,

            {

                completed: false,

                completedBy: null,

                completedAt: null

            }

        );

        eventBus.emit(

            "taskReopened",

            id

        );

    }

    /********************************************
     * Neue Aufgabe
     ********************************************/

    create(task) {

        task.id = crypto.randomUUID();

        task.completed = false;

        task.createdAt = new Date().toISOString();

        dataService.add(

            "tasks",

            task

        );

        eventBus.emit(

            "taskCreated",

            task

        );

    }

    /********************************************
     * Aufgabe löschen
     ********************************************/

    delete(id) {

        dataService.remove(

            "tasks",

            id

        );

        eventBus.emit(

            "taskDeleted",

            id

        );

    }

}

export const taskService =
    new TaskService();