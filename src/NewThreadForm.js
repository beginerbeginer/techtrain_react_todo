import React, { useState } from 'react';
import axios from 'axios';
const baseUrl = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com';

export const NewThreadForm = () => {
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
    const blankRegEx = /^\s+$/;
    if (!title) {
      setError('スレッドタイトルを入力してください');
      return;
    } else if (blankRegEx.test(title)) {
      setError('スレッドタイトルに空白のみの文字列は指定できません');
      return;
    }
    try {
      const titleTrim = title.trim();
      await axios.post(`${baseUrl}/threads`, {
        title: titleTrim,
      });
      setTitle('');
    } catch (err) {
      console.error(err);
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
          <a href="/">Topに戻る</a>
          <button type="submit" className="button" disabled={error !== null}>
            作成
          </button>
        </div>
      </form>
    </main>
  );
};
