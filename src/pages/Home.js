import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [createdPosts, setCreatedPosts] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);

  useEffect(() => {
    // Fetch created posts data from local API
    axios
      .get('/api/created-posts')
      .then((response) => {
        setCreatedPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch explore posts data from remote API
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setExplorePosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className=" mt-4">
      <section className="m-4 p-3 border-2 border-black bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400">
        <h2 className="font-bold text-center text-2xl">Created posts</h2>
        <ul>
          {createdPosts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="m-4 p-3 border-2 border-black bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400">
        <h2 className="font-bold text-center text-2xl">Explore posts</h2>
        <div className="flex justify-center p-3 m-2">
          <ul className="mb-3 bg-gradient-to-r from-violet-300 to-violet-400">
            {explorePosts.map((post) => (
              <li className="border border-black p-3" key={post.id}>
                <h3 className="font-bold">{post.title}</h3>
                <p>
                  {post.body.slice(0, 120)}
                  {post.body.length > 120 && '...'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
