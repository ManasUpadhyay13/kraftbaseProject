import { SingleColumnContainerProps } from '../types/kanbanBoardTypes'
import '../styles/kanbanBoard.css'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
const SingleColumnContainer = ({ column }: SingleColumnContainerProps) => {

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div
                {...attributes}
                {...listeners}
                ref={setNodeRef}
                className='singleColumn dragging'
                style={style}
            ></div>
        )
    }

    return (
        <div
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            className='singleColumn'
            style={style}
        >
            {column.title}
        </div>
    )
}

export default SingleColumnContainer
