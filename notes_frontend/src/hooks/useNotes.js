import { useEffect, useMemo, useState } from 'react';

function nowIso() {
  return new Date().toISOString();
}

function makeId() {
  // Good-enough unique id for local-only notes.
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeQuery(q) {
  return (q || '').trim().toLowerCase();
}

function noteMatchesQuery(note, query) {
  if (!query) return true;
  const title = (note.title || '').toLowerCase();
  const body = (note.body || '').toLowerCase();
  return title.includes(query) || body.includes(query);
}

// PUBLIC_INTERFACE
export function useNotes(notes, setNotes) {
  /**
   * Notes management hook.
   *
   * The notes array is owned by the caller (typically persisted with useLocalStorage).
   * This hook provides derived list state (search/sort) and actions (create/update/delete).
   *
   * Note shape:
   *  - id: string
   *  - title: string
   *  - body: string
   *  - createdAt: ISO string
   *  - updatedAt: ISO string
   *
   * @returns {{
   *   selectedId: string|null,
   *   setSelectedId: Function,
   *   query: string,
   *   setQuery: Function,
   *   sort: 'updated_desc'|'created_desc',
   *   setSort: Function,
   *   visibleNotes: Array,
   *   selectedNote: object|null,
   *   createNote: Function,
   *   updateNote: Function,
   *   deleteNote: Function,
   * }}
   */
  const [selectedId, setSelectedId] = useState(notes?.[0]?.id ?? null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('updated_desc');

  // Keep selection valid when notes change (e.g., after delete)
  useEffect(() => {
    if (!notes || notes.length === 0) {
      setSelectedId(null);
      return;
    }

    const exists = notes.some((n) => n.id === selectedId);
    if (!selectedId || !exists) {
      setSelectedId(notes[0].id);
    }
  }, [notes, selectedId]);

  const visibleNotes = useMemo(() => {
    const q = normalizeQuery(query);
    const filtered = (notes || []).filter((n) => noteMatchesQuery(n, q));

    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'created_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // default: newest updated first
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return sorted;
  }, [notes, query, sort]);

  const selectedNote = useMemo(() => {
    if (!selectedId) return null;
    return (notes || []).find((n) => n.id === selectedId) || null;
  }, [notes, selectedId]);

  // PUBLIC_INTERFACE
  const createNote = () => {
    const createdAt = nowIso();
    const newNote = {
      id: makeId(),
      title: 'Untitled',
      body: '',
      createdAt,
      updatedAt: createdAt,
    };

    setNotes((prev) => [newNote, ...(prev || [])]);
    setSelectedId(newNote.id);
    return newNote.id;
  };

  // PUBLIC_INTERFACE
  const updateNote = (id, patch) => {
    setNotes((prev) =>
      (prev || []).map((n) => {
        if (n.id !== id) return n;
        return {
          ...n,
          ...patch,
          updatedAt: nowIso(),
        };
      })
    );
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    setNotes((prev) => (prev || []).filter((n) => n.id !== id));
  };

  return {
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
  };
}
