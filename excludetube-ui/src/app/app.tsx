import PostList from './components/PostList';
import './app.css';
import {useEffect} from 'react';

export function App() {
    // Apply dark mode by default
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <div className="dark:bg-dark-900 min-h-screen p-6 text-gray-800 dark:text-gray-200">
            <PostList/>
        </div>
    );
}

export default App;