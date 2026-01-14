import React, { useEffect, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import Editor from './components/Editor';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotes } from './hooks/useNotes';

const STORAGE_KEYS = {
  notes: 'notes_app.notes',
  theme: 'notes_app.theme',
};

function ensureSeedNotes(existing) {
  if (Array.isArray(existing) && existing.length > 0) return existing;

  const createdAt = new Date().toISOString();
  return [
    {
      id: 'welcome',
      title: 'Welcome',
      body: 'This is a local notes app.\n\n- Add notes\n- Search & sort\n- Auto-save edits\n- Delete with confirmation',
      createdAt,
      updatedAt: createdAt,
    },
  ];
}

// PUBLIC_INTERFACE
function App() {
  /** Root component for the notes application. */
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, 'light');
  const [notes, setNotes] = useLocalStorage(STORAGE_KEYS.notes, []);

  // Seed initial note on first run (only if there are no notes yet)
  useEffect(() => {
    setNotes((prev) => ensureSeedNotes(prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme using document attribute for CSS variables.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const {
    selectedId,
    setSelectedId,
    query,
    setQuery,
    sort,
    setSort,
    visibleNotes,
    selectedNote,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes(notes, setNotes);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const onDeleteNote = (note) => {
    const title = note.title?.trim() ? note.title.trim() : 'Untitled';
    // eslint-disable-next-line no-alert
    const ok = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!ok) return;
    deleteNote(note.id);
  };

  const onChangeTitle = (id, title) => updateNote(id, { title });
  const onChangeBody = (id, body) => updateNote(id, { body });

  const countLabel = useMemo(() => `${visibleNotes.length} note${visibleNotes.length === 1 ? '' : 's'}`, [
    visibleNotes.length,
  ]);

  return (
    <div className="App">
      <Header theme={theme} onToggleTheme={toggleTheme} onAddNote={createNote} />

      <main className="Shell" aria-label="Notes app">
        <div className="Shell__left">
          <div className="Shell__count" aria-label="Visible notes count">
            {countLabel}
          </div>
          <NotesList
            notes={visibleNotes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            query={query}
            onQueryChange={setQuery}
            sort={sort}
            onSortChange={setSort}
            onAddNote={createNote}
            onDeleteNote={onDeleteNote}
          />
        </div>

        <div className="Shell__right">
          <Editor note={selectedNote} onChangeTitle={onChangeTitle} onChangeBody={onChangeBody} onAddNote={createNote} />
        </div>
      </main>
    </div>
  );
}

export default App;
