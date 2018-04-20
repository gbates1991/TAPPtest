# Highlights

* React Native
* TypeScript
* mobx-state-tree
* mobx
* react-navigation
* service/model/process architecture
* ui components are grouped by domain
* wrap core RN components - Text, View, Button and provide presets
* storybook
* jest
* spread-based styling
* gluegun


# Requirements

* `node@8.7+`
* `yarn@1.2.1+`
* `react-native@2.0.1+`


# Using Storybook

1. Start the server with `yarn storybook`
2. open `src/main.tsx` and switch set `SHOW_STORYBOOK = true`

Don't forget to set it back before committing.


# Directories

#### `/` (root)

Contains the stack configuration and build tool configuration. Nothing specific to the app should live here.  It's mostly stuff related to building the app and tooling.

The `index.js` file is the entry point to the app.

#### `/android` and `/ios`

The React Native and any custom ios & android-specific code.

#### `/src`

This is the React Native source code for the app.

#### `/src/app`

