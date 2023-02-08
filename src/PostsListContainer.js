import React, { useReducer } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
  const { threadId } = useParams();
  const state = useFetchPosts(threadId);

  return (
    <main className="main">
      <h3>全てのコメント</h3>
      <Posts state={state} />
    </main>
  );
};
