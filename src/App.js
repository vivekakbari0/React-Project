import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Home from './pages/Home';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/Login', element: <Login /> },
      { path: '/create-post', element: <CreatePost /> },
      { path: '/posts/:posts_id', element: <Post /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
