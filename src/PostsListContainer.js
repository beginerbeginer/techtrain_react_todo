import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
const baseUrl = process.env.REACT_APP_BASEURL;
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

export const PostsListContainer = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const threadId = location.state.threadId;
  const threadTitle = location.state.threadTitle;

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/threads/${threadId}/posts?offset=0`)
      .then((res) => {
        setPosts(res.data.posts || []);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <main className="main">
      <h3>タイトル：{threadTitle}</h3>
      {error ? (
        <Error />
      ) : posts === null ? (
        <Loading />
      ) : posts.length ? (
        <PostsList posts={posts} />
      ) : (
        <NoPosts />
      )}
    </main>
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
