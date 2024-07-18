import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { Column, Id, Task } from "../types/kanbanBoardTypes";
import { arrayMove } from "@dnd-kit/sortable";
import { getColumns, getTasks, updateColumns, updateTasks } from "./redux";

function generateId() {
    // generating and a random number
    return Math.floor(Math.random() * 10001)
}


export function createNewColumn(column: any, columnName: string) {

    if (columnName.length === 0) return

    const columnToAdd: Column = {
        id: generateId(),
        title: columnName
    }

    console.log(columnToAdd);


    updateColumns([...column, columnToAdd])
}

export function createNewTask(
    columnId: Id,
    taskName: string,
    label: string,
    task: Task[],
) {
    const newTask = {
        id: generateId(),
        columnId: columnId,
        content: taskName,
        label: label
    }

    console.log(newTask);


    updateTasks([...task, newTask])
}

export function onDragStart(event: DragStartEvent, setColumn: any, setTask: any) {
    console.log("drag", event)
    if (event.active.data.current?.type === "Column") {
        console.log('inside column');
        setColumn(event.active.data.current.column)
        return
    }

    if (event.active.data.current?.type === "Task") {
        console.log('inside task');
        setTask(event.active.data.current.task)
        return
    }
}

export function onDragEnd(event: DragEndEvent, setActiveTask: any, setActiveColumn: any) {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event
    if (!over) {
        return
    }

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    let columns = getColumns()
    const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId)
    const overColumnIndex = columns.findIndex((col) => col.id === overColumnId)

    let newColumnData = arrayMove(columns, activeColumnIndex, overColumnIndex)

    updateColumns(newColumnData)
}

export function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) {
        return;
    }

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    // task is dropped in the column
    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    let taskData = getTasks();
    console.log("getting task data", taskData);

    if (isActiveATask && isOverATask) {
        const activeIndex = taskData.findIndex((t) => t.id === activeColumnId);
        const overIndex = taskData.findIndex((t) => t.id === overColumnId);

        console.log("entering");
        console.log("taskData ", taskData);

        // Create a new taskData array with updated columnId
        const newTaskData = taskData.map((task, index) =>
            index === activeIndex ? { ...task, columnId: taskData[overIndex].columnId } : task
        );

        console.log("exiting");
        const movedTaskData = arrayMove(newTaskData, activeIndex, overIndex);
        updateTasks(movedTaskData);
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // Dropping in another column
    if (isActiveATask && isOverAColumn) {
        const activeIndex = taskData.findIndex((t) => t.id === activeColumnId);
        console.log("activeIndex", activeIndex, taskData[activeIndex]);
        console.log("entering");
        console.log("taskData ", taskData);

        // Create a new taskData array with updated columnId
        const newTaskData = taskData.map((task, index) =>
            index === activeIndex ? { ...task, columnId: overColumnId } : task
        );

        const movedTaskData = arrayMove(newTaskData, activeIndex, activeIndex);
        updateTasks(movedTaskData);
    }
}