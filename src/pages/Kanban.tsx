import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import '../styles/kanban.css';

interface Task {
  id: string;
  name: string;
}

interface SectionProps {
  title: string;
  tasks: Task[];
  addTask: () => void;
}

interface SortableItemProps {
  id: string;
  task: Task;
}

const Kanban: React.FC = () => {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({
    todo: [],
    unresolved: [],
    inProgress: [],
    finished: [],
  });

  const addTask = (section: string) => {
    const task = prompt('Enter task name');
    if (task) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [section]: [...prevTasks[section], { id: uuidv4(), name: task }],
      }));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const { id: activeId } = active;
      const { id: overId } = over;

      if (activeId !== overId) {
        setTasks((prevTasks) => {
          const activeContainer = Object.keys(prevTasks).find((key) =>
            prevTasks[key].find((task) => task.id === activeId)
          );
          const overContainer = Object.keys(prevTasks).find((key) =>
            prevTasks[key].find((task) => task.id === overId)
          );

          if (activeContainer && overContainer) {
            const activeIndex = prevTasks[activeContainer].findIndex(
              (task) => task.id === activeId
            );
            const overIndex = prevTasks[overContainer].findIndex(
              (task) => task.id === overId
            );

            const newActiveContainerTasks = arrayMove(
              prevTasks[activeContainer],
              activeIndex,
              overIndex
            );

            return {
              ...prevTasks,
              [activeContainer]: newActiveContainerTasks,
            };
          }
          return prevTasks;
        });
      }
    }
  };

  const Section: React.FC<SectionProps> = ({ title, tasks, addTask }) => (
    <div className="section">
      <h2>{title}</h2>
      <button onClick={addTask}>+ Add Task</button>
      <SortableContext items={tasks}>
        {tasks.map((task) => (
          <SortableItem key={task.id} id={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );

  const SortableItem: React.FC<SortableItemProps> = ({ id, task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {task.name}
      </div>
    );
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem' }}>
        <Section title="To Do" tasks={tasks.todo} addTask={() => addTask('todo')} />
        <Section title="Unresolved" tasks={tasks.unresolved} addTask={() => addTask('unresolved')} />
        <Section title="In Progress" tasks={tasks.inProgress} addTask={() => addTask('inProgress')} />
        <Section title="Finished" tasks={tasks.finished} addTask={() => addTask('finished')} />
      </div>
    </DndContext>
  );
};

export default Kanban;
