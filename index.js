//Tendencias en diseño de servicios
//Esaul Navarro Mora
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para CORS
app.use(cors());
app.use(express.json());

// Array para almacenar las tareas (simulando una base de datos en memoria)
const tasks = [];

// Endpoint para crear una tarea
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
// Endpoint para obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint para marcar una tarea como realizada
app.put('/tasks/:id/complete', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  task.completed = true;
  res.json(task);
});

// Endpoint para editar una tarea
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const { title } = req.body;
  task.title = title;
  res.json(task);
});

// Endpoint para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const deletedTask = tasks.splice(index, 1)[0];
  res.json(deletedTask);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
