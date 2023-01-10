import React from 'react';
import axios from 'axios';
import { Header } from './Header';
import { Threads } from './Threads';
import './App.css';

const baseURL = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com';

export const App = () => {
  const [threads, setThreads] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${baseURL}/threads?offset=1`).then((res) => {
      setThreads(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <h1>新着スレッド</h1>
        <ul className="thread_list">
          <Threads threads={threads} />
        </ul>
      </main>
    </>
  );
};
