# Project Title

This is a Node.js project that uses Azure SQL Server for database operations. This repository will be the api server to my front end personal portfolio project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- Azure SQL Server

### Installing 

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository
2. Install dependencies using `npm install`
3. Create a `.env` file in the root directory of your project. Add environment-specific variables on new lines in the form of `NAME=VALUE`. For example:

```env
AZURE_SQL_SERVER=your_server
AZURE_SQL_DATABASE=your_database
AZURE_SQL_PORT=your_port
AZURE_SQL_AUTHENTICATIONTYPE=your_auth_type
```


### Built With 

A list of technologies used in this project:

- Node.js - The web framework used
- Azure SQL Server - Used for database operations
- Express
- Prisma 


### Prisma Commands 

Initialize prisma with `npm prisma init`. This command creates a new prisma directory in your project with the files: 
- schema.prisma: Specifies your database connection and contains the database schema
- .env: Defines environment variables (used for the database connection)

Generate Prisma Client based on your database schema with `npx prisma generate`. 

Run Prisma Migrations after making changes to prisma schema with `npx prisma migrate dev --name feature-name`

Start the application with `node app.js`