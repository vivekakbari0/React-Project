import React from 'react';
// import { NavLink } from 'react-router-dom';
import CreatePosts from '../Components/CreatePost';
// import Posts from '../Components/Create';
import ExplorePost from '../Components/ExplorePost';

const Home = () => {
  // const userData = JSON.parse(localStorage.getItem('data'));

  return (
    <>
      {/* {userData.role === 'admin' ? (
        <NavLink to="/create-post">
          <Posts />
        </NavLink>
      ) : (
        <NavLink to="/">
          <CreatePosts />
        </NavLink>
      )} */}
      <CreatePosts />
      <ExplorePost />
    </>
  );
};

export default Home;
