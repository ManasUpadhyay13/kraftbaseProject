export type Id = string | number

export type Column = {
    id: Id,
    title: string
}

export type SingleColumnContainerProps = {
    column: Column
}