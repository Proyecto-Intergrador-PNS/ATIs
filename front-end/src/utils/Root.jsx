import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";

/**
 * @file Root.jsx
 * @description Componente de entrada principal que maneja la redirección inicial del usuario.
 * Este componente determina la ruta de destino de un usuario en función de su estado de
 * autenticación y su rol, enviándolos al panel de control correcto o a la página de login.
 */

/**
 * Componente raíz que maneja el enrutamiento inicial.
 *
 * Este componente utiliza el hook `useEffect` para verificar si un usuario ha iniciado sesión
 * y qué rol tiene. Redirige a los usuarios a la página de inicio de sesión o al panel de
 * control adecuado (`admin` o `customer`). Este componente no renderiza ninguna interfaz
 * de usuario visible, por lo que siempre devuelve `null`.
 *
 * @returns {null} No renderiza nada. Su única función es redirigir.
 */
const Root = () => {
  // Obtiene el estado del usuario del contexto de autenticación.
  const { user } = useAuth();
  // Hook para la navegación programática.
  const navigate = useNavigate();

  // El `useEffect` se ejecuta cuando el componente se monta y cada vez que `user` o `navigate` cambian.
  useEffect(() => {
    // Si hay un usuario autenticado...
    if (user) {
      // Redirige según el rol del usuario.
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "customer") {
        navigate("/customer/dashboard");
      } else {
        // Redirige al login si el rol no es reconocido.
        navigate("/login");
      }
    } else {
      // Si no hay usuario, redirige a la página de login.
      navigate("/login");
    }
  }, [user, navigate]);

  return null;
}
export default Root;