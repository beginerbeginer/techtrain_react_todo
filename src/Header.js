import * as React from 'react';

export const Header = () => {
  return (
    <header className="header">
      <div className="title">掲示板</div>
      <div className="menu-item">
        <a href="/thread/new">スレッドをたてる</a>
      </div>
    </header>
  );
};
