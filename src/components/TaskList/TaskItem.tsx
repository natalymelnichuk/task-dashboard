

import React from "react";
import type { TaskItemProps, TaskStatus } from "../../types";

const priorityStyles = {
  low: "bg-emerald-100 text-emerald-800 border-emerald-300",
  medium: "bg-amber-100 text-amber-800 border-amber-300",
  high: "bg-rose-100 text-rose-800 border-rose-300",
};


export const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onStatusChange,
    onDelete,
    onEdit,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-4 transition-all hover:shadow-md">
            <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
                <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${priorityStyles[task.priority]}`}
                >
                {task.priority}
                </span>
            </div>
            <p className="text-slate-600 text-sm mb-4">{task.description}</p>

            <div className="text-slate-500">
                <span className="font-medium text-slate-700">Due:</span> {task.dueDate}
            </div>

            <div className="flex items-center gap-3">
                <label htmlFor={`status-select-${task.id}`} className="flex items-center gap-2 text-slate-700 font-medium">
                    Status: {' '}
                    <select 
                        id={`status-select-${task.id}`}
                        name='status'
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
                        className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>

                <button
                    onClick={() => onDelete(task.id)}
                    className="px-3 py-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                    Delete
                </button>

                <button
                    onClick={() => onEdit(task)}
                    className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-rose-600 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                    Edit
                </button>
            </div>
        </div>
    )
}