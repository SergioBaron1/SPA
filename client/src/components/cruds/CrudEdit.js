import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CrudEdit(props) {
	const initialState = {
		companyName: "",
		phone: "",
		email: "",
		location: "",
		link: "",
		description: "",
	};
	const [crud, setCrud] = useState(initialState);

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updateCrud() {
				try {
					const response = await get(`/api/cruds/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log(error);
				}
			}
			updateCrud();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	function handleSubmit(event) {
		event.preventDefault();
		async function updateCrud() {
			try {
				await patch(`/api/cruds/${crud._id}`, crud);
				navigate(`/cruds/${crud._id}`);
			} catch (error) {
				console.log(error);
			}
		}
		updateCrud();
	}

	function handleChange(event) {
		setCrud({ ...crud, [event.target.name]: event.target.value });
	}

	function handleCancel() {
		navigate(`/cruds/${crud._id}`);
	}

	return (
		<div className="container">
			<h1>Editar {crud.companyName}</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Nombre de la compañia:</label>
					<input
						name="companyName"
						type="text"
						value={crud.companyName}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Celular:</label>
					<input
						name="phone"
						type="tel"
						pattern="(251)-[0-9]{3}-[0-9]{6}"
						required
						value={crud.phone}
						onChange={handleChange}
						className="form-control"
					/>
					<small>Formato: 251-XXX-XXXXXX</small>
				</div>
				<div className="form-group">
					<label>Email</label>
					<input
						name="email"
						type="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
						required
						value={crud.email}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Lugar</label>
					<input
						name="location"
						type="text"
						required
						value={crud.location}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Lugar</label>
					<input
						name="link"
						type="url"
						value={crud.link}
						onChange={handleChange}
						className="form-control"
					/>
					<small>Formato: https://yourlink.ext</small>
				</div>

				<div className="form-group">
					<label>Descripción</label>
					<textarea
						name="description"
						row="5"
						value={crud.description}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">
						Actualizar
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	);
}

export default CrudEdit;