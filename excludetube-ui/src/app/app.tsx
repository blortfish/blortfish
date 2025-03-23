import PostList from './components/PostList';
import './app.css';
import { useEffect } from 'react';

export function App() {
  // Apply dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="dark:bg-dark-900 min-h-screen p-6 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 dark:text-gray-100">ExcludeTube UI</h1>
        <div>
          <h2 className="text-2xl font-semibold mb-6 dark:text-gray-200">Welcome to ExcludeTube</h2>
          <PostList />
        </div>
      </div>
    </div>
  );
}

export default App;