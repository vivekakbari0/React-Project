import React from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

const PostList = ({ posts, onEditPost, onDeletePost }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-slate-200 shadow-lg rounded-md">
          <div className="flex flex-row items-start">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="h-32 mr-4 mt-2"
              />
            )}
            <div>
              <h2 className="text-xl font-bold capitalize mb-2 font-serif">
                {post.title}
              </h2>
              <p className="text-gray-700 font-sans capitalize">
                {post.body.slice(0, 120)}
                {post.body.length > 120 && '...'}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="py-2 px-4 rounded"
              onClick={() => onEditPost(post.id)}
            >
              <AiTwotoneEdit size={25} />
            </button>
            <button
              className="py-2 px-4 rounded"
              onClick={() => onDeletePost(post.id)}
            >
              <MdDeleteForever size={25} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
