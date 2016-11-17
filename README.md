# to-do-webapp

 REST API written in node.js, express, mongoose & mongodb for a simple to-do app that uses passport.js authentication. 
 The user gets an automated e-mail 2 minutes before the due task where he can snooze or delete the item.

* Make sure you've node & npm installed. Using ```node/npm --version```.
* Run a monogo instance by typing ```mongod``` in the console
* Run ```npm install``` in the console
* Run ```node app``` in the console and your server will start listening at htttp://localhost:3000/

### API Endpoints

- User Signup
  - POST http://localhost:3000/signup
  - Params: email , pasword
  - Registers the user by adding the email & a hash of the password in the user collection.
   
- User Login
  - POST http://localhost:3000/login
  - Params: email , pasword
  - Matches the hash of the password in query with the hash in DB & returns user details on success.
     
- Get all tasks
  - POST http://localhost:3000/todo/all
  - Params: userid
  - Returns all todo items associated with the email provided in the query.
  
- Add a task
  - POST http://localhost:3000/todo/add/
  - Params: title, userid, date, location
  - Adds the given tasks to the DB against the userid provided
    - It also sets the CRONJOB to send a mail 2 minutes before the due time.
    
- Delete a task
  - GET http://localhost:3000/todo/delete/(id-of-the-task)
  - Adds 24 hours to the to the current due date.
    - Sets the item.active flag to 0.
    - This route is called from the email sent to the user.
    
- Snooze a task
  - GET http://localhost:3000/todo/snooze/(id-of-the-task)
  - Adds 24 hours to the to the current due date.
    - It also sets the CRONJOB to send a mail 2 minutes before the new due time.
    - This route is called from the email sent to the user.
