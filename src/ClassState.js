import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "paradigma";

export class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  //componentWillMount
  // UNSAFE_componentWillMount() {
  //   console.log("componentWillMount");
  // }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        if (SECURITY_CODE === this.state.value) {
          this.setState({ loading: false });
        } else {
          this.setState({ error: true, loading: false });
        }
      }, 3000);
    }
  }
  render() {
    const { error, loading, value } = this.state;
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {error && !loading && <p>Error: El código es incorrecto</p>}
        {loading && <Loading />}
        <input
          value={value}
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
          placeholder="Código de seguridad"
        />
        <button
          disabled={loading}
          onClick={() => {
            this.setState({ loading: true });
          }}
        >
          Comprobar
        </button>
      </div>
    );
  }
}
