// toBeInTheDocument関数を使用するため
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { NewThreadForm } from './NewThreadForm';

describe('Threads index', () => {
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

describe('Thread new', () => {
  test('verify 「create new thread」 exist', () => {
    render(
      <BrowserRouter>
        <NewThreadForm />
      </BrowserRouter>,
    );
    const title = screen.getByText('スレッド新規作成');
    expect(title).toBeInTheDocument();
  });
});

describe('<NewThreadForm />', () => {
  const setup = () => {
    const utils = render(
      <BrowserRouter>
        <NewThreadForm />
      </BrowserRouter>,
    );
    const input = utils.getByPlaceholderText('スレッドタイトル');
    const button = utils.getByText('作成');
    return { input, button, ...utils };
  };

  test('renders the form', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('validates the title length', async () => {
    const { input, button, getByText } = setup();
    const inputs = [
      'a'.repeat(31),
      ' '.repeat(31),
      '　'.repeat(31),
      '　 '.repeat(16),
    ];

    for (const value of inputs) {
      fireEvent.change(input, { target: { value } });
      fireEvent.click(button);
      await waitFor(() => {
        expect(button).toBeDisabled();
        expect(
          getByText('タイトルの文字数は30文字以下にしてください'),
        ).toBeInTheDocument();
      });
    }
  });

  test('requires title input', async () => {
    const { input, button, getByText } = setup();

    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(
        getByText('スレッドタイトルを入力してください'),
      ).toBeInTheDocument();
    });

    const inputs = [' ', '　', '　 '];

    for (const value of inputs) {
      fireEvent.change(input, { target: { value } });
      fireEvent.click(button);
      await waitFor(() => {
        expect(button).toBeDisabled();
        expect(
          getByText('スレッドタイトルを入力してください'),
        ).toBeInTheDocument();
      });
    }
  });
});
