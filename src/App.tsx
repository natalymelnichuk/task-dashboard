
import React from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";

export const App: React.FC = () => {

    const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light';
    });

    React.useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };  

    return (
        <div className={`${theme === 'dark' ? 'dark bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'} min-h-screen p-6 md:p-10 transition-colors duration-200`}>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Task Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage yout tasks
                    </p>

                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-lg font-medium border text-sm transition-colors ${
                            theme === 'dark'
                                ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm'
                        }`}
                    >
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </header>

                <main>
                    <Dashboard />
                </main>
            </div>
        </div>
    )
}

export default App;