import { useMemo, useState, useEffect } from 'react'
import '../styles/kanbanBoard.css'
import { Column, Task } from '../types/kanbanBoardTypes'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { createNewColumn, onDragEnd, onDragOver, onDragStart } from '../utils/kanbanBoard'
import SingleColumnContainer from './SingleColumnContainer'
import { SortableContext } from '@dnd-kit/sortable'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { createPortal } from 'react-dom'
import InputModal from './Modal'
import SingleTaskCard from './SingleTaskCard'
import { getColumns } from '../utils/redux'

const KanbanBoard = () => {

    const columnsId = useMemo(() => getColumns().map((col) => col.id), [getColumns()])
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [newColumn, setNewColumn] = useState<string>("")
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
            createNewColumn(getColumns(), newColumn);
            setNewColumn("")
        }
    }, [showModal]);


    console.log(getColumns());
    console.log(newColumn);



    return (
        <div className='kanbanBoard'>

            <div className="columnWrapper">
                <DndContext
                    sensors={sensors}
                    onDragStart={(e) => onDragStart(e, setActiveColumn, setActiveTask)}
                    onDragEnd={(e) => onDragEnd(e, setActiveColumn, setActiveTask)}
                    onDragOver={(e) => onDragOver(e)}
                >
                    <SortableContext items={columnsId}>
                        {
                            getColumns().map((col) => (
                                <SingleColumnContainer
                                    key={col.id}
                                    column={col}
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
                    type={null}
                />
            </div>
        </div>
    )
}

export default KanbanBoard
