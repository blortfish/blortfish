import { Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import './app.css';

export function App() {
  return (
    <div>
      <h1>ExcludeTube UI</h1>

      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>Welcome to ExcludeTube</h2>
              <p>
                <Link to="/posts">View all posts</Link>
              </p>
            </div>
          }
        />
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </div>
  );
}

export default App;