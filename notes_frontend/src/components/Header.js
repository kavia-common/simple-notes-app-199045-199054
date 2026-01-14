import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ theme, onToggleTheme, onAddNote }) {
  /**
   * App header with title and primary actions.
   */
  return (
    <header className="Header" role="banner">
      <div className="Header__left">
        <div className="Header__brand" aria-label="Notes App">
          <div className="Header__logo" aria-hidden="true">
            N
          </div>
          <div className="Header__titles">
            <h1 className="Header__title">Notes</h1>
            <p className="Header__subtitle">Local, fast, and simple</p>
          </div>
        </div>
      </div>

      <div className="Header__right">
        <button type="button" className="Button Button--primary" onClick={onAddNote}>
          Add Note
        </button>
        <button
          type="button"
          className="Button Button--ghost"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
}
