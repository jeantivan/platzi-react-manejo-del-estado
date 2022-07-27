import { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";

export function UseState(props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        if (value === SECURITY_CODE) {
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      }, 3000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {props.name}</h2>

      <p>Por favor, escribe el código de seguridad.</p>

      {error && !loading && <p>Error: El código es incorrecto</p>}

      {loading && <p>Cargando...</p>}

      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Código de seguridad"
      />

      <button
        disabled={loading}
        onClick={() => {
          setLoading(true);
        }}
      >
        Comprobar
      </button>
    </div>
  );
}
