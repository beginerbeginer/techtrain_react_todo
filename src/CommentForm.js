import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { useForm } from 'react-hook-form';
const baseUrl = process.env.REACT_APP_BASEURL;

export const CommentForm = ({ threadId, fetchPostsList }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(async (data) => {
    if (!data.posts.trim()) {
      setError('posts', {
        type: 'required',
      });
      return;
    }
    try {
      const response = await axios.post(
        `${baseUrl}/threads/${threadId}/posts`,
        {
          post: data.posts.trim(),
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        reset({ posts: '' });
        fetchPostsList();
      }
    } catch (err) {
      let errorMessage = '';
      if (err.response) {
        errorMessage = err.response.data.ErrorMessageJP;
        console.error(errorMessage);
      } else {
        errorMessage = 'Unknown Error';
        console.error(errorMessage);
      }
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="commentform">
      <textarea
        name="posts"
        {...register('posts', {
          required: true,
          maxLength: 140, // 最大文字数は暫定対応。仕様確定後に修正
        })}
        placeholder="投稿しよう!"
      />
      <div className="buttonwrap">
        <input type="reset" value="リセット" />
        <input
          type="submit"
          disabled={Boolean(errors?.posts?.type)}
          value="投稿"
        />
      </div>
      {errors?.posts?.type === 'required' && <p>投稿を入力してください</p>}
      {errors?.posts?.type === 'maxLength' && (
        <p>文字数は140文字以下にしてください</p>
      )}
    </form>
  );
};

CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired,
  fetchPostsList: PropTypes.func.isRequired,
};
