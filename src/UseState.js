import { useState, useEffect } from "react";

export function UseState(props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {props.name}</h2>

      <p>Por favor, escribe el código de seguridad.</p>

      {error && <p>Error: El código es incorrecto</p>}

      {loading && <p>Cargando...</p>}

      <input placeholder="Código de seguridad" />

      <button disabled={loading} onClick={() => setLoading(true)}>
        Comprobar
      </button>
    </div>
  );
}
