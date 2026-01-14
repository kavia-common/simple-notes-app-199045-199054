import React, { useEffect, useMemo, useState } from 'react';
import EmptyState from './EmptyState';

function formatFullDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return '';
  }
}

// PUBLIC_INTERFACE
export default function Editor({ note, onChangeTitle, onChangeBody, onAddNote }) {
  /**
   * Right pane editor.
   * Uses local component state to keep typing responsive; commits changes on each change (auto-save).
   */
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setBody(note?.body || '');
  }, [note?.id]); // reinitialize when switching notes

  const meta = useMemo(() => {
    if (!note) return null;
    return {
      created: formatFullDate(note.createdAt),
      updated: formatFullDate(note.updatedAt),
    };
  }, [note]);

  if (!note) {
    return (
      <section className="EditorPane" aria-label="Editor">
        <EmptyState
          title="Select a note"
          description="Choose a note from the list, or create a new one."
          action={
            <button type="button" className="Button Button--primary" onClick={onAddNote}>
              Add Note
            </button>
          }
        />
      </section>
    );
  }

  return (
    <section className="EditorPane" aria-label="Editor">
      <div className="EditorPane__meta" aria-label="Note timestamps">
        <span>
          <strong>Created:</strong> {meta?.created}
        </span>
        <span>
          <strong>Updated:</strong> {meta?.updated}
        </span>
      </div>

      <div className="EditorPane__form">
        <label className="EditorPane__label" htmlFor="note-title">
          Title
        </label>
        <input
          id="note-title"
          className="EditorPane__title"
          type="text"
          value={title}
          onChange={(e) => {
            const v = e.target.value;
            setTitle(v);
            onChangeTitle(note.id, v);
          }}
          placeholder="Untitled"
        />

        <label className="EditorPane__label" htmlFor="note-body">
          Body
        </label>
        <textarea
          id="note-body"
          className="EditorPane__body"
          value={body}
          onChange={(e) => {
            const v = e.target.value;
            setBody(v);
            onChangeBody(note.id, v);
          }}
          placeholder="Write your note here…"
          rows={12}
        />
      </div>
    </section>
  );
}
