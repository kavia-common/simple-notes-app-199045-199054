import React from 'react';
import EmptyState from './EmptyState';
import NoteItem from './NoteItem';
import SearchBar from './SearchBar';

// PUBLIC_INTERFACE
export default function NotesList({
  notes,
  selectedId,
  onSelect,
  query,
  onQueryChange,
  sort,
  onSortChange,
  onAddNote,
  onDeleteNote,
}) {
  /** Left pane: searchable/sortable list of notes. */
  return (
    <aside className="NotesPane" aria-label="Notes list">
      <div className="NotesPane__toolbar">
        <SearchBar value={query} onChange={onQueryChange} />

        <div className="NotesPane__controls">
          <label className="NotesPane__selectLabel" htmlFor="notes-sort">
            Sort
          </label>
          <select
            id="notes-sort"
            className="NotesPane__select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="updated_desc">Newest updated</option>
            <option value="created_desc">Newest created</option>
          </select>
        </div>
      </div>

      <div className="NotesPane__list" role="list">
        {notes.length === 0 ? (
          <EmptyState
            title="No notes yet"
            description="Create your first note to get started."
            action={
              <button type="button" className="Button Button--primary" onClick={onAddNote}>
                Add Note
              </button>
            }
          />
        ) : null}

        {notes.length > 0 && notes.length === 0 ? null : null}

        {notes.length > 0 && notes.map((n) => (
          <div key={n.id} role="listitem">
            <NoteItem
              note={n}
              isActive={n.id === selectedId}
              onSelect={onSelect}
              onDelete={onDeleteNote}
            />
          </div>
        ))}

        {notes.length === 0 ? null : null}
      </div>
    </aside>
  );
}
