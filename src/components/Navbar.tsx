
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-white/80
        backdrop-blur-xl
        border-b
        border-gray-200
      "
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="
              text-xl
              font-semibold
              text-[#1d1d1f]
              tracking-tight
            "
          >
            🌙 ECOS
          </Link>

          {/* Menú */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`
                text-sm
                transition
                ${
                  isActive("/")
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              Inicio
            </Link>

            <Link
              to="/popular"
              className={`
                text-sm
                transition
                ${
                  isActive("/popular")
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              Populares
            </Link>

            <Link
              to="/crear"
              className="
                bg-black
                text-white
                px-5
                py-2.5
                rounded-full
                text-sm
                font-medium
                hover:opacity-90
                transition
              "
            >
              ✍️ Escribir
            </Link>

            <Link
  to="/publicaciones"
  className={`
    text-sm
    transition
    ${
      isActive("/publicaciones")
        ? "text-black font-medium"
        : "text-gray-500 hover:text-black"
    }
  `}
>
  Publicaciones
</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

