# Health App <a href="https://github.com/bryanlancy/HealthApp/wiki" style="font-size: 18px">Explore the docs »</a>

1. <a href="#what-is-health-app">About</a>
1. <a href="#features">Features</a>
1. <a href="#technologies">Technologies</a>
1. <a href="#setup">Setup</a>


## What is Health App<sup><a href="#sup1">1</a></sup>

<div>
    <img src="images/heart.png" height=150 align="right">
    <p>
        Health App<sup><a href="#sup1">1</a></sup> aims to provide an easy way to streamline a fine control on all aspects of your health. Combining the control of various metrics such as dieting habits with workout routines, users can make informed decisions about dieting that will compliment their exercise habits, and vice versa.
    </p>
</div>
<div>
    <p>
        Health App<sup><a href="#sup1">1</a></sup> is designed with <a href="https://wikipedia.org/wiki/Free_and_open-source_software">FOSS</a> in mind, with an added focus on staying free of external dependencies. So with little and trivial setup a user can have an offline and locally hosted version of the application.
    </p>
</div>

## Features

### Add custom exercises
In addition to a full assortment of pre-created exercises, users can add new ones for easy customization.

<img src="images/new-exercise.png" height=200>

### Easily Add Workouts
If you're exercising on a whim you can add a quickly add a single wokrout without starting a full routine.

<img src="images/new-workout.png" width=350>

### Track Your Stats
Interactive charts make it simple to visualize your progress over different lengths of time.

<img src="images/workout-stats.png" height=200 >

## Technologies
<p>Frontend</p>
<div>
    <img alt="React" src="https://img.shields.io/badge/React%20-%2320232a.svg?logo=react&logoColor=%2361DAFB">
    <img alt="Redux" src="https://img.shields.io/badge/Redux-764ABC?logo=redux">
    <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript%20-%23F7DF1E.svg?logo=javascript&logoColor=black">
</div>
<div>
    <img alt="HTML" src="https://img.shields.io/badge/HTML%20-%23E34F26.svg?logo=html5&logoColor=white">
    <img alt="SASS" src="https://img.shields.io/badge/Sass%20-hotpink.svg?logo=SASS&logoColor=white">
    <img alt="CSS3" src="https://img.shields.io/badge/CSS3%20-%231572B6.svg?logo=css3&logoColor=white">
</div>
<p>Backend</p>
<div>
    <img alt="Express.js" src="https://img.shields.io/badge/Express.js%20-%23404d59.svg?logo=express&logoColor=white">
    <img alt="Sequelize" src ="https://img.shields.io/badge/Sequelize-52B0E7.svg?logo=sequelize&logoColor=white">
    <img alt="PostgreSQL" src ="https://img.shields.io/badge/PostgreSQL-%23316192.svg?logo=postgresql&logoColor=white">
</div>

## Setup

 <em style="font-size: 12px;">
    The following setup assumes that you have PostgreSQL installed and have permissions to add a new user. Documentation can be found <a href="https://www.postgresql.org/">here</a>.
</em>

<br>

- Clone repository & install Node dependencies
    1. Clone the project with:<br>
    `git clone https://github.com/bryanlancy/HealthApp.git`

    1. In the root project directory run the command:<br>
    `npm run install`

- Setup the backend environment
    1. Make a copy of the `.env.example` file found in the `backend` folder and rename it to `.env`.
    1. In the `.env` file, replace all values surrounded in `< >` with the corresponding information. Unless you have already done so, you can generate these values now.

        - `DB_USERNAME` - PostgreSQL user name
        - `DB_PASSWORD` - PostgreSQL user password
        - `DB_DATABASE` - PostgreSQL database name
            - database will be created in a later step.
        - `JWT_SECRET` - JSON Web Token Secret
            - should be unique and secure.

        <br>

        :warning: *The `.env.example` is tracked by git version control, **do not** save any sensitive information in this file.*
    1. Create PostgreSQL user.
        - In your terminal run, `psql`, to start PostgreSQL's interactive terminal.
        - `CREATE USER <DB_USERNAME> WITH PASSWORD '<DB_PASSWORD>' CREATEDB;`. Remember to replace the values in `< >` with the values we created in the previous step.
        <img src="images/psql-user-create.png">
- Create & seed the database
    1. In your terminal, navigate to the `backend` folder found in the main project directory.
    1. Then run, `npm run db-setup`. This will run a series of commands that should automatically set up your database. If any errors occur, you can run the commands individually, in this order.
        1. `npm run db-create`
        1. `npm run db-migrate`
        1. `npm run db-seed`
- Start the application
    1. In your terminal, navigate to the main project folder.
    1. Then run `npm start`. This will start the backend and frontend server. <br>
        - Each server can be started manually by navigating to the respective folder, `frontend` and `backend`, and running the command `npm start`.
    1. In your browser navigate to <a href="http://localhost:3000">localhost:3000</a>

<br><sup id="sup1">1</sup> *Pending better name* :sweat: <br>


