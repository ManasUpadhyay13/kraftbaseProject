import { DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
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

export function onDragEnd(event: DragEndEvent, columns: Column[], setterMethod: any, setActiveTask: any, setActiveColumn: any) {
    setActiveColumn(null)
    setActiveTask(null)
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

export function onDragOver(event: DragOverEvent, tasks: Task[], setTask: any) {
    const { active, over } = event
    if (!over) {
        return
    }

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    // task is dropped in the column

    const isActiveATask = active.data.current?.type === "Task"
    const isOverATask = over.data.current?.type === "Task"

    if (!isActiveATask) return

    if (isActiveATask && isOverATask) {
        setTask((tasks: any[]) => {
            const activeIndex = tasks.findIndex((t: { id: UniqueIdentifier; }) => t.id === activeColumnId)
            const overIndex = tasks.findIndex((t: { id: UniqueIdentifier; }) => t.id === overColumnId)

            tasks[activeIndex].columnId = tasks[overIndex].columnId

            return arrayMove(tasks, activeIndex, overIndex)
        })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    //dorpping in another another column

    if (isActiveATask && isOverAColumn) {
        setTask((tasks: any[]) => {
            const activeIndex = tasks.findIndex((t: { id: UniqueIdentifier; }) => t.id === activeColumnId)

            tasks[activeIndex].columnId = overColumnId

            return arrayMove(tasks, activeIndex, activeIndex)
        })
    }
}