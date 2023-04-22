import { useEffect, useState } from 'react';

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
    <>
      <div className=" mt-4">
        <section className="m-4 p-3 border-2 border-black bg-gradient-to-r from-zinc-400 via-pink-200 to-zinc-400">
          <h2 className="font-bold text-center text-2xl">Created posts</h2>
          <div className="flex justify-center p-3 m-2">
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border-2 border-black rounded-md px-3 py-2 placeholder:text-gray-950 bg-gradient-to-r from-zinc-400 via-pink-200 to-zinc-400 font-bold"
            />
          </div>
          <div className="flex justify-center p-3 m-2">
            {createdPosts.length > 0 ? (
              <ul className="flex flex-col mb-3 bg-gradient-to-r from-violet-300 to-violet-400 w-full mr-24 ml-28">
                {filteredCreatePosts.map((post) => (
                  <li
                    className="border border-black p-3 flex items-center"
                    key={post.id}
                  >
                    <div className="flex-shrink-0 mr-4" role="img">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className=" rounded-md w-20 h-24"
                        />
                      )}
                    </div>
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
            ) : (
              <p>No posts created yet.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default CreatePost;
