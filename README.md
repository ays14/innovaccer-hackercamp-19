
# Innovaccer HackerCamp '19

## Assignment for SDE - Intern (Applications)

- **NodeJS** using Express framework with **MongoDB** as database.
- Click for [Problem Statement](https://www.innovaccer.com/media/hackercamp/SDE-Intern-(Applications).pdf).
- Click here for [API Docs]( https://innovaccer-hc-19.000webhostapp.com/)

## Installation

1. Clone the repository using `git clone` and then change the directory to root of the project
```bash
git clone https://github.com/ays14/innovaccer-hackercamp-19.git
cd innovaccer-hackercamp-19
```


2. Create `.env` file as per the sample `EXAMPLE.env` file in the root of your project.

*Lines beginning with '#' are comments and are not required in `.env`
 By default, the working environment, 'env' is set equal to 'development'*


 3. If you are working behind a **Proxy Server** then uncomment all the proxy blocks in the code and configure proxy configuration in `.env`.


 4. Use `npm` or `yarn` to install dependencies for the project
```bash
yarn
```
OR
```bash
npm install
```


 5. Make sure, **MongoDB** is running at your configured `db_url` in `.env` file.


 6. Run the program either by `npm` or `yarn` using
```bash
yarn start
```
OR
```bash
npm start
```


The **console** logs the following if the app is running properly
```bash
[Database] 	Connected to database at: mongodb://localhost:27017
```

## Project Folder Structure

> **Note**: The folder tree does not include sub-directories for common/generated folders. For example - `node_modules`.

 - Sub-directories of the folders marked with **' * '** are not shown for clarity.
 - Folders are typed in **bold**

```bash
─── innovaccer-hackercamp-19
    ├── app.js*
    ├── bin
    │   └── www
    ├── config.js
    ├── docs
    │   ├── api_data.js
    │   ├── api_data.json
    │   ├── api_project.js
    │   ├── api_project.json
    │   ├── css*
    │   ├── fonts*
    │   ├── img*
    │   ├── index.html
    │   ├── locales*
    │   ├── main.js
    │   ├── utils*
    │   └── vendor*
    ├── EXAMPLE.env
    ├── .env
    ├── .git*
    ├── .gitignore
    ├── models
    │   └── Conditions.js
    ├── node_modules*
    ├── package.json
    ├── public*
    ├── README.md
    ├── routes
    │   └── apiRoutes.js
    ├── services
    │   ├── index.js
    │   └── scrapper
    │       └── index.js
    └── views*
    ├── yarn-error.log
    └── yarn.lock
```

## APIs

The project has 4 endpoints namely -
 1.  Symptoms
 2. Diagnosis
 3. ConditionInfo
 4. MedicationInfo

> It is mandatory for **MedicationInfo**, to be called after **ConditionInfo** has been called with same **query**.

The documentation regarding all of the four above listed APIs can be found at [API Docs]( https://innovaccer-hc-19.000webhostapp.com/) or in the [`docs/index.html`](.../docs/index.html) where **docs** is a folder in the project.
