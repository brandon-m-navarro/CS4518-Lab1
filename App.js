import React, { Component } from 'react';
import { Text, View, Image, Button, TouchableOpacity, SafeAreaView,
ScrollView, FlatList, Dimensions, Linking, TextInput, Modal,
TouchableHighlight, Alert,  } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SocialIcon, Tile,
         Divider, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const { Stitch, AnonymousCredential } =
        require('mongodb-stitch-react-native-sdk');
const MongoDB = require('mongodb-stitch-react-native-services-mongodb-remote');
import GLOBAL from './global.js';


{/* Project */}
import styles from './StyleSheet.js';

{/* imageSrcs */}
import dessert from './assets/Dessert.jpeg';
import patrick from './assets/Patrick.jpeg';
import hershey from './assets/Hershey.jpeg';
import tree from './assets/Tree.jpeg';
import info from './assets/info.png';
import logo from './assets/react-logo.png';
import Constants from 'expo-constants';
const { width, height } = Dimensions.get('window');


{/* Database that is initialized at runtime */}
var accounts = [
    {
        username: 'user',
        password: 'password'
    },
    {
        username: 'airbud',
        password: 'dunk'
    }
];

class HomeScreen extends Component {

    state = {
        username: '',
        password: '',
        message: 'Welcome!',
        error: '',
    };

    setModalVisible(visible) {
        GLOBAL.screen1.setState({MODALVISABLE: visible});
    }

    setLoggedIn(auth) {
        GLOBAL.screen1.setState({LOGGEDIN: auth});
    }

    _loadClient() {
        Stitch.initializeDefaultAppClient('TODO: greeting-xxxx').then(client => {
        this.setState({ client });
        const dbClient = client.getServiceClient(MongoDB.RemoteMongoClient.factory, "mongodb-atlas");
        this.setState({atlasClient : dbClient});
        this.setState({db : dbClient.db("greetings")});
    });
}

