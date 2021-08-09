# React-Native

### Functionality

React Native is a JavaScript framework to create real native applications for iOS and Android, based on the React JavaScript library for creating visual components, changing their purpose so that, instead of being executed in a browser, run directly on the native mobile platforms, in this case iOS and Andorid. That is, instead of developing a hybrid or HTML5 web application, what you end up with is a real native application, indistinguishable from what you could develop with your Objective-C or Java code.

### Requirements

-Android Studio
-Android's Emulator
-Visual Studio Code
-Node JS (Metro)
-JDK (Java)

### Quick start
First we need to clone this repo by using the following command inside of our desired folder:

git clone origin https://github.com/JesusALO/react-native.git

Then we make sure all the files were cloned correctly to our local repository and enter the following command:

-npm install 

This will install all of the dependecies and modules needed by the application to start. To initialize our android application we simply go to our cmd prompt and enter the following command:

-npm run android

## Technologies

React native application, this application works with a Django API and a MongoDB API, the Django rest API manages the user sessions and information and the MongoDB API stores, manages and edits a set of badges that display a structure of information.

## Versions

- Techology	Version
- React	17.0.1
- React native	0.64.2
- Django	3.2.4
- Flask	2.0.1
- MongoDB	3.11.4
- JDK 14.0.2.0
- Visual Studio Code 1.59.0


#Modules Versions

The react native modules used to develop this application and it's versions can be found in package.json
| Modules	 | Version |
| ------------- | ------------- |
| @react-native-async-storage/async-storage  | 	^1.15.5 |
| @react-native-community/masked-view  | ^0.1.11 |
| @react-navigation/bottom-tabs  | ^6.0.1 |
| @react-navigation/material-bottom-tabs  | ^6.0.1 |
| @react-navigation/native | ^6.0.1 |
| @react-navigation/stack | ^6.0.1 |
| babel-eslint | ^10.1.0 |
| react | 17.0.1 |
| react-native | 0.64.2 |
| react-native-gesture-handler | ^1.10.3 |
| react-native-image-picker | ^4.0.6 |
| react-native-paper | ^4.9.2 |
| react-native-reanimated | ^2.2.0 |
| react-native-safe-area-context | ^3.3.0 |	
| react-native-screens | ^3.5.0 |
| react-native-vector-icons | ^8.1.0 |

#Troubleshooting

A React Native app is a compiled app that is running some Javascript. Whenever you build and run your React Native project, a packager starts up called Metro. You’ve probably seen this output in your terminal before, letting your know the packager is running.

The Metro bundler runs on port 8081. If another process is already using that port, you can either terminate that process, or change the port that the bundler uses.
