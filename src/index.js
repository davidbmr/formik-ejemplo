import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Formulario from "./Formulario";
import FormularioFormikComponents from "./FormularioFormikComponents";

ReactDOM.render(
	<React.StrictMode>
		<div className='contenedor'>
			{/* <Formulario /> */}
			<FormularioFormikComponents />
		</div>
	</React.StrictMode>,
	document.getElementById("root")
);
