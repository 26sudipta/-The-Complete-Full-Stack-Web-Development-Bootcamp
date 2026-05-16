# Joke API — Documentation

Overview
- Simple Express API serving an in-memory list of jokes.
- Base URL: `http://localhost:3000`
- Data is stored in-memory; changes do not persist across server restarts.

Running the server
- Start the server with:

```bash
nodemon index.js
# or
node index.js
```

Authentication / master key
- Several admin operations require the `masterKey` string defined in the server.
- Current code expects the master key as a path parameter for deleting all jokes:

  `DELETE /deleteAllJokes/:masterKey`

  Example:

  ```bash
  curl -X DELETE 'http://localhost:3000/deleteAllJokes/4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT'
  ```

Endpoints

- **GET /random**
  - Returns one random joke from the current runtime array.
  - Example:
    ```bash
    curl http://localhost:3000/random
    ```

- **GET /jokes/:id**
  - Path parameter: `id` (integer)
  - Returns the joke with the given id or `404` if not found.
  - Example:
    ```bash
    curl http://localhost:3000/jokes/10
    ```

- **GET /jokes/type/:type**
  - Path parameter: `type` (string)
  - Returns an array of jokes with `jokeType` equal to `:type`.
  - Example:
    ```bash
    curl http://localhost:3000/jokes/type/Puns
    ```

- **POST /joker**
  - Adds a new joke. The server uses `bodyParser.urlencoded` so requests should send form data.
  - Required form fields: `jokeText`, `jokeType`.
  - Success: `201` with created object.
  - Example (curl):
    ```bash
    curl -X POST http://localhost:3000/joker \
      -H "Content-Type: application/x-www-form-urlencoded" \
      -d "jokeText=Why%20...&jokeType=Puns"
    ```

- **PUT /jokes/:id**
  - Replace the joke at `id`. Requires both `jokeText` and `jokeType` in the request body.
  - Returns `400` if fields missing, `404` if id not found.

- **PATCH /jokes/:id**
  - Partially update the joke at `id`. Supply any subset of `jokeText` and `jokeType`.

- **DELETE /jokes/:id**
  - Delete a single joke by id. Returns `200` on success or `404` if not found.
  - Example:
    ```bash
    curl -X DELETE http://localhost:3000/jokes/10
    ```

- **DELETE /deleteAllJokes/:masterKey**
  - Deletes all jokes in the runtime array if `:masterKey` matches the server `masterKey`.
  - Example:
    ```bash
    curl -X DELETE http://localhost:3000/deleteAllJokes/4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT
    ```

Notes & Troubleshooting

- Path parameter vs query parameter
  - Current implementation expects the master key as a path parameter. If you send it as a query parameter (for example `?masterkey=...`) the route will not match the expected param and you will get `403` or `404` depending on code.
  - To accept a query parameter instead, change the route to `app.delete('/deleteAllJokes', ...)` and read `req.query.masterkey`.

- Runtime vs source file
  - The `jokes` array shown in `index.js` is the initial data. At runtime the server keeps an in-memory copy. `DELETE` and other mutating operations change only the in-memory array; restarting the server reloads the original hardcoded array.
  - To persist changes between restarts, use one of:
    - Write to a JSON file after each mutation
    - Use a lightweight database (SQLite, lowdb, MongoDB)

- Content type for POST/PUT/PATCH
  - The project currently uses `bodyParser.urlencoded({ extended: true })`. Use `application/x-www-form-urlencoded` for curl and Postman form submissions, or add `app.use(express.json())` to accept JSON bodies and update clients accordingly.

- Case-sensitivity
  - The `/jokes/type/:type` route compares `jokeType` literally. To make it case-insensitive, normalize both sides to lowercase in the handler (e.g., `j.jokeType.toLowerCase() === type.toLowerCase()`).

Example responses

- Success (single joke):

```json
{
  "id": 10,
  "jokeText": "Why did the tomato turn red? Because it saw the salad dressing!",
  "jokeType": "Food"
}
```

- Error (not found):

```json
{ "message": "Joke not found" }
```

If you want, I can:
- Add a `/debug/jokes` endpoint for inspecting the runtime array (temporary)
- Change the delete-all route to accept a query parameter
- Persist mutations to a JSON file so deletes survive restarts
