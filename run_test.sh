#!/bin/bash

# jenv

# npx react-native doctor

# rm -rf node_modules/.cache/babel-loader/*
npm run "android:clean"
# REACT_APP_IS_DETOX_TEST_2=true npm run "e2e:build-android-debug"

# npm run "android:clean"

# /Users/laminsanneh/Library/Android/sdk/emulator/emulator -avd Pixel_2_API_30 # Run emulator

# /Users/laminsanneh/Library/Android/sdk/emulator/emulator -avd Pixel_2_API_30 -list-avds # List devices

npx react-native start  --reset-cache
# npm run "e2e:test-android-debug"

npx react-native run-android
