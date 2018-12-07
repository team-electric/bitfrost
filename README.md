Bitfrost
=================

A ridesharing app.

Table of contents
=================

<!--ts-->
   * [Bitfrost](#bitfrost)
   * [Table of contents](#table-of-contents)
   * [Project setup](#Project-setup)
   * [Deployment](#Deployment)
   * [Development Process](#Development-Process)
      * [Full slices](#Full-slices)
      * [Notes](#Notes)
      * [VS Code folder icons](#VS-Code-folder-icons)
<!--te-->

## Project setup

* Run `npm install` in `/` and `/client` to get going.
* Run `npm run test:watch` in both of these places to get tests running (in watch mode too)

## Deployment

More details coming soon. The following is a prior process with Heroku:

1. Assumptions: you have heroku account, have downloaded nodejs tools, and have ran `heroku login` if you need to (should only be once)
2. Deploy:
    1. delete public folder in server
    2. `git pull heroku master` in server
    3. commit and push your changes in app
    4. `npm run build:server` in app
    5. commit and push your changes in server
    6. `git push heroku master`
    7. if you want to run DB seed operations on the heroku site, change `.env` configs temporarily to the heroku DB settings in the server locally, and then run `npm run db-load-all` or whichever db script that you want to run
    8. `heroku open`
    9. Profit!

## Development Process

##### Full slices

* back end:
  * a folder in /server/resources with `model` and `routes` files
  * edit /server/resources/index.js to include `<resources name>`
  * `OPTIONAL:` a file in /server/testing/fixtures with useful data/functions for writing tests
  * `OPTIONAL:` a file in /server/testing/scripts with useful data/functions for initial DB data
  * `OPTIONAL:` a file in /server/testing/scripts with useful data/functions for initial DB data
  * `OPTIONAL:` if your data requires an external source, other than the database, write the libraries and integrations in /server/lib and /server/services
* front end:
  * a file at /client/src/services/`<resource name>`
  * a folder in /client/src/store/resources with `actions`, `reducers`, and `selectors` files
  * a folder at /client/src/components/resources/`<resource name>` with any necessary view components inside
  * update `ROUTES` in /client/routes/index.js with any new routes
  * `OPTIONAL:` a file in /client/src/testing/fixtures with useful data/functions for writing tests

##### Notes

* any tests are placed in __tests__ for the folder of the file that you are testing (this keeps directories clean)
* react-router constants lie within `App.jsx`
* functional container components lie in `/client/src/components/lib`
* reusable dummy components lie in `/client/src/components/styles` (this are mostly mini UI components)
* components that form the base of your content lie in `/client/src/components/styles` (some are static, some have state or are connected to the store)
* using styled-components for CSS in JS
  * add `vscode-styled-components` in VS Code to get syntax highlighting
  * https://alligator.io/react/styled-components/
  * https://www.styled-components.com/docs/basics#getting-started
* using react-helmet to manage page-level stuff (in the head element) within App.jsx instead of importing at index.html
  * https://github.com/nfl/react-helmet
* using `.jsx` instead of `.js`, which is a very minor change but makes things more explicit (had to change only the test property in webpack for it to work, plus imports require the explicit `.jsx` if from a file, which kind of like)
* when semantically useful, using the ES6 feature of implicitly importing index.js from any folder that is itself imported. In other words, `import App from 'components/App'` is equivalent to `import App from 'components/App/index.js'`
  * https://alligator.io/react/index-js-public-interfaces/

##### VS Code folder icons

Optionally, you can install `Material Icon Theme` and add the following to your VS Code settings to get colorful icons for just about everything:

```
    "material-icon-theme.folders.theme": "specific",
    "material-icon-theme.activeIconPack": "react_redux",
    "material-icon-theme.files.associations": {
        "selectors.js": "Redux-store",
        "model.js": "Database"
    },
    "material-icon-theme.folders.associations": {
        "selectors": "Redux-store",
        "state": "Resource",
        "fixtures": "Helper",
        "presentational": "Views"
    },
```
