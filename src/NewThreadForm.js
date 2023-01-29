import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const baseUrl = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com';

export const NewThreadForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  // 文字を入力する時に実行されるバリデーション
  const onChangeTitle = useCallback((e) => {
    const titleName = e.target.value;
    if (titleName.length > 30) {
      setError('タイトルの文字数は30文字以下にしてください'); // 30文字のバリデーションは暫定対応。仕様確定後に修正。
    } else {
      setError(null);
    }
    setTitle(titleName);
  }, []);

  // 送信時に実行されるバリデーション＆例外処理
  const onSubmit = useCallback(
    async (e) => {
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
    [title, navigate],
  );

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
