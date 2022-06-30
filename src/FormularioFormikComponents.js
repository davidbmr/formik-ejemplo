import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

/** Form
 * reemplaza a la etiqueta form
 * no es necesario utilizar onSubmit, ya lo hace implicito
 */

/** Field
 * reemplaza a la etiqueta input
 * con el Field, ya no es necesario pasarle como props el value, onChange, onBlur. Ya que trabaja unicamente con el nombre
 */

/** ErrorMessage
 * reemplaza a la logica natural de: {touched.nombre && errors.nombre && (<div className='error'>{errors.nombre}</div>)}
 * por
 * <ErrorMessage name='nombreDelInput' component={()=>(<componente que quieras mostrar />)} />
 * ejemplo:
 * <ErrorMessage name='nombre' component={()=>(<div className='error'>{errors.nombre}</div>)} />
 */

const FormularioFormikComponents = () => {
	const [formularioEnviado, setFormularioEnviado] = useState(false);

	return (
		<>
			<Formik
				initialValues={{
					nombre: "",
					correo: "",
				}}
				validate={(valores) => {
					let errores = {};

					//validacion nombre
					if (!valores.nombre) {
						errores.nombre = "Por favor ingresa un nombre";
					} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
						errores.nombre = "El nombre solo puede contener letras y espacios";
					}
					//validacion correo
					if (!valores.correo) {
						errores.correo = "Por favor ingresa un correo electronico";
					} else if (
						!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
							valores.correo
						)
					) {
						errores.correo =
							"El correo solo puede contener letras, numeros, puntos, guiones y guion bajo";
					}
					return errores;
				}}
				onSubmit={(valores, { resetForm }) => {
					/** valores es un obj donde se puede usar para aplicar el dispatch */
					resetForm();
					console.log("Formulario enviado");
					setFormularioEnviado(true);
					setTimeout(() => {
						setFormularioEnviado(false);
					}, 5000);
				}}
			>
				{({ errors }) => (
					<Form className='formulario'>
						<div>
							<label htmlFor='nombre'>Nombre</label>
							<Field
								type='text'
								id='nombre'
								name='nombre'
								placeholder='nombre'
							/>
							<ErrorMessage
								name='nombre'
								component={() => <div className='error'>{errors.nombre}</div>}
							/>
						</div>
						<div>
							<label htmlFor='correo'>Correo</label>
							<Field
								type='email'
								id='correo'
								name='correo'
								placeholder='correo@correo.com'
							/>
							<ErrorMessage
								name='correo'
								component={() => <div className='error'>{errors.correo}</div>}
							/>
						</div>

						{/**Trabajando con un select con el componente Field */}
						<div>
							<Field name='pais' as='select'>
								<option value='peru'>Peru</option>
								<option value='argentina'>Argentina</option>
								<option value='costaRica'>Costa Rica</option>
							</Field>
						</div>
						{/** Fin de muestra select */}

						{/** Trabajando con radioBotons con el componente Field */}
						<div>
							<label>
								<Field type='radio' name='sexo' value='hombre' /> Hombre
							</label>
							<label>
								<Field type='radio' name='sexo' value='Mujer' /> Mujer
							</label>
						</div>

						{/** Fin de muestra de radio botons */}

						{/** Trabajando con text area con el componente Field */}
						<div>
							<Field name='mensaje' as='textarea' placeholder='mensaje' />
						</div>
						{/** Fin de muestra de text area */}

						<button type='submit'>Enviar</button>
						{formularioEnviado && (
							<p className='exito'>Formulario enviado con exito!</p>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
};

export default FormularioFormikComponents;
