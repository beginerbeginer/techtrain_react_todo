import React from 'react';
import { Header } from './Header';
import { ThreadsListContainer } from './ThreadsListCotainer';
import { NewThreadForm } from './NewThreadForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ThreadsListContainer />} />
        <Route path="/thread/new" element={<NewThreadForm />} />
      </Routes>
    </BrowserRouter>
  );
};
