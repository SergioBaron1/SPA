const Crud = require("../models/crudModel");

// Mostrar todos los datos de CRUD
const crud_index = (req, res) => {
    Crud.find(function (err, cruds) {
        res.json(cruds);
    });
};

// Crear un nuevo CRUD
const crud_create_post = (req, res) => {
    let crud = new Crud(req.body);
    crud
        .save()
        .then((crud) => {
            res.send(crud);
        })
        .catch(function (err) {
            res.status(422).send("Fallo al agregar el CRUD");
        });
};

// Mostrar detalles de un CRUD en particular por Id
const crud_details = (req, res) => {
    Crud.findById(req.params.id, function (err, crud) {
        if (!crud) {
            res.status(404).send("No se encontraron resultados");
        } else {
            res.json(crud);
        }
    });
};

// Actualizar detalles de un CRUD por Id
const crud_update = (req, res) => {
    Crud.findByIdAndUpdate(req.params.id, req.body)
        .then(function () {
            res.json("CRUD actualizado");
        })
        .catch(function (err) {
            res.status(422).send("Fallo al actualizar el CRUD.");
        });
};

// Eliminar detalles de un CRUD por Id
const crud_delete = (req, res) => {
    Crud.findById(req.params.id, function (err, crud) {
        if (!crud) {
            res.status(404).send("CRUD no encontrado");
        } else {
            Crud.findByIdAndRemove(req.params.id)
                .then(function () {
                    res.status(200).json("CRUD eliminado");
                })
                .catch(function (err) {
                    res.status(400).send("Fallo al eliminar el CRUD.");
                });
        }
    });
};

module.exports = {
    crud_index,
    crud_details,
    crud_create_post,
    crud_update,
    crud_delete,
};
