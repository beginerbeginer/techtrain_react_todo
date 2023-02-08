import React from 'react';
import { Header } from './Header';
import { ThreadsListContainer } from './ThreadsListCotainer';
import { NewThreadForm } from './NewThreadForm';
import { PostsListContainer } from './PostsListContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { THREAD, POST } from './Routes';
import './App.css';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={THREAD.INDEX_PATH} element={<ThreadsListContainer />} />
          <Route path={THREAD.NEW_PATH} element={<NewThreadForm />} />
          <Route path={POST.INDEX_PATH} element={<PostsListContainer />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
