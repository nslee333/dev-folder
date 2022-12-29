Basic idea:<br> 
    - MERN stack.<br> 
    - Basic todo app.<br> 
  

[Completed-Tasks]: <br> 
Note: The number assigned to the task is given at conception, and listed by when they were completed, with the top of the list being the oldest, the last being the latest.
    
    1. Initialize a database for task app - collection for tasks.

    6.meta.1 Compare connection with mongoose vs mongoDBs methods.

    6.meta.2: Should I extract mongoose connection code to a seperate file?

    6:  Connect to MongoDB
        1. Done. Define a MDB connection.
        2. Done. Init .env file
            - Put the connection URI in it and gitignore .env.
        3. Done. Save to the database.
        4. Model the database documents.

    2.  Write MongoDB methods.
        3.1. Fetch all tasks.
        3.2. Add a task to the collection.
        3.3. Delete a task from the collection.

    9: On 'Enter' key press input is submitted.

    10: Got basic express http methods implemented.

    Bug #3:'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client' Error after an http get request.

    Bug #2: 'TypeError:(0, controller)1.getDocuments) is not a function.' error after an http get request.

    3. Rewrite GET request conditional?

    11: GET http method finished.

    4.  POST http method finished.

    5.  DELETE http method finished.

    Bug #3: GET request / MongoDB client not working as intended.

    Bug #4: DELETE method is connecting to mongoDB, but not deleting a document.
        - Fixed the filter query in the http request.

    6. Set up express server side.
    7. Write an REST API for the backend.

    Bug #5: Module not found.
        - Fixed by using proper typescript export syntax.

    Bug #6: Access to XMLHttpRequest at 'http://localhost:1300/api/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
        - Fixed with installing cors npm package and using it in my server.ts in the backend.

    Bug #7: Http methods not callable
        - Fixed with wrapping axios methods in an async function.

    Bug #8: AxiosError:
        - Put in correct localhost url inside axios callback. 

    14: Display tasks properly on page.

    15: Post axios request working properly.
        15.1: Modify Axios post method boilerplate.
        15.2: Write a function to call axios method with.
            - Figure out how to handle the newTaskString passed to the axios post method.
    
    16: Implement delete functionality.
        16.1: Styled close button.
        16.2: Wrote delete task function, and modified axios delete to include data with http request.

    2.design: When a task is marked completed - it is deleted from the database?
    3.design.: Use AXIOS for client-side http requests

    8. On first load, it needs to load the active tasks.
        - Under useEffect function?
    9. Implement Axios: GET, POST, DELETE methods.

    17: Styling fixes:
        17.1: Long task needs to stay inside of the LI container.
        17.2: If there is a bunch of tasks, the task window needs to scroll.
           - Also need to style scrollbars.

        17.3: Center task string inside Li.
        17.4: Make the input bar larger, along with text.
        17.5: Delete button background the same as the LI background color.
        17.6: Background gradient?

        17.7: .taskDiv is only implemented on the smallText tasks - need to implement them on all tasks.
        
        17.8: Delete button - center and a little to the right.
        17.9: Delete button - Make X bigger and adjust position.

    19: Implement a maximum task string length at the input.

    Bugs #9 + #10: Intermittant MongoDB connection errors:
    - MongoRuntimeError: Illegal state transition from [closed] => [connected].
    - PoolClosedError [MongoPoolClosedError]: Attempted to check out a connection from closed       connection pool
    - After reading the documentation about MongoClient, I refactored the db.ts MongoClient instance
      - into its own function, which reduced it to one MongoClient, whereas before I had one for every http method.
      - After modifying the code, I tested it and the errors haven't come back.

    18: Refactoring tasks:
        18.1: Refactor index.css styling, group related styling together.
    
    Bug #12 - Input not submitting on enter key press.
        - Ended up being smarter about types and got it working.

    21: Chore: Go through and eliminate any unused imports.
        21.1: Remove all console.logs.
        21.2: Remove all VOID

    20: Go through and remove all `any` types?
        - Backend and frontend.


[Bugs]: 


[Current Tasks]:

