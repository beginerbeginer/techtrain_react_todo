import React from 'react';
import PropTypes from 'prop-types';

const Loading = () => <div className="center">Loading...</div>;
const Error = () => <div className="center">エラーが発生しました</div>;
const NoPosts = () => (
  <div className="center">このスレッドにはまだコメントがありません</div>
);
const PostsList = ({ posts }) => (
  <ul className="post_list">
    {posts.map((post) => (
      <li className="post_title" key={post.id}>
        {post.post}
      </li>
    ))}
  </ul>
);

export const Posts = ({ states }) => {
  return (
    <>
      {states.loading && <Loading />}
      {states.error && <Error />}
      {states.posts && !states.posts.length && <NoPosts />}
      {states.posts && <PostsList posts={states.posts} />}
    </>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      post: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

Posts.propTypes = {
  states: PropTypes.object.isRequired,
};
