export function Feedback({
  message,
  retry,
}: {
  message: string;
  retry?: () => void;
}) {
  return (
    <div className="notice" role="alert">
      <h2>Un petit contretemps</h2>
      <p>{message}</p>
      {retry && (
        <button className="button" onClick={retry}>
          Réessayer ↻
        </button>
      )}
    </div>
  );
}
