import { useReducer, useEffect } from "react";

const INITIAL_STATE = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const SECURITY_CODE = "paradigma";

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  delete: "DELETE",
  reset: "RESET",
  write: "WRITE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.check]: { ...state, loading: true },
  [actionTypes.delete]: { ...state, deleted: true },
  [actionTypes.reset]: { ...INITIAL_STATE },
  [actionTypes.write]: { ...state, value: payload },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  }

  return state;
};

export function UseReducer(props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const onConfirm = () => {
    dispatch({
      type: actionTypes.confirm,
    });
  };

  const onError = () => {
    dispatch({
      type: actionTypes.error,
    });
  };

  const onWrite = (event) => {
    dispatch({
      type: actionTypes.write,
      payload: event.target.value,
    });
  };
  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  };

  const onReset = () => {
    dispatch({ type: actionTypes.reset });
  };

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
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
          onChange={onWrite}
          placeholder="Código de seguridad"
        />

        <button disabled={state.loading} onClick={onCheck}>
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <div>
        <h2>Eliminar {props.name}</h2>
        <p>Pedimos confirmación. ¿Tas seguro?</p>
        <button onClick={onDelete}>Confirmar</button>
        <button onClick={onReset}>Cancelar</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>{props.name}</h2>
        <p>Eliminado con éxito</p>
        <button onClick={onReset}>Volver al inicio</button>
      </div>
    );
  }
}
