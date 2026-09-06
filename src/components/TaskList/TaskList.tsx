
import React from "react";
import { AnimatePresence } from "motion/react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult,
} from "@hello-pangea/dnd";
import { TaskItem } from "./TaskItem";
import type { TaskListProps } from "../../types";


interface ExtendedTaskListProps extends TaskListProps {
    onReorderTasks?: (reorderedTasks: TaskListProps["tasks"]) => void;
}

export const TaskList: React.FC<ExtendedTaskListProps> = ({
    tasks,
    onStatusChange,
    onDelete,
    onEdit,
    onReorderTasks,
}) => {

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination || !onReorderTasks) return;

        const reorderedTasks = Array.from(tasks);
        const [removed] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, removed);

        onReorderTasks(reorderedTasks);
    };

    if (tasks.length === 0) {
        return (
        <p className="text-slate-500 dark:text-slate-400 text-base font-medium p-6 text-center">
            No tasks found.
        </p>
        );
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks-list">
                {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                    {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(providedSnapshot) => (
                            <div
                            ref={providedSnapshot.innerRef}
                            {...providedSnapshot.draggableProps}
                            {...providedSnapshot.dragHandleProps}
                            >
                            <TaskItem
                                task={task}
                                onStatusChange={onStatusChange}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                            </div>
                        )}
                        </Draggable>
                    ))}
                    </AnimatePresence>
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
            </DragDropContext>
    );
};