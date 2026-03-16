# swe-5-5-mvc-rest-api

Deployment Link: https://swe-5-4-mvc-rest-api-sanaauzuri.onrender.com

In this assignment, you will build a **Todo Tracker** REST API in two parts:

- **Part 1** — Write a working **RESTful** CRUD API in a single `server/index.js` file
- **Part 2** — Refactor it into the **Model-View-Controller (MVC)** architecture

A fully functional frontend is already provided. Your job is to build the server that powers it.

Refer to the associated lessons for support:
* [RESTful CRUD APIs](https://marcylabschool.gitbook.io/marcy-lab-school-docs/mod-5-servers/7-rest-crud-api)
* [Model-View-Controller Architecture](https://marcylabschool.gitbook.io/marcy-lab-school-docs/mod-5-servers/8-model-view-controller)

**Table of Contents**
- [Setup](#setup)
- [Short Response Questions](#short-response-questions)
- [Part 1 — RESTful CRUD API](#part-1--restful-crud-api)
  - [Part 1 Grading](#part-1-grading)
  - [Step 1 — Start the Server](#step-1--start-the-server)
  - [Step 2 — Build the Todo API](#step-2--build-the-todo-api)
- [Part 2 — MVC Refactor](#part-2--mvc-refactor)
  - [Part 2 Grading](#part-2-grading)
  - [Step 3 — Create the Model](#step-3--create-the-model)
  - [Step 4 — Create the Controllers](#step-4--create-the-controllers)
  - [Step 5 — Update index.js](#step-5--update-indexjs)
- [Step 6 — Deploy](#step-6--deploy)
- [Error Codes](#error-codes)

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy Lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/how-tos/working-with-assignments#how-to-work-on-assignments).

After cloning your repository, create a `draft` branch to do your Part 1 work:

```sh
git checkout -b draft
```

When you begin Part 2, create a new branch off `draft`:

```sh
git checkout -b draft-refactor
```

## Short Response Questions

Short response questions can be found in the `short-response.md` file. Write your responses directly in that file. Do not forget to complete this part of the assignment.

---

## Part 1 — RESTful CRUD API

### Part 1 Grading

Your grade on Part 1 will be determined by the number of requirements you complete. Part 1 has 10 requirements:

**`GET /api/todos`**

- [ ] Returns a `200` status and an array of all todos

**`GET /api/todos/:id`**

- [ ] Returns a `200` status and the todo with the matching id
- [ ] Returns a `404` status if no todo has that id

**`POST /api/todos`**

- [ ] Returns a `201` status and the newly created todo
- [ ] Returns a `400` status if `task` is missing from the request body

**`PATCH /api/todos/:id`**

- [ ] Returns a `200` status and the updated todo
- [ ] Returns a `404` status if no todo has that id

**`DELETE /api/todos/:id`**

- [ ] Returns a `204` status and no content
- [ ] Returns a `404` status if no todo has that id

**Catch-all**

- [ ] A catch-all handler returns a `404` status for any unmatched route

### Step 1 — Start the Server

> ✅ You will know you've completed this step when you can open the browser, see "Todo Tracker", and the page shows an error (because the API isn't built yet).

Navigate to `server/` and start the server:

```sh
cd server
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser. You should see the Todo Tracker frontend. The list will be empty or show an error until you build the API in Step 2.

**Important:** Do not modify any files inside `frontend/`. It is fully provided and already works — you just need to build the server to match its expected API contract.

### Step 2 — Build the Todo API

> ✅ You will know you've completed this step when the frontend fully works: you can load, add, toggle, and delete todos.

Open `server/index.js`. The middleware, `getId`, and seed data are already provided. Your job is to implement the 5 API endpoints listed below. Write them directly in `index.js` for now — no separate files.

**API Contract**

Every todo has this shape: `{ id: Number, task: String, isDone: Boolean }`

| Method | URL              | Request Body          | Success             | Error                 |
| ------ | ---------------- | --------------------- | ------------------- | --------------------- |
| GET    | `/api/todos`     | —                     | 200, array of todos | —                     |
| GET    | `/api/todos/:id` | —                     | 200, single todo    | 404 if not found      |
| POST   | `/api/todos`     | `{ task: String }`    | 201, new todo       | 400 if `task` missing |
| PATCH  | `/api/todos/:id` | `{ isDone: Boolean }` | 200, updated todo   | 404 if not found      |
| DELETE | `/api/todos/:id` | —                     | 204, no content     | 404 if not found      |
| *      | *                | —                     | —                   | 404                   |

Notice the REST conventions reflected in this contract:
- **Resource-based URLs** — `/api/todos` and `/api/todos/:id` identify the *resource*, not the action (e.g. not `/api/getTodos` or `/api/deleteTodo`)
- **HTTP methods express the action** — `GET` reads, `POST` creates, `PATCH` updates, `DELETE` removes
- **Status codes communicate the result** — `201` for created, `204` for no content, `400` for bad input, `404` for not found

The last endpoint in the API contract is a catch-all handler **after** your five routes that returns a `404` for any unmatched request along with an object with a message:

```json
{ "message": "Error: Not found [url]" };
```

**When done, commit your Part 1 work on the `draft` branch:**

```sh
git add server/index.js
git commit -m "Part 1: monolithic Todo API"
```

---

## Part 2 — MVC Refactor

### Part 2 Grading

Your grade on Part 2 will be determined by the number of requirements you complete. Part 2 has 7 requirements:
- 2 model requirements
- 2 controller requirements
- 2 index.js requirements
- 1 deployment requirement

**Model Requirements**

- [ ] `server/models/todoModel.js` exists with a `todos` array only accessible within the file (not exported)
- [ ] `server/models/todoModel.js` exports methods whose sole responsibility is to manage interactions with the `todos` array

**Controller Requirements**

- [ ] `server/controllers/todoControllers.js` exists and imports `todoModel`
- [ ] `server/controllers/todoControllers.js` exports methods whose sole responsibility is to parse requests, invoke `todoModel` methods, and send a response

**`index.js` Requirements**

- [ ] `server/index.js` imports and uses `todoControllers`
- [ ] `server/index.js` contains only middleware and route registrations (no data or business logic)

**Deployment**

- [ ] Your app is deployed to Render and the link is added to the top of this README

### Step 3 — Create the Model

> ✅ You will know you've completed this step when you can import `todoModel` in the Node REPL and call its methods to get, create, update, and delete todos.

First, make sure you're on the `draft-refactor` branch (created off `draft`):

```sh
git branch

# confirm that you are on the draft branch

git checkout -b draft-refactor
```

Create `server/models/todoModel.js`. This file owns the data — no other file should access the `todos` array directly.

```
server/
└── models/
    └── todoModel.js   ← create this
```

**Requirements:**

- A `todos` array (not exported) with the same seed data as Part 1
- A `getId` function (moved from `index.js`)
- Five exported named functions:

| Function              | Parameters                        | Returns                                 |
| --------------------- | --------------------------------- | --------------------------------------- |
| `list()`              | —                                 | Copy of the todos array                 |
| `find(id)`            | `id` (Number)                     | Copy of the matching todo, or `null`    |
| `create(task)`        | `task` (String)                   | The newly created todo                  |
| `update(id, changes)` | `id` (Number), `changes` (Object) | Updated todo, or `null`                 |
| `destroy(id)`         | `id` (Number)                     | `true` if deleted, `false` if not found |

> Use the spread operator to return copies, not references. Never export the raw `todos` array.

### Step 4 — Create the Controllers

> ✅ You will know you've completed this step when you can import a controller and it has the right signature (takes `req` and `res`).

Create `server/controllers/todoControllers.js`. Each controller function handles one endpoint: it reads from `req`, calls the model, and sends a response.

```
server/
└── controllers/
    └── todoControllers.js   ← create this
```

**Requirements:**

- Import `todoModel` from `../models/todoModel.js`
- Export five named arrow functions (one per endpoint):
  - `listTodos(req, res)`
  - `findTodo(req, res)`
  - `createTodo(req, res)`
  - `updateTodo(req, res)`
  - `deleteTodo(req, res)`
- Each controller: parses `req.params` / `req.body`, calls the correct model method, sends the response (with appropriate status code)
- No data logic in controllers — all data operations go in the model

### Step 5 — Update index.js

> ✅ You will know you've completed this step when `index.js` contains no data or business logic — only imports, middleware, and route registrations.

Refactor `server/index.js` so it:

1. Imports `todoControllers` from `./controllers/todoControllers`
2. Keeps the middleware (`logRoutes`, `express.static`, `express.json`)
3. Registers the 5 routes using the imported controller functions
4. Removes the `todos` array, `getId`, and all inline route logic

```js
app.get('/api/todos', todoControllers.listTodos);
app.get('/api/todos/:id', todoControllers.findTodo);
app.post('/api/todos', todoControllers.createTodo);
app.patch('/api/todos/:id', todoControllers.updateTodo);
app.delete('/api/todos/:id', todoControllers.deleteTodo);
```

**When done, commit your Part 2 work on the `draft-refactor` branch:**

```sh
git add server/models/todoModel.js server/controllers/todoControllers.js server/index.js
git commit -m "Part 2: MVC refactor"
```

---

## Step 6 — Deploy

> ✅ You will know you've completed this step when your app is live at a public URL and fully functional.

Push your code to GitHub and [follow these steps to deploy using Render](https://marcylabschool.gitbook.io/marcy-lab-school-docs/projects/6-deploying-using-render).

Then add the deployed link to the top of this README.

---

## Error Codes

The following error codes are commonly used by APIs:

* Success Responses
  * `200` OK — Standard success (GET, PATCH).
  * `201` Created — Resource was created (POST).
  * `204` No Content — Successful but no response body (DELETE).
* Client Errors
  * `400` Bad Request — Input is invalid (e.g. missing required field).
  * `404` Not Found — Resource doesn't exist (e.g. id not found).
* Server Errors
  * `500` Internal Server Error — Unexpected error on your backend.
