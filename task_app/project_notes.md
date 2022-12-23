Basic idea:
    - MERN stack.
    - Basic todo app.
        - Two sections: Todo and completed tasks.
        - Daily.

[Design][Bugs]:
1. Authentication?
    - Login with google?
2. When a task is marked completed - it is deleted from the database?
3. Use AXIOS for client-side http requests

[Completed-Tasks]:
    1. Initialize a database for task app - collection for tasks.

    6.meta.1 Compare connection with mongoose vs mongoDBs methods.

    6.meta.2: Should I extract mongoose connection code to a seperate file?

    6:  Connect to MongoDB
        1. Done. Define a MDB connection.
        2. Done. Init .env file
            - Put the connection URI in it and gitignore .env.
        3. Done. Save to the database.
        4. Model the database documents.

    3.  Write MongoDB methods.
        3.1. Fetch all tasks.
        3.2. Add a task to the collection.
        3.3. Delete a task from the collection.

    9: On 'Enter' key press input is submitted.

    10: Got basic express http methods implemented.

    Bug #3:'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client' Error after an http get request.

    Bug #2: 'TypeError:(0, controller)1.getDocuments) is not a function.' error after an http get request.

    8. Rewrite GET request conditional?

    11: GET http method finished.

    12. POST http method finished.

    13. DELETE http method finished.

    Bug #3: GET request / MongoDB client not working as intended.

    Bug #4: DELETE method is connecting to mongoDB, but not deleting a document.
        - Fixed the filter query in the http request.

    2. Set up express server side.
    7. Write an REST API for the backend.

    Bug #5: Module not found.
        - Fixed by using proper typescript export syntax.

    Bug #6: Access to XMLHttpRequest at 'http://localhost:1300/api/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
        - Fixed with installing cors npm package and using it in my server.ts in the backend.

    Bug #7: Http methods not callable
        - Fixed with wrapping axios methods in an async function.

    Bug #8: AxiosError:
        - Put in correct localhost url inside axios callback. 



[bugs]: #9








[Tasks]:
    4. On first load, it needs to load the active tasks.
        - Under useEffect function?
    5. Implement Axios: GET, POST, DELETE methods.
    6. Go through and remove all `any` types?





[CT]: List tasks in task window.









