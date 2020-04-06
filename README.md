# Trending Terms
Trending Terms is an application to abstract google trends API. This repository contains two projects:
- A backoffice written in node that interacts with the google API, abstracts it and provides a proper API for the client consume. 
- A react client that allows an user to search for items (by name and geo localizatio) and see the results on a plot.

## Installation
To node server start listening at port 5000 go to the project's root and type:

```bash
cd bo/
npm install
node src/server.js
```

To start the react application (at port 3000) go back to project's root folder and type:

```bash
cd client/
npm install
npm start
```

And you are ready to go
