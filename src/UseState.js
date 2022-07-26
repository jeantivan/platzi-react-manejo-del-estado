import { useState } from "react";

export function UseState(props) {
  const [error, setError] = useState(false);
  return (
    <div>
      <h2>Eliminar {props.name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {error && <p>Error: El código es incorrecto</p>}
      <input placeholder="Código de seguridad" />
      <button onClick={() => setError(!error)}>Comprobar</button>
    </div>
  );
}
