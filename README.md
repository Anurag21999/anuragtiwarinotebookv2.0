# Notebook
Notebook is  like a personal diary which uses user authentication to login and write into the database or the notebook 

## Build Status
Completed
http://notebokv1a.herokuapp.com/

## Framework used
Express as a node.js server framework (v4.17.1)

## Database used
Database  used is sqlite3 browser which a very simple database to work with on a project and pretty easy to launch via heroku.
The sqlite version  used  is (v4.0.9)


## Dependencies 
    "express-session": "^1.16.2",
    Create a session middleware,session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
    
    "hbs": "^4.0.4",
    Handlebars provides the power necessary to let you build semantic templates effectively with no frustration.

    Handlebars is largely compatible with Mustache templates. In most cases it is possible to swap out Mustache with Handlebars and      continue using your current templates. 
    
    "passport": "^0.4.0",
    Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests. When writing modules, encapsulation is a virtue, so Passport delegates all other functionality to the application. This separation of concerns keeps code clean and maintainable, and makes Passport extremely easy to integrate into an application.
    
    
    "passport-local": "^1.0.0",
    
    "sequelize": "^5.11.0",
    Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
