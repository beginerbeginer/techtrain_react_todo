import React, { useReducer } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Posts } from './Posts';
const baseUrl = process.env.REACT_APP_BASEURL;

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

const useFetchPosts = (threadId) => {
  const [state, dispatch] = useReducer(postsListReducer, {
    posts: null,
    loading: true,
    error: null,
  });
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
  }, [threadId]);
  return state;
};

export const PostsListContainer = () => {
  const location = useLocation();
  const threadId = location.state.threadId;
  const threadTitle = location.state.threadTitle;
  const states = useFetchPosts(threadId);

  return (
    <main className="main">
      <h3>タイトル：{threadTitle}</h3>
      <Posts states={states} />
    </main>
  );
};
