
import React, { useState } from "react";
import type { TaskFormData, TaskFormProps, TaskStatus, TaskPriority } from "../../types";


interface FormErrors {
    title?: string;
    dueDate?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
    onSubmit,
    initialData,
    onCancel
}) => {

    const [formData, setFormData] = useState<TaskFormData> ({
        title: initialData?.title || '',
        description: initialData?.description || '',
        status: initialData?.status || 'pending',
        priority: initialData?.priority || 'medium',
        dueDate: initialData?.dueDate || '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const trimmedTitle = formData.title.trim();
        
        if (!trimmedTitle) {
            newErrors.title = "Title is required.";
        } else if (trimmedTitle.length < 3) {
            newErrors.title = "Title must be at least 3 characters long.";
        } else if (trimmedTitle.length > 50) {
            newErrors.title = "Title must be no more than 50 characters long.";
        }

        if (formData.dueDate) {
            const selectedDate = new Date(formData.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time for comparison

            if (selectedDate < today) {
                newErrors.dueDate = "Due date cannot be in the past.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

        

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!validateForm()) return;
        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {initialData ? "Edit Task" : "Create New Task"}
            </h3>

            <div className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value });
                            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                        }}
                        className={`w-full p-2 border rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.title
                                ? "border-rose-500 focus:ring-rose-500"
                                : "border-gray-300 dark:border-slate-600 focus:ring-blue-500"
                            }`}
                        placeholder="Enter task title..."
                        required
                    />
                    {errors.title && (
                        <p className="text-rose-500 text-xs mt-1">{errors.title}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => {
                            setFormData({ ...formData, description: e.target.value });
                        }}
                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Enter task description..."
                    />
                </div>

                {/* Priority, Status, DueDate */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                        <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority})}
                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                        <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                        <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => {
                            setFormData({ ...formData, dueDate: e.target.value });
                            if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: undefined }))}}
                        className={`w-full p-2 border rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors ${
                            errors.dueDate
                            ? "border-rose-500 focus:ring-rose-500"
                            : "border-gray-300 dark:border-slate-600 focus:ring-blue-500"
                        }`}
                        />
                        {errors.dueDate && (
                            <p className="text-rose-500 text-xs mt-1">{errors.dueDate}</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                    {onCancel && (
                        <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        >
                        Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    >
                        {initialData ? "Save Changes" : "Create Task"}
                    </button>
                </div>
            </div>
        </form>
    )
}
