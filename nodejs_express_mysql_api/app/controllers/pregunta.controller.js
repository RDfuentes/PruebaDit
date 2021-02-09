const Pregunta = require("../models/pregunta.model.js");

// Crear y guardar una pregunta
exports.create = (req, res) => {
  // validacion
  if (!req.body) {
    res.status(400).send({
      message: "Nota 1: Contenido vacio!"
    });
  }

  // Creacion de preguntas
  const pregunta = new Pregunta({
    descripcion: req.body.descripcion,
    id_cuestionario: req.body.id_cuestionario,
    active: req.body.active
  });

  // Guardar preguntas en base de datos
  Pregunta.create(pregunta, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Nota2: No se pudo guardar la pregunta."
      });
    else res.send(data);
  });
};

// Mostrar todas las preguntas
exports.findAll = (req, res) => {
  Pregunta.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Nota 3: No se pueden mostrar las preguntas."
      });
    else res.send(data);
  });
};

// Mostrar una sola pregunta
exports.findOne = (req, res) => {
  Pregunta.findById(req.params.id_pregunta, (err, data) => {
    if (err) {
      if (err.kind === "Nota 4: No funciona") {
        res.status(404).send({
          message: `Nota 5: Pregunta no encontrada ${req.params.id_pregunta}.`
        });
      } else {
        res.status(500).send({
          message: "Nota 6: La pregunta no existe, no se puede mostrar"
        });
      }
    } else res.send(data);
  });
};

// Actualizar una pregunta en especifico
exports.update = (req, res) => {
  // Validacion de solicitud
  if (!req.body) {
    res.status(400).send({
      message: "Nota 7: La pregunta no puede ser vacia!"
    });
  }

  console.log(req.body);

  Pregunta.updateById(
    req.params.preguntaId,
    new Pregunta(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "Nota 8: No funciona") {
          res.status(404).send({
            message: `Nota 9: Pregunta no se puede mostrar con el id ${req.params.preguntaId}.`
          });
        } else {
          res.status(500).send({
            message: "Nota 10: Error al encontrar la pregunta con el id" + req.params.preguntaId
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar una pregunta en especifico, despues de la contradiagonal
exports.delete = (req, res) => {
  Pregunta.remove(req.params.preguntaId, (err, data) => {
    if (err) {
      if (err.kind === "Nota 11: No funciona") {
        res.status(404).send({
          message: `Nota 12: Pregunta no se puede mostrar ${req.params.preguntaId}.`
        });
      } else {
        res.status(500).send({
          message: "Nota 13: Error al encontrar la pregunta " + req.params.preguntaId
        });
      }
    } else res.send({ message: `Nota 14: La pregunta fue eliminada exitosamente` });
  });
};

// Eliminar todas las preguntas
exports.deleteAll = (req, res) => {
  Pregunta.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Nota 15: No se pueden eliminar todas las preguntas."
      });
    else res.send({ message: `Nota 16: Preguntas eliminadas exitosamente!` });
  });
};
