import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CreatePost = () => {
  const [createdPosts, setCreatedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch created posts data from local storage.
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      setCreatedPosts(storedPosts);
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCreatePosts = createdPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <section className="m-4 p-3 rounded-md shadow-xl bg-gradient-to-r from-zinc-300 via-pink-100 to-zinc-300 mb-10">
        <h2 className="font-bold text-center text-3xl font-serif mt-5">
          Created posts
        </h2>
        <div className="flex justify-center items-center p-3 m-2">
          <input
            type="text"
            placeholder="Search posts by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border-2 border-black rounded-md px-3 py-2 placeholder:text-gray-950 bg-gradient-to-r from-zinc-300 via-pink-100 to-zinc-300 font-mono font-bold w-full md:w-2/3 lg:w-1/2"
          />
        </div>
        <div className="flex justify-center p-3 m-2">
          {createdPosts.length > 0 ? (
            <ul className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
              {filteredCreatePosts.map((post) => (
                <Link to={`/posts/${post.id}`}>
                  <li
                    className="border border-black p-3 flex items-center mb-3 bg-gradient-to-r from-violet-200 to-violet-300 rounded-md shadow-lg"
                    key={post.id}
                  >
                    <div className="flex-shrink-0 mb-2 mr-4" role="img">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="rounded-md w-20 h-24"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 font-sans capitalize">
                        {post.title}
                      </h3>
                      <p className="capitalize">
                        {post.body.slice(0, 120)}
                        {post.body.length > 120 && '...'}
                      </p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-xl">No posts created yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
