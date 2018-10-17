
# [Innovaccer HackerCamp '19](https://github.com/ays14/innovaccer-hackercamp-19)

## Assignment for SDE - Intern (Applications)

- **NodeJS** using Express framework with **MongoDB** as database.
- [Innovaccer HackerCamp Homepage](https://www.innovaccer.com/hackercamp)
- The [Problem Statement](https://www.innovaccer.com/media/hackercamp/SDE-Intern-(Applications).pdf) for HackerCamp '19.
- [API Docs]( https://innovaccer-hc-19.000webhostapp.com/) for all the [APIs](#apis).
- Project [Homepage](https://github.com/ays14/innovaccer-hackercamp-19)

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

*Which blocks in code are to be uncommented?*
This is answered in [Proxy Setup](#proxy-setup)

 4. Use `npm` or `yarn` to install dependencies for the project
```bash
yarn
```
OR
```bash
npm install
```


 5. Make sure, **MongoDB** is running at your configured `db_url` in `.env` file. If not installed, then install from [here](https://docs.mongodb.com/manual/installation/)


 6. Run the program either by `npm` or `yarn` using
```bash
yarn start
```
OR
```bash
npm start
```
> `yarn startDev` or `npm startDev` script is for starting with `nodemon`.


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

The project has 4 endpoints mounted at `{server_ip}/` namely -
 1. Symptoms
 2. Diagnosis
 3. ConditionInfo
 4. MedicationInfo

> **Note:** The project is completed while working behind a proxy server. There may be some proxy configuration in [API Docs]( https://innovaccer-hc-19.000webhostapp.com/), which can be simply ignored for non-proxy server environment.
> It is mandatory for **MedicationInfo**, to be called after **ConditionInfo** has been called with same **query**.

---
Because sometimes `NightmareJS` instance doesn't destroy completely on slow web-servers, which it is trying to scrap. A request timeout may happen without launching Nighmare instance. This issue is being addressed by NighmareJS developers.

By default, NightmareJS instance's `show property` is set to `true`. This asks NightmareJS to load a GUI instance of the browser. It can be set to `false` in [services/scrapper/index.js](https://github.com/ays14/innovaccer-hackercamp-19/blob/master/services/scrapper/index.js) -> Line: 22

In the case, when either of the 'ConditionInfo' or 'MedicationInfo' show request timeout,
### **Please restart the server**
and execute the same query then it will work fine.

---

The documentation regarding all of the four above listed APIs can be found at [API Docs]( https://innovaccer-hc-19.000webhostapp.com/) or in the [`docs/index.html`](https://github.com/ays14/innovaccer-hackercamp-19/blob/master/docs/index.html) where **docs** is a folder in the project.

## Proxy setup

The code blocks to uncomment are commented with the line
**`--> Uncomment for Proxy Setup <--`**

The line numbers for files are listed below
- [config.js](https://github.com/ays14/innovaccer-hackercamp-19/blob/master/config.js) -> Line: 10-15, 22-31
- [services/index.js](https://github.com/ays14/innovaccer-hackercamp-19/blob/master/services/index.js) -> Line: 9-17, 42-44
- [services/scrapper/index.js](https://github.com/ays14/innovaccer-hackercamp-19/blob/master/services/scrapper/index.js) -> Line: 7-9, 12-19, 34-36, 69-71. *Also in the same file comment the section -> Line: 20-24*

- [routes/apiRoutes.js](https://github.com/ays14/innovaccer-hackercamp-19/blob/master/routes/apiRoutes.js) -> Line: 14-22, 72-74, 172-174
