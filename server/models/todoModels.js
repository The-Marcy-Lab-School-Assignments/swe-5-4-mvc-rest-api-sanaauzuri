let id = 1;
const getId = () => id++;

const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

module.exports.list = () => {
  return [...todos];
};

module.exports.find = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return null;
  }
  return { ...todo };
};

module.exports.create = (task) => {
  const newTodo = { id: getId(), task, isDone: false };
  todos.push(newTodo);
  return { ...newTodo };
};

module.exports.update = (id, changes) => {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return null;
  }
  todo.isDone = changes.isDone;
  return { ...todo };
};

module.exports.destroy = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex < 0) {
    return false;
  }
  todos.splice(todoIndex, 1);
  return true;
};