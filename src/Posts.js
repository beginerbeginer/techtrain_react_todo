import React from 'react';
import PropTypes from 'prop-types';

export const Posts = ({ status, data, error }) => {
  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'error' && <Error error={error.message} />}
      {status === 'success' && !data.length && <NoPosts />}
      {status === 'success' && <PostsList posts={data} />}
    </>
  );
};

const Loading = () => <div className="center">Loading...</div>;
const Error = ({ error }) => (
  <div className="center">エラーが発生しました。エラー内容：{error}</div>
);
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
  status: PropTypes.oneOf(['loading', 'error', 'success']).isRequired,
  data: PropTypes.array,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
