
import React, { useState } from "react";
import type { Task, TaskFilterOptions, SortOption, TaskStatus, TaskFormData } from "../../types";
import { TaskList } from "../TaskList/TaskList";
import { TaskForm } from "../TaskForm/TaskForm";

const initialTasksList: Task[] = [
    {
        id: '1',
        title: 'Learn React and TypeScript',
        description: 'Make notes from Canvas lessons and watch video',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2026-08-30',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Complete SBA and KBA',
        description: 'Check all the requirements, go through the task and then complete',
        status: 'pending',
        priority: 'medium',
        dueDate: '2026-09-01',
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Take a rest',
        description: 'Do nothing regarding React for at least 30 minutes',
        status: 'completed',
        priority: 'low',
        dueDate: '2026-08-28',
        createdAt: new Date().toISOString(),
    },
]

export const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasksList);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [filterOptions, setFilterOptions] = useState<TaskFilterOptions>({
        status: 'all',
        priority: 'all',
        search: ''
    });

    const [sortOptions, setSortOptions] = useState<SortOption>({
        field: 'dueDate',
        order: 'desc',
    });

    const handleCreateTask = (formData: TaskFormData) => {
        const newTask: Task = {
            ...formData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };

        setTasks((prevTasks) => [newTask, ...prevTasks]);
    }

    const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
        setTasks(prevTasks => 
            prevTasks.map(task => {
                if (task.id === taskId) {
                    return {...task, status: newStatus};
                }

                return task;
            })
        )
    };

    const handleDelete = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => 
            task.id !== taskId
        ));

        if (editingTask?.id === taskId) {
            setEditingTask(null);
        }
    };

    const handleEdit = (task: Task) => {
        console.log("Edit task:", task);
        setEditingTask(task);
    }

    const handleUpdateTask = (formData: TaskFormData) => {
        if (!editingTask) return;

        setTasks(prevTasks =>
            prevTasks.map(task => 
                task.id === editingTask.id ? { ...task, ...formData } : task
            )
        );

        setEditingTask(null);
    }
    return (
        <div className="space-y-6">
            <TaskForm 
                key={editingTask ? editingTask.id : 'create'}
                initialData={editingTask || undefined}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={editingTask ? () => setEditingTask(null) : undefined}
                
            />

            <TaskList 
                tasks={tasks}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    )
} 