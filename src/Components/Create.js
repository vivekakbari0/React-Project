import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import PostList from './Postlist';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    // Load posts from local storage on component mount
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    // Update local storage on any change to posts data
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  function generateID() {
    const randomNum = Math.floor(Math.random() * 1000000);
    return randomNum.toString();
  }

  const handleAddPost = () => {
    // Generate a unique post ID
    const id = generateID();
    // Create a new post object with the input values and generated ID
    const newPost = { id, title, body, image };
    // Add the new post to the posts array
    setPosts([...posts, newPost]);
    // Reset the input fields
    setTitle('');
    setBody('');
    setImage((fileRef.current.value = ''));
    // Show a success message
    toast.success('Post added successfully');
  };

  const handleDeletePost = (id) => {
    // Filter out the post with the given ID
    const filteredPosts = posts.filter((post) => post.id !== id);
    // Update the posts array
    setPosts(filteredPosts);
    // Show a success message
    toast.success('Post deleted successfully');
  };

  const handleEditPost = (id) => {
    // Find the post with the given ID
    const postToEdit = posts.find((post) => post.id === id);
    // Set the current post and input field values
    setCurrentPost(postToEdit);
    setTitle(postToEdit.title);
    setBody(postToEdit.body);
    setImage(postToEdit.image);
    // Show the edit post modal
    setShowModal(true);
  };

  const handleUpdatePost = () => {
    // Create a copy of the current post object
    const updatedPost = { ...currentPost, title, body, image };
    // Find the index of the current post in the posts array
    const index = posts.findIndex((post) => post.id === currentPost.id);
    // Create a new posts array with the updated post object at the same index
    const updatedPosts = [...posts];
    updatedPosts[index] = updatedPost;
    // Update the posts array
    setPosts(updatedPosts);
    // Reset the input fields and current post
    setTitle('');
    setBody('');
    setImage('');
    setCurrentPost({});
    setShowModal(false);
    // Show a success message
    toast.success('Post updated successfully');
  };

  return (
    <>
      <div className="flex justify-center mt-10 mb-8 text-lg">
        <button
          className="py-2 px-4 font-serif border border-black hover:bg-slate-300 rounded shadow-md"
          onClick={() => setShowModal(true)}
        >
          Create New Post
        </button>
      </div>
      <PostList
        posts={posts}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
      />
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <div className="p-4 shadow-lg mt-12 bg-slate-100">
          <h2 className="text-xl font-bold mb-5 flex justify-center font-serif">
            {Object.keys(currentPost).length === 0 ? 'Add Post' : 'Edit Post'}
          </h2>
          <label className="block mb-2 font-serif">
            Title
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-2"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="block mb-2 font-serif">
            Body
            <textarea
              className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-2"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <label className="block mb-2 font-serif">
            Image (optional)
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-2"
              type="file"
              id="image"
              ref={fileRef}
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            />
          </label>
          <div className="flex justify-center mt-7">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-serif text-white font-bold py-2 px-4 rounded ml-10"
              onClick={() =>
                Object.keys(currentPost).length === 0
                  ? handleAddPost()
                  : handleUpdatePost()
              }
            >
              {Object.keys(currentPost).length === 0
                ? 'Add Post'
                : 'Update Post'}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 font-serif text-white font-bold ml-3 py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};
export default Posts;
