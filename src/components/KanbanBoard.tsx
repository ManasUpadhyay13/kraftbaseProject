import { useMemo, useState, useEffect } from 'react'
import '../styles/kanbanBoard.css'
import { Column, Task } from '../types/kanbanBoardTypes'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { createNewColumn, onDragEnd, onDragStart } from '../utils/kanbanBoard'
import SingleColumnContainer from './SingleColumnContainer'
import { SortableContext } from '@dnd-kit/sortable'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { createPortal } from 'react-dom'
import InputModal from './Modal'
import SingleTaskCard from './SingleTaskCard'

const KanbanBoard = () => {

    const [columns, setColumns] = useState<Column[]>([])
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [newColumn, setNewColumn] = useState<string>("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [activeTask, setActiveTask] = useState<Task | null>(null)


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3 // 3 px
            }
        })
    )

    useEffect(() => {
        if (!showModal) {
            createNewColumn(columns, newColumn, setColumns);
            setNewColumn("")
        }
    }, [showModal]);


    console.log(columns);
    console.log(newColumn);



    return (
        <div className='kanbanBoard'>

            <div className="columnWrapper">
                <DndContext
                    sensors={sensors}
                    onDragStart={(e) => onDragStart(e, setActiveColumn)}
                    onDragEnd={(e) => onDragEnd(e, columns, setColumns)}
                >
                    <SortableContext items={columnsId}>
                        {
                            columns.map((col) => (
                                <SingleColumnContainer
                                    key={col.id}
                                    column={col}
                                    task={tasks}
                                    setTasks={setTasks}
                                />
                            ))
                        }
                    </SortableContext>

                    {
                        createPortal(
                            <DragOverlay>
                                {activeColumn && (
                                    <SingleColumnContainer
                                        column={activeColumn}
                                        task={tasks}
                                        setTasks={setTasks}
                                    />
                                )}

                                {activeTask && (
                                    <SingleTaskCard
                                        task={activeTask}
                                    />
                                )}


                            </DragOverlay>,
                            document.body
                        )
                    }

                </DndContext>

                <Button
                    onClick={() => {
                        setShowModal(true)
                    }}
                    icon={<PlusCircleOutlined />}>
                    Add Column
                </Button>

                <InputModal
                    title='Add a new column'
                    value={newColumn}
                    setterMethod={setNewColumn}
                    placeholder='Enter the new column name'
                    buttonMessage='Create'
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </div>
        </div>
    )
}

export default KanbanBoard