    authenticateUser(username, password) {
        var valid = false;
        for (var i = 0; i < accounts.length; i++) {
            if (username == accounts[i].username) {
                if (password == accounts[i].password) {
                    valid = true;
                    break;
                }
            }
            continue;
        }

        if (valid) {
            this.setModalVisible(false);
            this.setState({message: "Logged In!"});
        } else {
            this.setState({error: "invalid credentials"});
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        {/* Get global state */}
        GLOBAL.screen1 = this;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex:4, backgroundColor: '#74828F'}}>
                    <Tile
                        imageSrc={logo}
                        title={this.state.message}
                        featured
                        caption="My First React Native Application"
                        />
                    <Divider style={{ backgroundColor: '#BEB9B5', height:2 }} />
                    {/*
                        Begin rendering buttons
                    */}
                    <View style={{ flexDirection:'row', justifyContent:'space-around', marginTop:15}}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('About')
                            }}>
                            <Image
                                source={info}
                                style={{ width: 64, height: 64 }}
                                />
                            <Text style={{ color:'white' }}>About Me</Text>
                        </TouchableOpacity>
                        {/*
                            Render modal window
                        */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={GLOBAL.screen1.state.MODALVISABLE}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View style={{
                                    flex: 0.65,
                                    marginLeft: width / 12,
                                    marginRight: width / 12,
                                    flexDirection: "column",
                                    backgroundColor: "#f7f7f7",
                                    marginTop: height / 2.5 }}
                                    >
                                    <View>
                                        <TouchableHighlight
                                            style={{ marginLeft: 15, marginTop: 15}}
                                            onPress={() => {
                                                this.setModalVisible(false);
                                            }}>
                                            <Text style={{ fontSize:16, fontWeight:"bold" }}>
                                                X
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                    <View style={{ flexDirection:'column',
                                        justifyContent:'center',
                                        alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>Login</Text>
                                        <TextInput
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ height: 40 , width: '50%' }}
                                            placeholder="Enter Username"
                                            onChangeText={(username) => this.setState({username})}
                                            value={this.state.username}
                                            />
                                    </View>
                                    <View style={{ flexDirection:'column',
                                        justifyContent:'center',
                                        alignItems: 'center' ,
                                        marginTop: 15}}>
                                        <Text style={{ fontSize: 16 }}>Password</Text>
                                        <TextInput
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            secureTextEntry={true}
                                            style={{height: 40, width: '50%' }}
                                            placeholder="Enter Password"
                                            onChangeText={(password) => this.setState({password})}
                                            value={this.state.password}
                                            />
                                        {/*
                                        Create flash message to inform the user of
                                        incorrect credentials
                                        */}
                                        <Text style={{ color:'red' }}>{this.state.error}</Text>
                                        <View style={{ alignItems:'center', flexDirection:'row',
                                            marginTop:5, marginBottom:10, }}>
                                            <Text style={{flex:.15, }}
                                                onPress={() => {
                                                    this.authenticateUser(this.state.username, this.state.password);
                                                }}>
                                                Login
                                            </Text>
                                            <TouchableHighlight
                                                onPress={() => {
                                                    this.authenticateUser(this.state.username, this.state.password);
                                                }}>
                                                <Icon
                                                    name='sign-in'
                                                    size={25}
                                                    color='black'
                                                    />
                                            </TouchableHighlight>
                                        </View>
                                        {/* Create seperating bar for regerstering */}
                                        <View style={{ flexDirection:'row', }}>
                                            <View style={{ borderBottomColor:'black',
                                                           borderBottomWidth:1,
                                                           alignSelf:'flex-start',
                                                           width:'30%', height:'50%',
                                                           marginRight:3 }} />
                                            <Text style={{ }}>OR</Text>
                                            <View style={{ borderBottomColor:'black',
                                                           borderBottomWidth:1,
                                                           alignSelf:'flex-start',
                                                           width:'30%',
                                                           height:'50%',
                                                           marginLeft:3 }} />
                                        </View>
                                        <View style={{alignItems:'center', flexDirection:'row', marginTop:10 }}>
                                            <Text style={{flex:.35}}
                                                onPress={() => {
                                                    this.authenticateUser(this.state.username, this.state.password);
                                                }}>
                                                Create Account
                                            </Text>
                                            <TouchableHighlight
                                                onPress={() => {
                                                    this.authenticateUser(this.state.username, this.state.password);
                                                }}>
                                                <Icon
                                                    name='user-plus'
                                                    size={25}
                                                    color='black'
                                                    />
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <View style={{ justifyContent: 'center', alignItems:'center', width:'25%'}}>
                                <Icon
                                    title='Login'
                                    name='sign-in'
                                    size={32}
                                    onPress={ () => {
                                        this.setModalVisible(true);
                                    }}>
                                </Icon>
                                <Text style={{ color:'white' }}>Sign In</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems:'center' }}>
                                <Icon
                                    title='Logout'
                                    name='sign-out'
                                    size={32}
                                    onPress={ () => {
                                        if (GLOBAL.screen1.state.LOGGEDIN) {
                                            this.setLoggedIn(false);
                                        } else {
                                            Alert.alert(
                                              'Error!',
                                              'You are currently not signed in!',
                                              [
                                                {text: 'OK', onPress: () => console.log('OK pressed')},
                                              ],
                                              {cancelable: false},
                                            );
                                        }
                                    }}>
                                </Icon>
                                <Text style={{ color:'white' }}>Sign Out</Text>
                            </View>
                            <View style={{ alignItems:'center' }}>
                                <SocialIcon
                                    type='github'
                                    title='Visit my Github!'
                                    onPress={() => {
                                        Linking.openURL('https://github.com/brandon-m-navarro/CS4518-Lab1')
                                    }}
                                    />
                                <Text style={{color:'white'}}>Github</Text>
                            </View>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: '#BEB9B5', height:2 }} />
                    {/*
                        Begin rendering image carousel
                    */}
                    <View style={{ flex:2, justifyContent: "center", backgroundColor: '#525564'}}>
                        <ScrollView
                            style={styles.container}
                            pagingEnabled={true}
                            horizontal= {true}
                            decelerationRate={0}
                            snapToInterval={width - 60}
                            snapToAlignment={"center"}
                            contentInset={{
                                top: 0,
                                left: 30,
                                bottom: 0,
                                right: 30,
                            }}>
                            <View style={{ backgroundColor: 'blue',
                                width: width - 80,
                                margin: 10,
                                height: 200,
                                borderRadius: 10 }}>
                                <Image source={dessert} style={{width: 335, height: 200}}/>
                            </View>
                            <View style={{ backgroundColor: 'blue',
                                width: width - 80,
                                margin: 10,
                                height: 200,
                                borderRadius: 10 }}>
                                <Image source={hershey} style={{width: 335, height: 200}}/>
                            </View>
                            <View style={{ backgroundColor: 'blue',
                                width: width - 80,
                                margin: 10,
                                height: 200,
                                borderRadius: 10 }}>
                                <Image source={tree} style={{width: 335, height: 200}}/>
                            </View>
                            <View style={{ backgroundColor: 'blue',
                                width: width - 80,
                                margin: 10,
                                height: 200,
                                borderRadius: 10 }}>
                                <Image source={patrick} style={{width: 335, height: 200}}/>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            );
        }
    }

