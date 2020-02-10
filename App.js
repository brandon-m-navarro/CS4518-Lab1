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

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined,
            isLoadingComplete: false
        };
        this._loadClient = this._loadClient.bind(this);
    }

    componentDidMount() {
        this._loadClient();
    }

    render() {
        return (<AppContainer />);
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,

            })
        ]);
    };

    _handleLoadingError = error => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };

    _loadClient() {
        Stitch.initializeDefaultAppClient("taskmanager-cmgig").then(client => {
            this.setState({ client });
            this.state.client.auth
            .loginWithCredential(new AnonymousCredential())
            .then(user => {
                console.log(`Successfully logged in as user ${user.id}`);
                this.setState({ currentUserId: user.id });
                this.setState({ currentUserId: client.auth.user.id });
            })
            .catch(err => {
                console.log(`Failed to log in anonymously: ${err}`);
                this.setState({ currentUserId: undefined });
            });
        });
    }
}


const AppContainer = createAppContainer(MainNavigator);
