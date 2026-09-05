

import type { Task, TaskFilterOptions, SortOption } from "../types";

export const filterTasks = (
    tasks: Task[], 
    filters: TaskFilterOptions
): Task[] => {
    return tasks.filter(task => {

        const title = task.title?.toLowerCase() || '';
        const description = task.description?.toLowerCase() || '';
        const searchQuery = filters.search?.toLowerCase() || '';

        const matchesSearch = 
            title.includes(searchQuery) || 
            description.includes(searchQuery);

        const matchesStatus = 
            filters.status === 'all' || task.status === filters.status;
        
        const matchesPriority = 
            filters.priority === 'all' || task.priority === filters.priority;
        

        return matchesStatus && matchesPriority && matchesSearch;
    });
};

export const sortTasks = (
    tasks: Task[], 
    sort: SortOption) : Task[] => {
        return [...tasks].sort((a, b) => {
            let comparison = 0;
            
            if (sort.field === 'dueDate') {
                comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            } else if (sort.field === 'createdAt') {
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else if (sort.field === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (sort.field === 'priority') {
                const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
                comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
            }

            return sort.order === 'asc' ? comparison : -comparison;
        });
    }
