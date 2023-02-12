import React, { useReducer, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Posts } from './Posts';
import { CommentForm } from './CommentForm';
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
  const fetchPosts = useCallback(() => {
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

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { state, fetchPosts };
};

export const PostsListContainer = () => {
  const { threadId } = useParams();
  const { state, fetchPosts } = useFetchPosts(threadId);
  // コメント投稿後にコメント一覧を更新
  const fetchPostsList = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="post-form">
      <main className="main">
        <h3>全てのコメント</h3>
        <Posts state={state} />
      </main>
      <CommentForm threadId={threadId} fetchPostsList={fetchPostsList} />
    </div>
  );
};
