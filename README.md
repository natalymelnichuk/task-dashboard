
# React + TypeScript Task Tracker SPA

A modern, responsive Task Tracker Single Page Application (SPA) built with React, TypeScript, and Tailwind CSS. The app features state management, declarative component architecture, a dynamic dark/light theme toggle, custom utility-based filtering and sorting, real-time metrics, and persistent storage via `localStorage`.

## Features

* **Full CRUD Operations**: Create, read, edit, and delete tasks with instant UI updates.
* **Task Dashboard**: Live statistics counter tracking Total, Pending, In-Progress, and Completed tasks.
* **Advanced Filtering & Sorting**: Filter tasks by status and priority, search by keyword, and sort by due date, priority, title, or creation date.
* **Dark / Light Mode**: Seamless theme switching persisted across sessions.
* **Data Persistence**: Automatic syncing with browser `localStorage`.
* **Type Safety**: Built with strict TypeScript interfaces for robust state and prop handling.


## Tech Stack

* **Frontend**: React
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Build Tool**: Vite


# Project Reflection: React & TypeScript Task Tracker

## 1. Implementation of React & TypeScript Features

* **Strict Type Safety**: Created centralized TypeScript interfaces (`Task`, `TaskFormData`, `TaskFilterOptions`, `SortOption`) to enforce strict type contracts for component props and state.
* **Declarative State Management**: Utilized `useState` for reactive UI updates and `useEffect` for side-effect management, including real-time syncing with `localStorage` and dynamic `dark` class toggling on the `html` element.
* **Component Reusability & Polymorphism**: Designed a polymorphic `TaskForm` component that dynamically shifts between task creation and editing modes based on prop initialization.
* **State Computation**: Computed real-time task statistics (Total, Pending, In-Progress, Completed) directly within the `Dashboard` component body, avoiding unnecessary secondary state hooks.

## 2. Challenges Encountered & Solutions

* **TypeScript Union Type Incompatibilities**: 
  * *Challenge*: Initial type mismatches occurred when passing string literal union types (`TaskStatus`, `TaskPriority`) from native select event targets.
  * *Solution*: Implemented explicit type assertions (`as TaskStatus | 'all'`) on change event handlers and unified shared option types across utility functions.

* **DOM Syncing in Dark Mode**:
  * *Challenge*: Theme classes applied only to container elements caused child components (cards, forms, inputs) to retain hardcoded light-mode background styling.
  * *Solution*: Applied the `dark` class directly to `document.documentElement` inside a `useEffect` hook and ensured `darkMode: 'class'` was explicitly configured in `tailwind.config.js`.


## 3. Component Composition & State Management

* **Top-Down Unidirectional Data Flow**: Maintained `Dashboard` as the central smart container holding primary state (`tasks`, `filterOptions`, `sortOptions`, `editingTask`).
* **Stateless Presentational Components**: Kept subcomponents (`TaskList`, `TaskItem`, `TaskFilter`) focused on UI rendering and event delegation via props.
* **State Initialization**: Passed initializer callbacks to `useState` for `localStorage` reads to prevent expensive parsing operations on subsequent component re-renders.