# SiegelServer

![docker badge](https://img.shields.io/docker/cloud/build/paulmethfessel/siegelserver)

### Setup server and webapp for development
This will only server the seals and not host the static files
- Run `npm i`
- Copy the `.env.example` file to `.env` and set `USE_DEV=true`
- Run `npm run start:dev`

### Setup server with static build webapp
Will build the static files from a given local path and serve it
- Run `npm i`
- Run (in Git Bash on Windows) `./dev_build_static.sh ../path/to/SiegelWebapp` (Run this everytime there are changes in the Webapp)
- Run `npm run start:dev` to run the Server on `localhost:8080`

### Deploy
Note: `siegel.json` and `staticBrowse` is pre-generated here: https://drive.google.com/file/d/1UGoiUCIfwOlD402CmQxyx3yE_wRZiRvJ/view?usp=sharing

- Run `npm i`
- Run `download_static.sh` (Downloads the `release` branch from the webapp and builds it into `static/`)
- Create a `asset/` folder and add `heightmap`, `stl` and `original` folders with respective data
- Create a `asset/siegel.json` by running `python convertLido2Json.py lido_folder asset/siegel.json` on a folder with the lido `.xml` files
- Create a folder `staticBrowse` and add the `thumbnails/` and `browseSealCoordinates.csv`
- Build the server with `npm run build` and start with `npm start`
