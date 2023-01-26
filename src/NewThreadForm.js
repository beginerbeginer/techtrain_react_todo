import React, { useState } from 'react';
import axios from 'axios';
const baseUrl = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com';

export const NewThreadForm = () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/threads`, {
      title,
    });
  };

  return (
    <main className="main">
      <h1>スレッド新規作成</h1>
      <form onSubmit={onSubmit} className="form">
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="スレッドタイトル"
        />
        <div>
          <a href="/">Topに戻る</a>
          <button type="submit" className="button">
            作成
          </button>
        </div>
      </form>
    </main>
  );
};
