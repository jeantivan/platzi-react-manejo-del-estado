import React from "react";

export class Loading extends React.Component {
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return <p>Cargando...</p>;
  }
}
