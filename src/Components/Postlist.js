import React from 'react';

const PostList = ({ posts, onEditPost, onDeletePost }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          {post.image && (
            <img src={post.image} alt={post.title} className="w-full mb-2" />
          )}
          <p className="text-gray-700">{post.body}</p>
          <div className="flex justify-between mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onEditPost(post.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onDeletePost(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
