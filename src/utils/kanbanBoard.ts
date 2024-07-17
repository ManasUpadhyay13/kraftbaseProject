import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Column, Id, Task } from "../types/kanbanBoardTypes";
import { arrayMove } from "@dnd-kit/sortable";

function generateId() {
    // generating and a random number
    return Math.floor(Math.random() * 10001)
}


export function createNewColumn(column: any, columnName: string, setterMethod: any) {

    if (columnName.length === 0) return

    const columnToAdd: Column = {
        id: generateId(),
        title: columnName
    }

    console.log(columnToAdd);


    setterMethod([...column, columnToAdd])
}

export function createNewTask(
    columnId: Id,
    taskName: string,
    label: string,
    task: Task[],
    setTasks: any
) {
    const newTask = {
        id: generateId(),
        columnId: columnId,
        content: taskName,
        label: label
    }

    console.log(newTask);


    setTasks([...task, newTask])
}

export function onDragStart(event: DragStartEvent, setterMethod: any) {
    console.log("drag", event)
    if (event.active.data.current?.type === "Column") {
        setterMethod(event.active.data.current.column)
        return
    }

    if (event.active.data.current?.type === "Task") {
        setterMethod(event.active.data.current.task)
        return
    }
}

export function onDragEnd(event: DragEndEvent, columns: Column[], setterMethod: any) {
    const { active, over } = event
    if (!over) {
        return
    }

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    setterMethod((columns: any[]) => {
        const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId)

        const overColumnIndex = columns.findIndex((col) => col.id === overColumnId)

        return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
}