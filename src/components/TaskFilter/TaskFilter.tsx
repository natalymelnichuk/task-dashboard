

import React from 'react';
import type { TaskFilterOptions, SortOption, TaskStatus, TaskPriority } from '../../types';

interface TaskFilterProps {
    filterOptions: TaskFilterOptions;
    sortOptions: SortOption;
    onFilterChange: (filters: TaskFilterOptions) => void;
    onSortChange: (sort: SortOption) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
    filterOptions,
    sortOptions,
    onFilterChange,
    onSortChange
}) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 space-y-4"> 
            <div>
                <label className="block text-sm font-medium text-gray-700">Search</label>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterOptions.search}
                    onChange={(e) => onFilterChange({ ...filterOptions, search: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                    <select
                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterOptions.status}
                        onChange={(e) => onFilterChange({ ...filterOptions, status: e.target.value as TaskStatus | 'all' })}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>                
            </div>   

            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Priority</label>
                <select
                    className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterOptions.priority}
                    onChange={(e) => onFilterChange({ ...filterOptions, priority: e.target.value as TaskPriority | 'all' })}
                >
                    <option value="all">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Sort By</label>
                <div className="flex gap-2">
                    <select
                        className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={sortOptions.field}
                        onChange={(e) => onSortChange({ ...sortOptions, field: e.target.value as SortOption['field'] })}
                    >
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                        <option value="createdAt">Created At</option>
                        <option value="title">Title</option>
                    </select>

                    <button
                        onClick={() => 
                            onSortChange({ ...sortOptions, order: sortOptions.order === 'asc' ? 'desc' : 'asc' })}
                        className="px-3 py-2 bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 font-semibold text-gray-700 dark:text-slate-100 whitespace-nowrap transition-colors"
                        title="Toggle sort direction"
                    >
                        {sortOptions.order === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                </div>                
            </div>
        </div>
    );
};