const todoModel = require('../models/todoModel');

module.exports.listTodos = (req, res) => {
  const todosList = todoModel.list();
  res.send(todosList);
};

module.exports.findTodo = (req, res) => {
  const { id } = req.params;
  const todo = todoModel.find(Number(id));
  if (!todo) {
    return res.status(404).send({
      message: `No todo with the id ${id}`
    });
  }
  res.send(todo);
};

module.exports.createTodo = (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send({ message: 'task is required' });
  }
  const newTodo = todoModel.create(task);
  res.status(201).send(newTodo);
};

module.exports.updateTodo = (req, res) => {
  const { isDone } = req.body;
  const { id } = req.params;
  const updatedTodo = todoModel.update(Number(id), { isDone });
  if (!updatedTodo) {
    return res.status(404).send({
      message: `No todo with the id ${id}`
    });
  }
  res.send(updatedTodo);
};

module.exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const didDelete = todoModel.destroy(Number(id));
  if (!didDelete) {
    return res.status(404).send({
      message: `No todo with the id ${id}`
    });
  }
  res.sendStatus(204);
};