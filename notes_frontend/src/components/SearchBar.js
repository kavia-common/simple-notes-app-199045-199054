import React from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange }) {
  /** Search input for filtering notes by title/body. */
  return (
    <div className="SearchBar">
      <label className="SearchBar__label" htmlFor="notes-search">
        Search notes
      </label>
      <input
        id="notes-search"
        className="SearchBar__input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or body…"
        autoComplete="off"
      />
    </div>
  );
}
