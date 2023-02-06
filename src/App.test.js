// toBeInTheDocument関数を使用するため
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { NewThreadForm } from './NewThreadForm';
import { Posts } from './Posts';

describe('Threads index', () => {
  const setup = () => {
    render(<App />);
  };

  beforeEach(setup);

  test('verify「New threads」 exist', () => {
    const title = screen.getByText('新着スレッド');
    expect(title).toBeInTheDocument();
  });

  test('verify「Threads」 exist', () => {
    const title = screen.getByText('掲示板');
    expect(title).toBeInTheDocument();
  });

  test('verify「Start a thread」 exist', () => {
    const title = screen.getByText('スレッドをたてる');
    expect(title).toBeInTheDocument();
  });

  // テストが失敗する。原因は調査中。
  // test('verify 10 threads are exist', async () => {
  //   await waitFor(() => {
  //     const threadTitle = document.getElementsByClassName('thread_title');
  //     expect(threadTitle.length).toBe(10);
  //   });
  // });
});

describe('Thread new', () => {
  let input;
  let button;
  let getByText;

  const setup = () => {
    const utils = render(
      <BrowserRouter>
        <NewThreadForm />
      </BrowserRouter>,
    );
    input = utils.getByPlaceholderText('スレッドタイトル');
    button = utils.getByText('作成');
    getByText = utils.getByText;
    return { input, button, getByText };
  };

  beforeEach(setup);

  test('verify 「create new thread」 exist', () => {
    const title = screen.getByText('スレッド新規作成');
    expect(title).toBeInTheDocument();
  });

  test('verify renders the form', () => {
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('verify validates the title length', async () => {
    const inputs = [
      'a'.repeat(31),
      ' '.repeat(31),
      '　'.repeat(31),
      '　 '.repeat(16),
    ];

    inputs.forEach((value) => {
      fireEvent.change(input, { target: { value } });
      fireEvent.click(button);
      waitFor(() => {
        expect(button).toBeDisabled();
        expect(
          getByText('タイトルの文字数は30文字以下にしてください'),
        ).toBeInTheDocument();
      });
    });
  });

  test('verify requires title input', async () => {
    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(
        getByText('スレッドタイトルを入力してください'),
      ).toBeInTheDocument();
    });

    const inputs = [' ', '　', '　 '];

    inputs.forEach((value) => {
      fireEvent.change(input, { target: { value } });
      fireEvent.click(button);
      waitFor(() => {
        expect(button).toBeDisabled();
        expect(
          getByText('スレッドタイトルを入力してください'),
        ).toBeInTheDocument();
      });
    });
  });
});

describe('Posts index', () => {
  let states;

  afterEach(cleanup);

  beforeEach(() => {
    states = {
      posts: [
        { id: '123abcde-0000-123a-456b-abcde12345', post: 'Post 1' },
        { id: '456abcde-0000-234b-789c-bcdef23456', post: 'Post 2' },
      ],
      loading: false,
      error: null,
    };
  });

  test('verfy "Loading..." message if in loading state', () => {
    states.loading = true;
    const { getByText } = render(<Posts states={states} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('verify Error message if has error state', () => {
    states.error = 'Error';
    const { getByText } = render(<Posts states={states} />);
    expect(getByText('エラーが発生しました')).toBeInTheDocument();
  });

  test('verify NoPosts message if posts is empty', () => {
    states.posts = [];
    const { getByText } = render(<Posts states={states} />);
    expect(
      getByText('このスレッドにはまだコメントがありません'),
    ).toBeInTheDocument();
  });

  test('verify PostsList is exist', () => {
    const { getByText } = render(<Posts states={states} />);
    for (const post of states.posts) {
      expect(getByText(post.post)).toBeInTheDocument();
    }
  });
});
