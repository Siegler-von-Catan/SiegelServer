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
