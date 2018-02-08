# React Project Setup Instructions
###### as compiled by Luke Bertram, Feb 2018

Instructions for setting up a new React project according to the instructions in the [Epicodus React Curriculum](https://www.learnhowtoprogram.com/react/react-fundamentals) as of February 7th, 2018. It assumes you already have [Node Package Manager (npm)](https://www.npmjs.com/) installed on your machine.

This guide contains a **'Quick Setup'** section intended to take you from an empty new project to a functional React project as quickly as possible. Complete versions of configuration files are presented once, each in its final form, for easy copying and pasting.

Eventually this section will be followed by a **'Step-by-Step'** guide as well, which breaks down the setup process into the same functional chunks as the Epicodus curriculum -- but without the accompanying explanation. In this section, the same configuration files will be presented multiple times with relevant changes being made as new functionality is added to the project.

## Quick Setup

### Initialize NPM in New project
Run `npm init` in new project directory

### Add `.gitignore` to Project
`touch .gitignore` in the project's root directory and include the following entries:
```
.DS_STORE
node_modules
build
```

### Install Global Modules
Install necessary global packages from the command line
```
npm i -g webpack@3.4.0 webpack-dev-server@2.5.0 eslint eslint-plugin-react
```

### Add Scripts and Dependencies to Package.JSON File
```
{
  "name": "project-name-here",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server",
    "lint": "eslint src/** src/**/**; exit 0",
    "lint-fix": "eslint src/** src/**/** --fix; exit 0"
  },
  "author": "\"\"",
  "license": "ISC",
  "dependencies": {
    "prop-types": "^15.6.0",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "react-router-dom": "^4.0.0",
    "styled-jsx": "^2.2.4"
  },
  "devDependencies": {
    "babel-core": "^6.24.1",
    "babel-loader": "^7.0.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "eslint": "^4.17.0",
    "eslint-loader": "^1.9.0",
    "eslint-plugin-react": "^7.6.1",
    "file-loader": "^1.1.6",
    "html-webpack-plugin": "^2.29.0",
    "react-hot-loader": "^3.0.0-beta.7",
    "url-loader": "^0.6.2",
    "webpack": "^3.8.1",
    "webpack-dev-server": "^2.5.0"
  }
}
```

### Install Dependencies
Run `npm install` and fix yourself a drink.

### Add Webpack Configuration File
`touch webpack.config.js` in root directory and add the following contents:
```
const webpack = require('webpack');
const { resolve } = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');


module.exports = {

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    resolve(__dirname, "src") + "/index.jsx"
  ],

  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: '#source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jp(e*)g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          }
        }
      },
      {
        test: /\.jsx?$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          configFile: "./.eslintrc.json"
        }
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ["es2015", {"modules": false}],
            "react"
          ],
          plugins: [
            "react-hot-loader/babel",
            "styled-jsx/babel"
          ]
        }
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template:'template.ejs',
      appMountId: 'react-app-root',
      title: 'Your Title Here',
      filename: resolve(__dirname, "build", "index.html"),
    }),
  ]
};
```

### Add template.ejs file to project root dir
`touch template.ejs`
and add embedded javascript and HTML structure to template.ejs:
```
<!DOCTYPE html>
  <head>
    <meta charset="utf-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <% if (htmlWebpackPlugin.options.appMountId) { %>
      <div id="<%= htmlWebpackPlugin.options.appMountId%>"></div>
    <% } %>
  </body>
</html>
```

### Add Rules to Linter Configuration File
Initialize eslint with `eslint --init` and add the following rules to the eslintrc.json file
```
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-key": 2,
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-no-undef": 2,
    "react/no-multi-comp": 2,
    "react/jsx-indent-props": [
      "error",
      2
    ],
    "react/jsx-pascal-case": 2,
    "react/prop-types": 2,
    "react/jsx-indent": [
      "error",
      2
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
}

```

### Add project file structure
`mkdir src` and `mkdir src/components` followed by `touch src/index.jsx src/components/App.jsx src/components/Error404.jsx`

Fill in `src/index.jsx` like this:
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <HashRouter>
        <Component/>
      </HashRouter>
    </AppContainer>,
    document.getElementById('react-app-root')
  );
};

render(App);

/*eslint-disable */
if (module.hot) {
  module.hot.accept('./components/App', () => render(App));
}
/*eslint-enable */
```

Add the following boilerplate business to your `src/components/App.jsx` file:
```
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';

function App(){
  return (
    <Switch>
      <Route exact path='/' component={Default} />
      <Route component={Error404} />
    </Switch>
  );
}

//delete the following component definition before use
function Default(){
  return(
    <h1>Default Component/App/Router Works!</h1>
  );
}

export default App;

```
Note: *the linter does not like it when you define more than one component in a file, so the above code will cause a linter error. This can be remedied by removing the offending Default component definition from App.jsx, importing a component of your own and setting it to your project's root route.*

And finally, add some innards to your `src/components/Error404.jsx` file:
```
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Error404(props){
  return (
    <div className='warning'>
      <h2>The page {props.location.pathname} does not exist!</h2>
      <h3>Would you like to return <Link to ="/">home</Link> instead?</h3>
      <style jsx>{`
        .warning{
          background-color: red;
          color: white;
          font-family: Helvetica, Arial, sans-serif;
          padding: 5px 10px;
        }
      `}</style>
    </div>
  );
}

Error404.propTypes = {
  location: PropTypes.object
};

export default Error404;

```

### You're all done!

---------------------------

## Step-by-Step Setup (NOT YET COMPLETE)

### Initialize NPM in New Project

`$ npm init`

### NPM Installations
1. React and React DOM (Note: Installing a more recent version of React will cause problems with the router installation below)
```
$ npm i react@15.5.4 react-dom@15.5.4 --save
```
2. Webpack (also install globally if not already present)
```
($ npm i webpack@3.4.0 -g) *if no global installation present*
$ npm i webpack@3.4.0 --save-dev
```
3. Babel for JSX transpiling
```
$ npm i babel-core@6.24.1 babel-loader@7.0.0 babel-preset-es2015@6.24.1 babel-preset-react@6.24.1
```
4. Create Webpack configuration file `webpack.config.js` in project root dir
```
const webpack = require('webpack');
const {resolve} = require('path');
module.exports = {
  entry: [
    resolve(__dirname, "src") + "/index.jsx"
  ],

  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'build'),
  },

  resolve: {
    extensions: [ '.js', '.jsx' ]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "es2015",
            "react"
          ]
        }
      }
    ]
  }
};
```
5. Dev Server with Hot Module Support
```
$ npm i webpack-dev-server@2.5.0 -g (if not already globally installed)
$ npm i webpack-dev-server@2.5.0 --save-dev
$ npm i react-hot-loader@3.0.0-beta.7 --save-dev
```
6. React and React DOM
```
$ npm i react@15.5.4 react-dom@15.5.4 --save
```
