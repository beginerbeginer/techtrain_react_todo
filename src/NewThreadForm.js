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
  } = useForm();

  // タイトル入力時に実行されるバリデーション
  const onChangeTitle = useCallback((e) => {
    const titleName = e.target.value;
    // 30文字のバリデーションは暫定対応。仕様確定後に修正。
    if (titleName.length > 30) {
      setError('title', {
        type: 'maxLength',
      });
    } else {
      setError('title', {
        type: '',
      });
    }
  }, []);

  // 送信時に実行されるバリデーション＆例外処理
  const onSubmit = useCallback(
    async (data) => {
      if (!data.title.trim()) {
        setError('title', {
          type: 'required',
        });
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
          console.error(errorMessage);
        } else {
          errorMessage = 'Unknown Error';
          console.error(errorMessage);
        }
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
            required: true,
            maxLength: 30,
          })}
          placeholder="スレッドタイトル"
          onChange={onChangeTitle}
        />
        {errors?.title?.type === 'required' && (
          <p>スレッドタイトルを入力してください</p>
        )}
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
