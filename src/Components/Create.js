import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import PostList from './Postlist';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');

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
    setImage('');
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
    if (Object.keys(currentPost).length === 0) {
      // Show an error message if the user tries to update a post without selecting it first
      toast.error('Please select a post to update');
      return;
    }
    // Create a copy of the current post object
    const updatedPost = { ...currentPost };
    // Update the copy with the new input values
    updatedPost.title = title;
    updatedPost.body = body;
    updatedPost.image = image;
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
    <div className="m-4">
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        <div className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-bold mb-2">
            {Object.keys(currentPost).length === 0 ? 'Add Post' : 'Edit Post'}
          </h2>
          <label className="block mb-2">
            Title
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Body
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <label className="block mb-2">
            Image (optional)
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Posts;
