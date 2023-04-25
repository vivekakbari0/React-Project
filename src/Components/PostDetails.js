import { useParams, useNavigate } from 'react-router-dom';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

const PostDetails = () => {
  const logindata = JSON.parse(localStorage.getItem('data'));
  // Add functionality for navigating and handling post data
  const param = useParams();
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem('posts')) || [];
  const post = storedData.find((post) => post.id === param.posts_id);
  // Update routes path for edit and delete buttton
  const handleDelete = () => {
    navigate('/create-post');
  };
  const handleEdit = () => {
    navigate('/create-post');
  };

  return (
    <>
      <div className="flex justify-center items-center mx-8 my-8 sm:my-16 md:my-10 lg:my-10">
        <div className="flex flex-col items-center justify-center w-auto p-4 sm:p-8 shadow-lg bg-violet-200">
          <div className="flex flex-col sm:flex-row items-center">
            <img
              src={post.image}
              alt={post.title}
              className="w-48 h-48 object-cover mb-4 sm:mr-8"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-mono capitalize mb-2">
                {post.title}
              </h2>
              <p className="capitalize">{post.body}</p>
              <div className="mt-4 flex justify-center sm:justify-start w-full">
                {/* Show edit and delete button for admin users */}
                {logindata.role === 'admin' && (
                  <div>
                    <button
                      className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                      onClick={handleEdit}
                    >
                      <AiTwotoneEdit size={25} />
                    </button>
                    <button
                      className="bg-gray-800 hover:bg-red-500 text-white font-bold py-2 px-4 ml-3 rounded-md"
                      onClick={handleDelete}
                    >
                      <MdDeleteForever size={25} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
