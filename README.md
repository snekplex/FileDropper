# FileDropper
A ReactJS based SPA(Single Page Application) that allows users to upload files to an ExpressJS server for saving, storage and download.

## Setup
1. Run `git clone https://github.com/snekplex/FileDropper.git` to clone project
2. CD into `FileDropper`
3. Run either `yarn install` or `npm install` to get packages
4. Make sure MongoDB is running as specified in `server/config/config.js`
5. Export/Set the ENV variable of NODE_ENV=production
6. Build the production version of the front-end using `yarn build-front-end` or `npm build-front-end`
7. Run the project using `yarn start` or `npm start`, navigate to (If default configs)<http://localhost:5000> and enjoy the project.

### Side Notes
Configurations for either the front-end or back-end can be found in the `config` folders in either `/server`(back-end) or `/src`(front-end) 
