import { SingleColumnContainerProps, Task } from '../types/kanbanBoardTypes'
import '../styles/kanbanBoard.css'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
import { DashOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react'
import InputModal from './Modal'
import { createNewTask } from '../utils/kanbanBoard'
import SingleTaskCard from './SingleTaskCard'
import { getTasks } from '../utils/redux'

const items: MenuProps['items'] = [
    {
        label: "Edit name",
        key: "1",
        icon: <EditOutlined />
    },
    {
        label: "Delete",
        key: "2",
        icon: <DeleteOutlined />,
        danger: true,
    },
];


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

    const tasksIds = useMemo(() => {
        return getTasks().map((task) => task.id)
    }, [getTasks()])


    const [taskName, setTaskName] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [label, setLabel] = useState<string>("Easy")
    const [currentTasks, setCurrentTasks] = useState<Task[]>([])

    useEffect(() => {
        if (!openModal && taskName.length > 0) {
            createNewTask(column.id, taskName, label, getTasks())
            setTaskName("")
        }
    }, [openModal])

    useEffect(() => {
        let newTask = getTasks().filter((item) => item.columnId === column.id)
        setCurrentTasks(newTask)
    }, [getTasks()])


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

            {
                (openModal) && (
                    <InputModal
                        title={`Add a new task in ${column.title}`}
                        value={taskName}
                        setterMethod={setTaskName}
                        placeholder='write the task...'
                        buttonMessage='Add Task'
                        showModal={openModal}
                        setShowModal={setOpenModal}
                        type='task'
                        label={label}
                        setLabel={setLabel}
                    />
                )
            }

            <div className="singleColumnHeading">
                <div>
                    <span
                        style={{
                            color: "black"
                        }}
                    >
                        {column.title}
                    </span>
                    <span
                        style={{
                            color: "gray"
                        }}
                    >2</span>
                </div>

                <div>
                    <span>
                        <Dropdown menu={{ items }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <DashOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </span>
                    <span
                        onClick={() => setOpenModal(true)}
                    >
                        <PlusOutlined />
                    </span>
                </div>
            </div>

            <SortableContext items={tasksIds}>
                {
                    currentTasks.map((singleTask) => (
                        <SingleTaskCard
                            key={singleTask.id}
                            task={singleTask}
                        />
                    ))
                }
            </SortableContext>
        </div>
    )
}

export default SingleColumnContainer
