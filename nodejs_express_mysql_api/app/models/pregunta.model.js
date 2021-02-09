const sql = require("./db.js");

// constructor
const Pregunta = function(pregunta) {
  this.descripcion = pregunta.descripcion;
  this.id_cuestionario = pregunta.id_cuestionario;
  this.active = pregunta.active;
};

// Funcion crear
Pregunta.create = (newPregunta, result) => {
  sql.query("INSERT INTO preguntas SET ?", newPregunta, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("pregunta creada: ", { id_pregunta: res.insertId, ...newPregunta });
    result(null, { id_pregunta: res.insertId, ...newPregunta });
  });
};

// Identificador unico
Pregunta.findById = (preguntaId, result) => {
  sql.query(`SELECT * FROM preguntas WHERE id_pregunta = ${preguntaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("pregunta encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // preguntas no encontradas
    result({ kind: "no encontrada" }, null);
  });
};

// mostrar todo
Pregunta.getAll = result => {
  sql.query("SELECT * FROM preguntas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("preguntas: ", res);
    result(null, res);
  });
};

// Funcion editar
Pregunta.updateById = (id_pregunta, pregunta, result) => {
  sql.query(
    "UPDATE preguntas SET descripcion = ?, id_cuestionario = ?, active = ? WHERE id_pregunta = ?",
    [pregunta.descripcion, pregunta.id_cuestionario, pregunta.active, id_pregunta],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Preguntas no encontradas
        result({ kind: "no encontrada" }, null);
        return;
      }

      console.log("editar la pregunta: ", { id_pregunta: id_pregunta, ...pregunta });
      result(null, { id_pregunta: id_pregunta, ...pregunta });
    }
  );
};

// funcion eliminar
Pregunta.remove = (id_pregunta, result) => {
  sql.query("DELETE FROM preguntas WHERE id_pregunta = ?", id_pregunta, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // preguntas no encontradas
      result({ kind: "no encontrada" }, null);
      return;
    }

    console.log("Pregunta eliminada del id_pregunta: ", id_pregunta);
    result(null, res);
  });
};

// funcion eliminar todo
Pregunta.removeAll = result => {
  sql.query("DELETE FROM preguntas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`eliminada ${res.affectedRows} preguntas`);
    result(null, res);
  });
};

module.exports = Pregunta;
