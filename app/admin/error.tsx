'use client';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto', color: '#fff' }}>
      <h2 style={{ color: '#f87171' }}>Erreur admin</h2>
      <pre style={{
        background: 'rgba(255,0,0,0.1)',
        padding: 16,
        borderRadius: 8,
        fontSize: 13,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        marginTop: 12,
      }}>
        {error.message}
        {error.stack && '\n\n' + error.stack}
      </pre>
      <button
        onClick={reset}
        style={{
          marginTop: 16,
          padding: '12px 24px',
          background: '#f4811f',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 700,
        }}
      >
        Reessayer
      </button>
    </div>
  );
}
