
# React + TypeScript Task Tracker SPA

A modern, responsive Task Tracker Single Page Application (SPA) built with React, TypeScript, and Tailwind CSS. The app features state management, declarative component architecture, a dynamic dark/light theme toggle, custom utility-based filtering and sorting, real-time metrics, and persistent storage via `localStorage`.

**Live Demo:** https://natalymelnichuk.github.io/task-dashboard/

## Features

* **Full CRUD Operations**: Create, read, edit, and delete tasks with instant UI updates.
* **Interactive Drag-and-Drop Reordering**: Smooth task reordering via `@hello-pangea/dnd` with seamless state synchronization.
* **Task Dashboard**: Live statistics counter tracking Total, Pending, In-Progress, and Completed tasks.
* **Advanced Filtering & Sorting**: Filter tasks by status and priority, search by keyword, and sort by due date, priority, title, or creation date.
* **Fluid UI & Animations**: State changes, task additions, and deletions feature layout animations powered by Motion React.
* **Dark / Light Mode**: Seamless theme switching persisted across sessions and applied globally.
* **Data Persistence**: Automatic syncing with browser `localStorage`.
* **Type Safety**: Built with strict TypeScript interfaces for robust state, prop, and event handling.


## Tech Stack

* **Frontend Framework**: React
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Drag-and-Drop**: `@hello-pangea/dnd`
* **Animations**: `motion/react` 
* **Build Tool**: Vite


# Project Reflection: React & TypeScript Task Tracker

## 1. Implementation of React & TypeScript Features

* **Strict Type Safety**: Created centralized TypeScript interfaces (`Task`, `TaskFormData`, `TaskFilterOptions`, `SortOption`) to enforce strict type contracts for component props and state.
* **Declarative State Management**: Utilized `useState` for reactive UI updates and `useEffect` for side-effect management, including real-time syncing with `localStorage` and dynamic `dark` class toggling on the `html` element.
* **Component Reusability & Polymorphism**: Designed a polymorphic `TaskForm` component that dynamically shifts between task creation and editing modes based on prop initialization.
* **State Computation**: Computed real-time task statistics (Total, Pending, In-Progress, Completed) directly within the `Dashboard` component body, avoiding unnecessary secondary state hooks.

## 2. Challenges Encountered & Solutions

* **Drag-and-Drop State Reversion vs. Automated Sorting**: 
  * *Challenge*: Reordering tasks via Drag and Drop caused items to temporarily snap back to their original positions due to conflicting automated sorting functions (`sortTasks`).
  * *Solution*: Introduced a `isCustomOrder` flag (or manual sort reset) within `Dashboard.tsx` to automatically yield precedence to custom drag-and-drop ordering whenever a user explicitly drags a task.

* **TypeScript Type Imports for External Libraries**: 
  * *Challenge*: Importing library types like `DropResult` from `@hello-pangea/dnd` triggered module syntax errors under isolated module compilation rules.
  * *Solution*: Updated type declarations to explicit type-only imports (`import type { DropResult }`) and extended `TaskListProps` cleanly using interface inheritance (`interface ExtendedTaskListProps extends TaskListProps`).

* **DOM Syncing in Dark Mode**:
  * *Challenge*: Theme classes applied only to container elements caused child components (cards, forms, inputs) to retain hardcoded light-mode background styling.
  * *Solution*: Applied the `dark` class directly to `document.documentElement` inside a `useEffect` hook in `App.tsx` and ensured smooth CSS transitions across background color swaps.


## 3. Component Composition & State Management

* **Top-Down Unidirectional Data Flow**: Maintained `Dashboard` as the central smart container holding primary state (`tasks`, `filterOptions`, `sortOptions`, `editingTask`).
* **Stateless Presentational Components**: Kept subcomponents (`TaskList`, `TaskItem`, `TaskFilter`) focused on UI rendering and event delegation via props.
* **State Initialization**: Passed initializer callbacks to `useState` for `localStorage` reads to prevent expensive parsing operations on subsequent component re-renders.