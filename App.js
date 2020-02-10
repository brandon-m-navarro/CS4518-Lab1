{/* Dependencies */}
import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const { Stitch, AnonymousCredential } =
        require('mongodb-stitch-react-native-sdk');
const MongoDB = require('mongodb-stitch-react-native-services-mongodb-remote');

{/* Project */}
import GLOBAL from './global.js';
import MainNavigator from './MainNavigator';


const App = createAppContainer(MainNavigator);
export default App;
