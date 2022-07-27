import { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";

export function UseState(props) {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
  });

  // const [value, setValue] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          setState({ ...state, error: false, loading: false });
        } else {
          setState({ ...state, error: true, loading: false });
        }
      }, 3000);
    }
  }, [state.loading]);

  return (
    <div>
      <h2>Eliminar {props.name}</h2>

      <p>Por favor, escribe el código de seguridad.</p>

      {state.error && !state.loading && <p>Error: El código es incorrecto</p>}

      {state.loading && <p>Cargando...</p>}

      <input
        value={state.value}
        onChange={(e) => {
          setState({ ...state, value: e.target.value });
        }}
        placeholder="Código de seguridad"
      />

      <button
        disabled={state.loading}
        onClick={() => {
          setState({ ...state, loading: true });
        }}
      >
        Comprobar
      </button>
    </div>
  );
}
