import { useParams, useNavigate } from 'react-router-dom';

const PostDetails = () => {
  const logindata = JSON.parse(localStorage.getItem('data'));

  const param = useParams();
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem('posts')) || [];
  const post = storedData.find((post) => post.id === param.posts_id);
  const handleDelete = () => {
    navigate('/create-post');
  };
  const handleEdit = () => {
    navigate('/create-post');
  };

  return (
    <>
      <div className="flex justify-center items-center my-8 sm:my-16 md:my-20 lg:my-20">
        <div className="flex flex-col items-center justify-center w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 p-4 sm:p-8 shadow-lg bg-violet-200">
          <img
            src={post.image}
            alt={post.title}
            className="w-48 h-48 object-cover mb-4"
          />
          <h2 className="text-2xl font-mono mb-2">{post.title}</h2>
          <p className="">{post.body}</p>
          <div className="mt-4 flex justify-center w-full">
            {logindata.role === 'admin' && (
              <div>
                <button
                  className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="bg-gray-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
