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

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (e) => {
    setState({ ...state, value: e.target.value });
  };

  const onCheck = () => {
    setState({ ...state, loading: true });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onCancel = () => {
    setState({ ...state, confirmed: false });
  };

  const onReset = () => {
    setState(INITIAL_STATE);
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
        <button onClick={onCancel}>Cancelar</button>
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
