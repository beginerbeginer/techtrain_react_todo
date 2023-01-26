import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const baseUrl = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com';

export const NewThreadForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const onChangeTitle = (e) => {
    if (e.target.value.length > 30) {
      setError('タイトルの文字数は30文字以下にしてください');
    } else {
      setError(null);
    }
    setTitle(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('スレッドタイトルを入力してください');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/threads`, {
        title: title.trim(),
      });
      if (response.status === 200) {
        setTitle('');
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
  };

  return (
    <main className="main">
      <h1>スレッド新規作成</h1>
      <form onSubmit={onSubmit} className="form">
        <input
          value={title}
          onChange={onChangeTitle}
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
