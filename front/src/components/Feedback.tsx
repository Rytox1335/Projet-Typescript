export function MessageAlerte({
  texte,
  reessayer,
}: {
  texte: string;
  reessayer?: () => void;
}) {
  return (
    <div className="notice" role="alert">
      <h2>Un petit contretemps</h2>
      <p>{texte}</p>
      {reessayer && (
        <button className="button" onClick={reessayer}>
          Réessayer ↻
        </button>
      )}
    </div>
  );
}
