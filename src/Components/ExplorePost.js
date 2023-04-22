import { useEffect, useState } from 'react';
import axios from 'axios';

const ExplorePost = () => {
  const [explorePosts, setExplorePosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        // show only first 10 posts
        setExplorePosts(response.data.slice(0, 10));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = explorePosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className=" mt-4">
        <section className="m-4 p-3 border-2 border-black bg-gradient-to-r from-zinc-400 via-pink-200 to-zinc-400">
          <h2 className="font-bold text-center text-2xl">Explore posts</h2>
          <div className="flex justify-center p-3 m-2">
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border-2 border-black rounded-md px-3 py-2 placeholder:text-gray-950 bg-gradient-to-r from-zinc-400 via-pink-200 to-zinc-400 font-bold"
            />
          </div>
          {isLoading ? (
            <p className="flex justify-center font-bold text-2xl text-red-700">
              Loading...
            </p>
          ) : (
            <div className="flex justify-center p-3 m-2">
              <ul className="flex flex-col mb-3 bg-gradient-to-r from-violet-300 to-violet-400">
                {filteredPosts.map((post) => (
                  <li
                    className="border border-black p-3 flex items-center"
                    key={post.id}
                  >
                    <div
                      className="flex-shrink-0 w-24 h-24 rounded-full bg-gray-200 mb-2 mr-4"
                      role="img"
                      aria-label="fallback image"
                    ></div>
                    <div>
                      <h3 className="font-bold">{post.title}</h3>
                      <p>
                        {post.body.slice(0, 120)}
                        {post.body.length > 120 && '...'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ExplorePost;
