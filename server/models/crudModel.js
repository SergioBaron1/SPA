const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
	nombreEmpresa: {
		type: String,
		required: [true, "El nombre de la empresa es obligatorio"],
		unique: [true, "El nombre de la empresa ya existe"],
	},
	telefono: {
		type: String,
		required: [true, "Se requiere el número de teléfono"],
		min: [12, "Demasiado corto. Número no válido. Ej. 251-XXX-XXXXXX"],
		max: [12, "Demasiado largo. Número no válido. Ej. 251-XXX-XXXXXX"],
	},
	correoElectronico: {
		type: String,
		required: [true, "El correo electrónico es obligatorio"],
		trim: true,
		lowercase: true,
		unique: [true, "El correo electrónico ya existe"],
	},
	ubicacion: {
		type: String,
		required: [true, "La ubicación no puede estar en blanco"],
	},
	enlace: {
		type: String,
	},
	descripcion: {
		type: String,
		required: [true, "La descripción no puede estar en blanco"],
	},
});

module.exports = mongoose.model("Crud", crudSchema, "Cruds");
