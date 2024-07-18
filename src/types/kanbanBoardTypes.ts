export type Id = string | number

export type Column = {
    id: Id,
    title: string
}

export type Task = {
    id: Id;
    columnId: Id,
    content: string,
    label: string
}

export type SingleColumnContainerProps = {
    column: Column,
}


export type InputModelProps = {
    title: string,
    value: string,
    setterMethod: any,
    placeholder: string,
    buttonMessage: string,
    showModal: boolean,
    setShowModal: any,
    type?: "task" | null,
    label?: string,
    setLabel?: any
    //helperFunction : any // function to run when new column/ row added
}