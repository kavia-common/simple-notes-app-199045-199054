import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState({ title, description, action }) {
  /** Generic empty state for sections. */
  return (
    <div className="EmptyState" role="status" aria-live="polite">
      <h2 className="EmptyState__title">{title}</h2>
      {description ? <p className="EmptyState__description">{description}</p> : null}
      {action ? <div className="EmptyState__action">{action}</div> : null}
    </div>
  );
}
