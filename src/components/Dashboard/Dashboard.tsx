
import React, { useState } from "react";
import type { Task, TaskFilterOptions, SortOption, TaskStatus, TaskFormData } from "../../types";
import { TaskList } from "../TaskList/TaskList";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { filterTasks, sortTasks } from "../../utils/taskUtils";


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
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            try {
                return JSON.parse(savedTasks) as Task[];
            } catch (error) {
                console.error("Failed to parse tasks from localStorage:", error);
            }
        }
        return initialTasksList;
    });

    React.useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

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
    };

    const stats = {
        total: tasks.length,
        pending: tasks.filter(task => task.status === 'pending').length,
        inProgress: tasks.filter(task => task.status === 'in-progress').length,
        completed: tasks.filter(task => task.status === 'completed').length,
    }

    const [isCustomOrder, setIsCustomOrder] = useState<boolean>(false);

    const handleReorderTasks = (reorderedTasks: Task[]) => {

        setIsCustomOrder(true);

        setTasks((prevTasks) => {
            const updated = [...prevTasks];

            const reorderedIds = new Set(reorderedTasks.map(task => task.id));

            const firstIndex = updated.findIndex(task => reorderedIds.has(task.id));

            const remaining = updated.filter(task => !reorderedIds.has(task.id));

            const insertAt = firstIndex !== -1 ? firstIndex : 0;
            remaining.splice(insertAt, 0, ...reorderedTasks);

            return remaining;
        });
        localStorage.setItem("tasks", JSON.stringify(reorderedTasks));
    };

    const handleSortChange = (newSortOptions: SortOption) => {
        setIsCustomOrder(false); 
        setSortOptions(newSortOptions);
    };

    const filteredTasks = filterTasks(tasks, filterOptions);

    const processedTasks = isCustomOrder ? filteredTasks : sortTasks(filteredTasks, sortOptions);


    return (
        <div className="space-y-6">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm text-center">
                    <p className="text-sm font-medium text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm text-center">
                    <p className="text-sm font-medium text-gray-500">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm text-center">
                    <p className="text-sm font-medium text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
                </div>
            </div>

            <TaskForm 
                key={editingTask ? editingTask.id : 'create'}
                initialData={editingTask || undefined}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={editingTask ? () => setEditingTask(null) : undefined}
                
            />

            <TaskFilter
                filterOptions={filterOptions}
                sortOptions={sortOptions}
                onFilterChange={setFilterOptions}
                onSortChange={handleSortChange}
            />

            <TaskList 
                tasks={processedTasks}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onReorderTasks={handleReorderTasks}
            />
        </div>
    )
} 