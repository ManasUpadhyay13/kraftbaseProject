import { DragStartEvent } from "@dnd-kit/core";
import { Column } from "../types/kanbanBoardTypes";

function generateId() {
    // generating and a random number
    return Math.floor(Math.random() * 10001)
}


export function createNewColumn(column: any, setterMethod: any) {
    const columnToAdd: Column = {
        id: generateId(),
        title: "Column"
    }

    setterMethod([...column, columnToAdd])
}


export function onDragStart(event: DragStartEvent, setterMethod: any) {
    console.log("drag", event)
    if (event.active.data.current?.type === "Column") {
        setterMethod(event.active.data.current.column)
        return
    }
}

export function onDragEnd() {

}