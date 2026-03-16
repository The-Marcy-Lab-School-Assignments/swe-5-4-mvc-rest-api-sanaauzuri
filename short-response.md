# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:

1. The **API** uses endpoint URLs that describe actions like `/api/todos` and `/api/todos/:id`, they identify the thing being worked with rather than the action for a client developer. 

2. Second, it uses the correct HTTP methods to indicate an action: **GET** to retrieve data, **POST** to create data, **PATCH** to update data, and **DELETE** to remove data. This allows the client developer to perform many different operations on the same endpoint URL. 

3. Third, it returns proper **status codes** that communicate exactly what happened: `201` when a new todo is created, `204` when one is deleted with no body to send back, `400` when the task field is missing from the request, and `404` when an id doesn't match any todo in the array.  Client developers are able to identify what an error is instead of performing guesswork.

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

When all the data logic and request/response logic is in a single file, it becomes a code monolith. Separating them into a model and controller give each file a clear function
<!-- Will re-do -->

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

1. The frontend sends a **PATCH** request to `/api/todos/:id` when the user clicks the checkbox
2. `index.js` recieves the reuest and routes the request to matching controller function `updateTodo` in `todoControllers.js`, which gets the `id` from `req.params` and the `isDone` from `req.body`
3. The controller calls `todoModel.update()` in `todoModel.js`, which finds the matching todo id and changes its `isDone` field.
4. The model returns the updated todo to the controller, which sends it back to the client.


## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

```js
const createTodo = (req, res) => {
  /* 1. CONTROLLER — gets the task out of the request body (req) */ 
  const { task } = req.body;
  /* 2. CONTROLLER — sends an HTTP error response (res) */ 
  if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3. MODEL — creates a new data object for the "database" */ 
  const newTodo = { id: getId(), task, isDone: false };
  /* 4. MODEL — modifies the todos array (the "database") */ 
  todos.push(newTodo);
  /* 5. CONTROLLER — sends the HTTP success response (res) */ 
  res.status(201).send(newTodo);
};
```