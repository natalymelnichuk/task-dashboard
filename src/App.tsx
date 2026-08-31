
import React from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";

export const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Task Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage yout tasks
                    </p>
                </header>

                <main>
                    <Dashboard />
                </main>
            </div>
        </div>
    )
}

export default App;