import React, { useReducer } from 'react';
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

const postsListReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        posts: action.payload.posts,
        loading: false,
        error: null,
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const PostsListContainer = () => {
  const [state, dispatch] = useReducer(postsListReducer, {
    posts: null,
    loading: true,
    error: null,
  });
  const location = useLocation();
  const threadId = location.state.threadId;
  const threadTitle = location.state.threadTitle;

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/threads/${threadId}/posts?offset=0`)
      .then((res) => {
        dispatch({
          type: 'SUCCESS',
          payload: { posts: res.data.posts || [] },
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR',
          payload: { error },
        });
      });
  }, []);

  return (
    <main className="main">
      <h3>タイトル：{threadTitle}</h3>
      {state.loading && <Loading />}
      {state.error && <Error />}
      {state.posts && !state.posts.length && <NoPosts />}
      {state.posts && <PostsList posts={state.posts} />}
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
