import React from 'react';
import { Header } from './Header';
import { ThreadsListContainer } from './ThreadsListCotainer';
import { NewThreadForm } from './NewThreadForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { THREAD } from './Routes';
import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={THREAD.INDEX_PATH} element={<ThreadsListContainer />} />
        <Route path={THREAD.NEW_PATH} element={<NewThreadForm />} />
      </Routes>
    </BrowserRouter>
  );
};
