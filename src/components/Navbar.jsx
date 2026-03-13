export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-red-950 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <img src="Alternate_Logo_No_Text.png" alt="Lay Down The Groove" className="h-20 invert" />
        <ul className="flex space-x-4 text-white  tracking-widest">
          <li><a href="#releases" className="hover:text-gray-400">Releases</a></li>
          <li><a href="#artists" className="hover:text-gray-400">Artists</a></li>
          <li><a href="#events" className="hover:text-gray-400">Events</a></li>
          <li><a href="#about" className="hover:text-gray-400">About</a></li>
        </ul>
      </div>
    </nav>
  );
}