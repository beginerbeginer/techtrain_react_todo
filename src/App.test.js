// toBeInTheDocument関数を使用するため
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  test('verify「New threads」 exist', () => {
    render(<App />);
    const title = screen.getByText('新着スレッド');
    expect(title).toBeInTheDocument();
  });

  test('verify「Threads」 exist', () => {
    render(<App />);
    const title = screen.getByText('掲示板');
    expect(title).toBeInTheDocument();
  });

  test('verify「Start a thread」 exist', () => {
    render(<App />);
    const title = screen.getByText('スレッドをたてる');
    expect(title).toBeInTheDocument();
  });

  test('verify 10 threads are exist', async () => {
    render(<App />);
    await waitFor(() => {
      const threadTitle = document.getElementsByClassName('thread_title');
      expect(threadTitle.length).toBe(10);
    });
  });
});
