import { useMemo, useState } from 'react'
import '../styles/kanbanBoard.css'
import { Column } from '../types/kanbanBoardTypes'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { createNewColumn, onDragStart } from '../utils/kanbanBoard'
import SingleColumnContainer from './SingleColumnContainer'
import { SortableContext } from '@dnd-kit/sortable'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { createPortal } from 'react-dom'

const KanbanBoard = () => {

    const [columns, setColumns] = useState<Column[]>([])
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)

    console.log(columns);


    return (
        <div className='kanbanBoard'>

            <div className="columnWrapper">
                <DndContext onDragStart={(e) => onDragStart(e, setActiveColumn)}>
                    <SortableContext items={columnsId}>
                        {
                            columns.map((col) => (
                                <SingleColumnContainer column={col} />
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
                            </DragOverlay>,
                            document.body
                        )
                    }

                </DndContext>

                <Button
                    onClick={() => createNewColumn(columns, setColumns)}
                    icon={<PlusCircleOutlined />}>
                    Add Column
                </Button>
            </div>
        </div>
    )
}

export default KanbanBoard
