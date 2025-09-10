const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#4B164C] via-[#8e1d6c] to-[#4B164C] text-[#FFF8F3] py-8 px-4 mt-8 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 font-bold text-xl tracking-wide">
          <span className="inline-block animate-bounce">📚</span>
          Story &copy; {new Date().getFullYear()}
        </div>
        <div className="flex gap-8 text-base">
          <a href="/about" className="hover:underline hover:text-[#F8E7F6] transition duration-200">About</a>
          <a href="/contact" className="hover:underline hover:text-[#F8E7F6] transition duration-200">Contact</a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#F8E7F6] transition duration-200 flex items-center gap-1">
            <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
      <div className="text-center text-sm mt-6 opacity-80 font-medium tracking-wide">
        Made with <span className="animate-pulse text-[#F8E7F6]">❤️</span> by Khelifa Darine
      </div>
    </footer>
  )
}

export default Footer
