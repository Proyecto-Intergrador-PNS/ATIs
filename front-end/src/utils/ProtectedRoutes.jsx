import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router"; // Se corrigió la importación para usar react-router-dom

/**
 * @file ProtectedRoutes.jsx
 * @description Componente de enrutamiento que protege las rutas de la aplicación.
 * Este componente verifica si el usuario está autenticado y si tiene los roles requeridos
 * antes de renderizar los componentes hijos.
 */

/**
 * Componente para rutas protegidas.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Los componentes que se renderizarán si el usuario
 * está autenticado y tiene los roles correctos.
 * @param {string[]} props.requireRole - Un array de roles permitidos para acceder a la ruta.
 * @returns {React.ReactNode | null} Los componentes hijos o `null` si la redirección está en curso.
 */
const ProtectedRoutes = ({ children, requireRole }) => {
  // Obtiene el estado del usuario del contexto de autenticación.
  const { user } = useAuth();
  // Obtiene la función de navegación para redirigir al usuario.
  const navigate = useNavigate();

  // `useEffect` se ejecuta cuando el estado del usuario o el rol requerido cambian.
  useEffect(() => {
    // Si no hay un usuario, redirige a la página de login.
    if (!user) {
      navigate('/login');
      return;
    }

    // Si el rol del usuario no está incluido en los roles requeridos,
    // redirige a una página de no autorizado.
    if (!requireRole.includes(user.role)) {
    navigate('/unauthorized');
      return;
    }
  }, [user, navigate, requireRole]);

  // Si el usuario no está autenticado, no renderiza nada mientras se redirige.
  if (!user) return null;
  // Si el rol no coincide, no renderiza nada mientras se redirige.
  if (!requireRole.includes(user.role)) return null;

  // Si todas las verificaciones pasan, renderiza los componentes hijos.
  return children;
};

export default ProtectedRoutes;