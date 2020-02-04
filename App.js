// React
import React, { Component } from 'react';
import { Text, View, Image, Button, TouchableOpacity, SafeAreaView,
         ScrollView, FlatList, Dimensions, Linking, TextInput, Modal,
         TouchableHighlight, Alert,  } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SocialIcon, Tile,
          Divider, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Project
import styles from './StyleSheet';

// imageSrc
import dessert from './assets/Dessert.jpeg';
import patrick from './assets/Patrick.jpeg';
import hershey from './assets/Hershey.jpeg';
import tree from './assets/Tree.jpeg';
import info from './assets/info.png';
import logo from './assets/react-logo.png';
import Constants from 'expo-constants';
const { width, height } = Dimensions.get('window');

class HomeScreen extends Component {

    state = {
      modalVisible: false,
      username: '',
      password: '',
    };

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>

          <View style={{ flex:4, backgroundColor: '#74828F'}}>
                <Tile
                      imageSrc={logo}
                      title="Welcome!"
                      featured
                      caption="My First React Native Application"
                />
                <Divider style={{ backgroundColor: '#BEB9B5', height:2 }} />

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
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={this.state.modalVisible}
                      onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                      }}>
                      <View style={{ flex: 0.5,
                                     marginLeft: width / 12,
                                     marginRight: width / 12,
                                     flexDirection: "column",
                                     backgroundColor: "#f7f7f7",
                                     marginTop: height / 2.5 }}>
                        <View>
                          <TouchableHighlight
                              style={{ marginLeft: 15, marginTop: 15}}
                             onPress={() => {
                               this.setModalVisible(!this.state.modalVisible);
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
                                  style={{ height: 40 }}
                                  placeholder="Type here to translate!"
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
                              style={{height: 40}}
                              placeholder="Enter Password"
                              onChangeText={(password) => this.setState({password})}
                              value={this.state.password}
                            />
                        </View>
                      </View>
                    </Modal>
                    <View style={{ justifyContent: 'center', alignItems:'center' }}>
                    <Icon
                         name='sign-in'
                         size={35}
                         color='black'
                         onPress={() => {
                           this.setModalVisible(true);
                         }}
                    />
                <Text style={{ color:'white' }}>
                        Sign In / Register
                    </Text>
                    </View>
                    <View style={{alignItems:'center'}}>
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
                     <View style={styles.view}>
                         <ProfilePic/>
                     </View>
                         <View style={styles.view}>
                             <Image source={hershey} style={{width: 335, height: 200}}/>
                         </View>
                     <View style={styles.view}>
                         <Image source={tree} style={{width: 335, height: 200}}/>
                     </View>
                     <View style={styles.view}>
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


class LoginScreen extends Component {

    // state = {
    //   modalVisible: false,
    // };
    //
    // setModalVisible(visible) {
    //   this.setState({modalVisible: visible});
    // }
//
    // constructor(props) {
    //   super(props);
    //   this.state = {text: ''};
    // }
    //
    // render() {
    //    return (
    //      <View style={{padding: 10}}>
    //        <TextInput
    //          style={{height: 40}}
    //          placeholder="Type here to translate!"
    //          onChangeText={(text) => this.setState({text})}
    //          value={this.state.text}
    //        />
    //        <Text style={{padding: 10, fontSize: 42}}>
    //          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
    //        </Text>
    //      </View>
    //    );
    //  }
}


class ProfilePic extends Component {
  render() {
    return (
      <Image source={dessert} style={{width: 335, height: 200}}/>
    );
  }
}


const MainNavigator = createStackNavigator(
{
  Home: {screen: HomeScreen},
  About: {screen: AboutScreen},
  Login: {screen: LoginScreen},
},
{
  initialRouteName: 'Home',
});

const App = createAppContainer(MainNavigator);

export default App;
