# React Project Setup Instructions

## Quick Setup

### Initialize NPM in New project
Run `npm init` in new project directory

### Install All Modules
1. Install necessary global packages
```
$ npm i -g webpack@3.4.0 webpack-dev-server@2.5.0 eslint eslint-plugin-react
```
2. Install dependencies
```
$ npm i react@15.5.4 react-dom@15.5.4 prop-types@15.6.0 react-router-dom@4.0.0 --save
```
3. Install dev dependencies
```
$ npm i --save-dev webpack@3.8.1 webpack-dev-server@2.5.0 babel-core@6.24.1
babel-loader@7.0.0 babel-preset-env@1.6.1 babel-preset-es2015@6.24.1
babel-preset-react@6.24.1 html-webpack-plugin@2.29.0
react-hot-loader@3.0.0-beta.7 eslint@4.17.0 eslint-loader@1.9.0
eslint-plugin-react@7.6.1 file-loader@1.1.6 url-loader@0.6.2
```

### Add Webpack Configuration File
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
            "react-hot-loader/babel"
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
`$ touch template.ejs`
Add embedded javascript and HTML structure to `template.ejs`:
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

### Add Scripts to Package.JSON File
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
    "react-router-dom": "^4.0.0"
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

### Add Rules to Linter Configuration File
Initialize eslint with `$ eslint --init` and add the following rules to the eslintrc.json file
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

## Step-by-Step Setup

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
