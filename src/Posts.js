import React from 'react';
import PropTypes from 'prop-types';

export const Posts = ({ state }) => {
  return (
    <>
      {state.loading && <Loading />}
      {state.error && <Error />}
      {state.posts && !state.posts.length && <NoPosts />}
      {state.posts && <PostsList posts={state.posts} />}
    </>
  );
};

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

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      post: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

Posts.propTypes = {
  state: PropTypes.object.isRequired,
};