class AboutScreen extends Component {
    render() {
        return (
            <View style={{ flex:1, justifyContent: "top", alignItems: "center",
                backgroundColor: '#525564', paddingTop: 10 }}>
                <View height={20}></View>
                <AboutItem color="white" icon='user-secret' content='Brandon Navarro' size={40}></AboutItem>
                <View height={20}></View>
                <AboutItem color="white" icon='university' content='Worcester Polytechnic Institute' size={30}></AboutItem>
                <View height={20}></View>
                <AboutItem color="white" icon='at' content='bmnavarro@wpi.edu' size={30}></AboutItem>
                <View height={20}></View>
                <AboutItem color="white" icon='graduation-cap' content='Computer Science - (May 2020)' size={30}></AboutItem>
            </View>
        )
    }
}

class LoginButton extends Component {



    login () {
        this.setState(previousState => (
            { isShowingLogin: !previousState.isShowingLogin }
        ))
    }

    render () {

        {/* Get global state */}
        GLOBAL.screen1 = this;

        {/* Determine what button to show (login or logout) */}
        if (!GLOBAL.screen1.state.LOGGEDIN) {
            return (
                <View style={{ justifyContent: 'center', alignItems:'center' }}>
                    <Icon
                        title='Login'
                        name='sign-in'
                        size={64}
                        onPress={ () => {
                            {/* Open the modal window */}
                        }}>
                    </Icon>
                    <Text style={{ color:'white' }}>Sign In</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Icon
                        name='sign-out'
                        size={35}
                        color='black'
                        onPress={ () => {
                            {/* Set global state to logged out */}

                        }}
                        />
                    <Text style={{ color:'white' }}>
                        Sign Out
                    </Text>
                </View>
            )
        }
    }
}

class AboutItem extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={{position:'absolute', left: 75, bottom: 10, color:'white'}}>
                    {this.props.content}
                </Text>
                <Input
                    leftIcon={
                        <Icon
                            name={this.props.icon}
                            size={this.props.size}
                            color={this.props.color}
                            />
                    }
                    disabled={true}
                    />
            </View>
        )
    }
}

const MainNavigator = createStackNavigator(
    {
        Home: {screen: HomeScreen},
        About: {screen: AboutScreen},
    },
    {
        initialRouteName: 'Home',
    });

const App = createAppContainer(MainNavigator);
export default App;
