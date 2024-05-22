# Project Name: Laravel and ReactNative Medical Appintment App

# This is the React Native Fromtend android app

## Important Links
Laravel Backend Repository is here: [here](https://github.com/LaminSanneh/medical-appointment-app-Laravel-Backend)

## Project Status: Work In Progress

## Functional Requirement Items in the workings
- Messaging system for doctor to patient and vice-versa
   - Allow doctors to share files in chats with patients and vice versa (Might consider moving to a dedicated documents sharing section)
- Allow organization admin to add doctor through app
- Allow organization admin to enable or disable patient registration
- Allow organization admin to enable or disable doctor registration registration
- Allow organization to require admin acceptance/confirmation after registration or automatically allow login
- Allow patients to give doctor feedback and rating

## Technical Requirement Items in the workings
- Setup detox library testing
- Secure auth token storage on frontend as it is currently stored as plaintext
- Centralize and make better the error handling from bacend api calls

## Highlighted Technical Aspects and Technologies Used
- Used [React Redux Toolkit](https://redux-toolkit.js.org/) along with redux-persist for storing data for offline usage
- Used [react-native-paper](https://callstack.github.io/react-native-paper) library for the ui styling
- Used [react-navigation](https://reactnavigation.org/)
- Used [Typescript](https://www.typescriptlang.org/)
- Used [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) for multi environment variable managemment
- Used [axios](https://axios-http.com/docs/intro) for http calls

# React Native Screens
<img src="readme-images/appointment-schedule-1.png" alt="appointment-schedule-1" width="200" />
<img src="readme-images/appointment-schedule-2.png" alt="appointment-schedule-2" width="200" />
<img src="readme-images/doctor-appointments-confirm.png" alt="doctor-appointments-confirm" width="200" />
<img src="readme-images/doctor-appointments-list.png" alt="doctor-appointments-list" width="200" />
<img src="readme-images/login.png" alt="login" width="200" />
<img src="readme-images/logout.png" alt="logout" width="200" />
<img src="readme-images/patient-appointments-list.png" alt="patient-appointments-list" width="200" />
<img src="readme-images/register.png" alt="register" width="200" />
<img src="readme-images/side-menu.png" alt="side-menu" width="200" />
<img src="readme-images/update-profile.pn" alt="update-profile" width="200" />

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
