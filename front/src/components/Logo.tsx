export function Logo({ large = false }: { large?: boolean }) {
  return (
    <svg
      className={large ? "logo logo-large" : "logo"}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="Logo Culture Quiz"
    >
      <path
        d="M22 20h56v49H58L43 84V69H22V20Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M40 36c1-12 23-12 23 1 0 9-13 8-13 16"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="61" r="3" fill="currentColor" />
      <path
        d="m9 9 5 5m73 69 5 5M84 9l-5 5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
