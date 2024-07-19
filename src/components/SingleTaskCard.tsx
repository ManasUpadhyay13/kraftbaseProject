import { useSortable } from '@dnd-kit/sortable'
import '../styles/kanbanBoard.css'
import { CSS } from '@dnd-kit/utilities'
import Verified from '../assets/verified.png'
import { formatDateTime } from '../utils/formatDateTime'

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
                    fontSize: 11,
                    color: "gray"
                }}
            >
                #{task.id}
                <span>
                    &nbsp;
                    &nbsp;
                    {formatDateTime(task.createdAt)}
                </span>
            </p>
            <p
                style={{
                    fontSize: 12,
                }}
            >
                {task.content}
            </p>
            <div className="label">
                <div className="leftLabel">

                    {
                        (task.label === "Easy") && (
                            <p className="easyLabel">
                                Easy
                            </p>
                        )
                    }

                    {
                        (task.label === "Medium") && (
                            <p className="mediumLabel">
                                Medium
                            </p>
                        )
                    }


                    {
                        (task.label === "Hard") && (
                            <p className="hardLabel">
                                Hard
                            </p>
                        )
                    }

                </div>

                <div className="rightLabel">
                    <img src={Verified}
                        alt="verified" />
                </div>
            </div>
        </div>
    )
}

export default SingleTaskCard
