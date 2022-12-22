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

    6.meta.1 [Done]. Compare connection with mongoose vs mongoDBs methods.

    6.meta.2: [Done]. Should I extract mongoose connection code to a seperate file?

    6: [Done]: Connect to MongoDB
        1. Done. Define a MDB connection.
        2. Done. Init .env file
            - Put the connection URI in it and gitignore .env.
        3. Done. Save to the database.
        4. Model the database documents.

    3. [Done]: Write MongoDB methods.
        3.1. Fetch all tasks.
        3.2. Add a task to the collection.
        3.3. Delete a task from the collection.

    9: [Done] On 'Enter' key press input is submitted.
    10: [Done]: Got basic express http methods implemented.
    [Bug #3]: [Done] Fixed: 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client' Error after an http get request.

[bugs]:
Bug #2: 'TypeError:(0, controller)1.getDocuments) is not a function.' error after an http get request.




[Tasks]:
    2. Set up express server side.
    9. On 'Enter' key press input is submitted.
    4. On first load, it needs to load the active tasks.
        - Under useEffect function?
    7. Write an REST API for the backend.
    8. Rewrite GET request conditional?





[CT]: 









