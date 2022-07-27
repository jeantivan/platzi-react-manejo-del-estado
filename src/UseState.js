import { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";
const INITIAL_STATE = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};
export function UseState(props) {
  const [state, setState] = useState(INITIAL_STATE);

  // const [value, setValue] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          setState({ ...state, error: false, loading: false, confirmed: true });
        } else {
          setState({ ...state, error: true, loading: false });
        }
      }, 3000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
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
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <div>
        <h2>Eliminar {props.name}</h2>
        <p>Pedimos confirmación. ¿Tas seguro?</p>
        <button
          onClick={() => {
            setState({ ...state, deleted: true });
          }}
        >
          Confirmar
        </button>
        <button
          onClick={() => {
            setState({ ...state, confirmed: false });
          }}
        >
          Cancelar
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>{props.name}</h2>
        <p>Eliminado con éxito</p>
        <button
          onClick={() => {
            setState(INITIAL_STATE);
          }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }
}
