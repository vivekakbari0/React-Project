import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Home from './pages/Home';
import Root from './pages/Root';
import ErrorPage from './Components/Error';
import { RoloeLoader } from './Components/AuthLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home />, loader: RoloeLoader },
      { path: '/Login', element: <Login /> },
      { path: '/create-post', element: <CreatePost />, loader: RoloeLoader },
      { path: '/posts/:posts_id', element: <Post />, loader: RoloeLoader },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
