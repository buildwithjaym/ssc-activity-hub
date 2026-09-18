export default function SocialIcons() {
  return (
    <div className="flex items-center gap-4">

      {/* Facebook */}
      <a
        href="#"
        className="text-white/50 hover:text-white transition"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.1 1.8.1v2h-1c-1.1 0-1.4.7-1.4 1.4V12h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z"/>
        </svg>
      </a>


      {/* Instagram */}
      <a
        href="#"
        className="text-white/50 hover:text-white transition"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5z"/>
        </svg>
      </a>


      {/* Youtube */}
      <a
        href="#"
        className="text-white/50 hover:text-white transition"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M23 12s0-3.5-.4-5.1c-.2-.9-.9-1.6-1.8-1.8C19.2 4.7 12 4.7 12 4.7s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 8.5 1 12 1 12s0 3.5.4 5.1c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-5.1.4-5.1z"/>
        </svg>
      </a>


    </div>
  );
}