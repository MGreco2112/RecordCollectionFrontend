
# The Vinyl Hub Frontend

A React Frontend used for navigating The Vinyl Hub website

  # Documentation

Requirements:

  This app requires [The Vinyl Hub Backend](https://github.com/MGreco2112/record_collection_jpa_pp)
  in order to run. Make sure this is configured and running prior
  to running this App.

Config.js:

  To run this application the apiHostURL field of config.js must
  be set to the location and port of [The Vinyl Hub Backend](https://github.com/MGreco2112/record_collection_jpa_pp). 
  As default it is set to localhost:8080. This must change if that is not the location of the app.

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/MGreco2112/RecordCollectionFrontend
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npx create-react-app theVinylHub
  npm i react-router-dom axios
  npm i --save @fortawesome/fontawesome-svg-core
  npm install --save @fortawesome/free-solid-svg-icons
  npm install --save @fortawesome/react-fontawesome
```

Start the server

```bash
  npm start
```

