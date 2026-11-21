type P = { className?: string };

export function FacebookIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14 8.5V6.8c0-.8.5-1 .9-1h2.4V2.1L14 2c-3.7 0-4.5 2.7-4.5 4.5v2H7.2v3.8h2.3V22H14v-9.7h3l.4-3.8H14Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.7 3.1-5.7 3.1Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75ZM9.5 9.75h3.83v1.54h.05c.53-1 1.84-2.04 3.79-2.04 4.05 0 4.8 2.66 4.8 6.12V21h-4v-4.99c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.63V21h-4V9.75Z" />
    </svg>
  );
}
