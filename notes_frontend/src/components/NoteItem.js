import React from 'react';

function formatUpdatedAt(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

// PUBLIC_INTERFACE
export default function NoteItem({ note, isActive, onSelect, onDelete }) {
  /** A single note row for the NotesList. */
  const title = note.title?.trim() ? note.title : 'Untitled';
  const preview = note.body?.trim() ? note.body.trim() : 'No content yet…';

  return (
    <div className={`NoteItem ${isActive ? 'NoteItem--active' : ''}`}>
      <button
        type="button"
        className="NoteItem__main"
        onClick={() => onSelect(note.id)}
        aria-current={isActive ? 'true' : 'false'}
      >
        <div className="NoteItem__top">
          <div className="NoteItem__title" title={title}>
            {title}
          </div>
          <div className="NoteItem__date" aria-label={`Updated ${formatUpdatedAt(note.updatedAt)}`}>
            {formatUpdatedAt(note.updatedAt)}
          </div>
        </div>
        <div className="NoteItem__preview">{preview}</div>
      </button>

      <button
        type="button"
        className="IconButton"
        onClick={() => onDelete(note)}
        aria-label={`Delete note ${title}`}
        title="Delete"
      >
        ×
      </button>
    </div>
  );
}
