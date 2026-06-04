function Navbar() {
  return (
    // 🌟 Cambiamos bg-indigo-600 por bg-red-600 para el fondo principal
    <nav className="rounded-xl w-[250px] min-h-[880px] bg-red-600 text-white sticky top-0 p-4 m-4 shadow-lg">
      {/* Logo o título */}
      <h2 className="text-xl font-bold mb-8 border-b border-red-500 pb-3">Despacho Dashboard</h2>

      {/* Menú de navegación */}
      <ul className="space-y-3">
        <li>
          <a
            href="#"
            // 🌟 Cambiamos hover:bg-indigo-700 por hover:bg-red-700
            className="block font-bold py-2 px-3 hover:bg-red-700 rounded transition-colors duration-200"
          >
            Usuarios
          </a>
        </li>
        <li>
          <a
            href="#"
            // 🌟 Cambiamos hover:bg-indigo-700 por hover:bg-red-700
            className="block font-bold py-2 px-3 hover:bg-red-700 rounded transition-colors duration-200"
          >
            Productos
          </a>
        </li>
        <li>
          <a
            href="#"
            // 🌟 Cambiamos hover:bg-indigo-700 por hover:bg-red-700
            className="block font-bold py-2 px-3 hover:bg-red-700 rounded transition-colors duration-200"
          >
            Configuración
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;