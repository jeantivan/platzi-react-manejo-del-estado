import { useReducer, useEffect } from "react";

const INITIAL_STATE = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const SECURITY_CODE = "paradigma";

const reducerObject = (state, payload) => ({
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  CHECK: { ...state, loading: true },
  CONFIRM: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  DELETE: { ...state, deleted: true },
  RESET: { ...INITIAL_STATE },
  WRITE: { ...state, value: payload },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  }

  return state;
};

export function UseReducer(props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const onWrite = (e) => {
    //setState({ ...state, value: e.target.value });
  };

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          dispatch({
            type: "CONFIRM",
          });
        } else {
          dispatch({
            type: "ERROR",
          });
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
          onChange={(event) => {
            dispatch({
              type: "WRITE",
              payload: event.target.value,
            });
          }}
          placeholder="Código de seguridad"
        />

        <button
          disabled={state.loading}
          onClick={() => {
            dispatch({ type: "CHECK" });
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
            dispatch({ type: "DELETE" });
          }}
        >
          Confirmar
        </button>
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
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
            dispatch({ type: "RESET" });
          }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }
}
