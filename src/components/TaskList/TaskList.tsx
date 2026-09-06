
import { AnimatePresence } from "motion/react";
import type { TaskListProps} from "../../types";
import { TaskItem } from "./TaskItem";

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onStatusChange,
    onDelete,
    onEdit,
}) => {

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {tasks.length === 0 ? (
                    <p className="text-slate-500 text-base font-medium p-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        No tasks were found.</p>
                ) : (
                    tasks.map((task) => (
                    <TaskItem 
                        key={task.id}
                        task={task}
                        onStatusChange={onStatusChange}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                    ))
                )}
                
            </AnimatePresence>
        </div>
    );
};