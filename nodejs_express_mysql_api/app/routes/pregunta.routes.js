module.exports = app => {
  const preguntas = require("../controllers/pregunta.controller.js");

    // Crear nuevas preguntas
    app.post("/preguntas", preguntas.create);
  
    // Mostrar todas las preguntas
    app.get("/preguntas", preguntas.findAll);
  
    // Mostrar una sola pregunta
    app.get("/preguntas/:id_pregunta", preguntas.findOne);
  
    // Actualizar una pregunta
    app.put("/preguntas/:preguntaId", preguntas.update);
  
    // Eliminar una pregunta
    app.delete("/preguntas/:preguntaId", preguntas.delete);
  
    // Crear nueva pregunta
    app.delete("/preguntas", preguntas.deleteAll);
  };