# travel-log
Travel Log Application with JavaScript... Express is the back-end (server) part if the application &amp; React is the fromt-end (client) part

> Travel Log App for every user

![Screenshot](./travel-log.png)

## Steps:
- [x] Create a Express as backend application
  
  ```
  mkdir server
  cd server
  ```
  
  ```
  npm init -y
  npm i express cors morgan mongoose helmet
  ```

   - [x] Setup Not Found and Error Middlewares
   

- [x] Model DB
  - [x] Setup Mongoose Model(s)
        POST /logs
  - [x] Create Schema for mongodb atlas
  - [x] Store data like Title, Rating, description, comment, image URL and a Visit Date for Place
  - [x] Logs for the travel data 

- [x] GET / logs

    - [x] List all log entries

- [x] Setup Client
  
  ```
  npx create-react-app client
  ```
  - [x] Clean up React up
  - [x] Set up cors origin to fetch data
  - [x] Create Form to add a new entry
  
- [x] Setup Map SDK on client
- [x] List all log entries on map


- [x] Add Entries

  - [x] Add entries through map
  - [x] Store entries to database
  - [x] Update the map after each entries


