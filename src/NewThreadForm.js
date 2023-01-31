import React, { useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const baseUrl = process.env.REACT_APP_BASEURL;

export const NewThreadForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // 送信時に実行されるバリデーション＆例外処理
  const onSubmit = useCallback(
    async (data) => {
      let type = '';
      let errorMessage = '';

      if (!data.title.trim()) {
        type = 'required';
        errorMessage = 'スレッドタイトルを入力してください';
      }
      // 30文字のバリデーションは暫定対応。仕様確定後に修正。
      if (data.title.length > 30) {
        type = 'maxLength';
        errorMessage = 'タイトルの文字数は30文字以下にしてください';
      }
      if (errorMessage) {
        setError('title', {
          type,
          message: errorMessage,
        });
        return;
      }
      try {
        const response = await axios.post(`${baseUrl}/threads`, {
          title: data.title.trim(),
        });
        if (response.status === 200) {
          navigate('/');
        }
      } catch (err) {
        if (err.response) {
          errorMessage = err.response.data.ErrorMessageJP;
        } else {
          errorMessage = 'Unknown Error';
          console.error(err);
        }
        setError('title', {
          type: 'Unknown Error',
          message: errorMessage,
        });
      }
    },
    [navigate],
  );

  return (
    <main className="main">
      <h1>スレッド新規作成</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          name="title"
          {...register('title', {
            maxLength: 30,
          })}
          placeholder="スレッドタイトル"
        />
        {errors?.title?.type && <p>{errors.title.message}</p>}
        {errors?.title?.type === 'maxLength' && (
          <p>タイトルの文字数は30文字以下にしてください</p>
        )}
        <div>
          <a href="" onClick={() => navigate('/')}>
            Topに戻る
          </a>
          <button type="submit" className="button">
            作成
          </button>
        </div>
      </form>
    </main>
  );
};
