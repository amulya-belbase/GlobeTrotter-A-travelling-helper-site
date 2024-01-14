# PROJECT SETUP => Ensure Node.js version 18 or higher is installed on your system.

1) Install PostgreSQL and pgAdmin.
2) Clone this repo.
3) Run the 'npm install' command in your terminal (in the project's root directory) to install all the dependencies.
4) In pgAdmin, create a database and name it as desired.
5) Open the .env file in the project folder and configure the database settings: Set "DB_NAME" to 'your_database_name'.
6) Run the database migration using the 'npm run migrate' command in the terminal (in the project's root directory).
7) Assuming you haven't changed the server port (PORT being 8000), access the project by using the "localhost:8000" URL in your browser.

