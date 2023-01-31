import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const baseUrl = process.env.REACT_APP_BASEURL;

export const NewThreadForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  // 文字を入力する時に実行されるバリデーション
  const validate = (value) => {
    if (value.length > 30) {
      setError('タイトルの文字数は30文字以下にしてください'); // 30文字のバリデーションは暫定対応。仕様確定後に修正。
    } else {
      setError(null);
    }
  };

  // 送信時に実行されるバリデーション＆例外処理
  const onSubmit = useCallback(
    async (data) => {
      if (!data.title.trim()) {
        setError('スレッドタイトルを入力してください');
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
        let errorMessage = '';
        if (err.response) {
          errorMessage = err.response.data.ErrorMessageJP;
        } else {
          errorMessage = 'Unknown Error';
          console.error(err);
        }
        setError(errorMessage);
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
          ref={register()}
          onChange={(e) => {
            validate(e.target.value);
          }}
          placeholder="スレッドタイトル"
        />
        {error && <p className="error">{error}</p>}
        <div>
          <a href="" onClick={() => navigate('/')}>
            Topに戻る
          </a>
          <button type="submit" className="button" disabled={error}>
            作成
          </button>
        </div>
      </form>
    </main>
  );
};
