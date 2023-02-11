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
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        name="posts"
        {...register('posts', {
          required: true,
          maxLength: 140,
          // 空白文字だけでは投稿できない。文字と文字の間の空白は許可。改行も許可
          pattern: /^[\S][\s\S]*[\S]$/,
        })}
        placeholder="投稿しよう!"
        onChange={onChangePost}
      />
      <input
        type="submit"
        disabled={Boolean(errors?.posts?.type)}
        value="投稿"
        className="button"
      />
      {errors?.posts?.type === 'required' && <p>投稿を入力してください</p>}
      {errors?.posts?.type === 'maxLength' && (
        <p>文字数は140文字以下にしてください</p>
      )}
      {errors?.posts?.type === 'pattern' && (
        <p>先頭と文末の空白文字を削除してください</p>
      )}
    </form>
  );
};

CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired,
  fetchPostsList: PropTypes.func.isRequired,
};
