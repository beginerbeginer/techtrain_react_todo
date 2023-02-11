import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { useForm } from 'react-hook-form';
const baseUrl = process.env.REACT_APP_BASEURL;

export const CommentForm = ({ threadId }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // タイトル入力時に実行されるバリデーション
  const onChangePost = useCallback((e) => {
    const texts = e.target.value;
    // 140文字のバリデーションは暫定対応。仕様確定後に修正。
    if (texts.length > 140) {
      setError('posts', {
        type: 'maxLength',
      });
    } else {
      setError('posts', {
        type: '',
      });
    }
  }, []);

  const onSubmit = useCallback(async (data) => {
    if (!data.posts.trim()) {
      setError('posts', {
        type: 'required',
      });
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
        window.location.reload();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        name="posts"
        {...register('posts', {
          required: true,
          maxLength: 140,
        })}
        placeholder="投稿しよう!"
        onChange={onChangePost}
      />
      <div>
        <button
          type="submit"
          className="button"
          disabled={Boolean(errors?.posts?.type)}
        >
          投稿
        </button>
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
};
