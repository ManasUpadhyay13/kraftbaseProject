import { useSortable } from '@dnd-kit/sortable'
import '../styles/kanbanBoard.css'
import { Task } from '../types/kanbanBoardTypes'
import { CSS } from '@dnd-kit/utilities'

const SingleTaskCard = ({ task }: any) => {

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                // {...attributes}
                // {...listeners}
                className='singleContainerTasks taskDragging'
            ></div>
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="singleContainerTasks">
            <p
                style={{
                    fontSize: 12,
                    color: "gray"
                }}
            >
                #{task.id}
                <span>
                    12 July 2023
                </span>
            </p>
            <p>
                {task.content}
            </p>
            <p>
                {task.label}
            </p>
        </div>
    )
}

export default SingleTaskCard
