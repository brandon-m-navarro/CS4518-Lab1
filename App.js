import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, SafeAreaView,
         ScrollView, FlatList, Dimensions, Linking } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SocialIcon, Tile,
          Divider, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import dessert from './assets/Dessert.jpeg';
import patrick from './assets/Patrick.jpeg';
import hershey from './assets/Hershey.jpeg';
import tree from './assets/Tree.jpeg';
import info from './assets/info.png';
import logo from './assets/react-logo.png';
import Constants from 'expo-constants';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        color: '#FEF6EB',
        fontWeight: 'bold',
        fontSize: 36,
        alignItems: 'center',
        textAlign: 'center',
    },
    subTitle: {
        color: '#FEF6EB',
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 50,
    },
    screenButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#C25B56',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    screenText:{
        color:'#fff',
        textAlign:'center',
    },
    scrollView: {
        backgroundColor: 'black',
    },
    container: {},
    view: {
        backgroundColor: 'blue',
        width: width - 80,
        margin: 10,
        height: 200,
        borderRadius: 10,
    },
    view2: {
        marginTop: 100,
        backgroundColor: 'red',
        width: width - 80,
        margin: 10,
        height: 200,
        borderRadius: 10,
    },
    button: {
        width: 50,
        height: 50,
    },
})

class HomeScreen extends Component {

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
                            <Text style={styles.screenText}>About Me</Text>
                        </TouchableOpacity>
                        <View style={{alignItems:'center'}}>
                            <SocialIcon
                              type='github'
                              title='Visit my Github!'
                              onPress={() => {
                                  Linking.openURL('https://github.com/brandon-m-navarro')
                              }}
                        />
                            <Text style={{color:'white'}}>Github</Text>
                        </View>
                    </View>
          </View>

          <Divider style={{ backgroundColor: '#BEB9B5', height:2 }} />



          <View style={{ flex:2, justifyContent: "center",
                         backgroundColor: '#525564'}}>
                         <ScrollView
                             ref={(scrollView) => { this.scrollView = scrollView; }}
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
                  color='white'
                />
              }
              disabled={true}
            />
            </View>
        )
    }
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
},
{
  initialRouteName: 'Home',
});

const App = createAppContainer(MainNavigator);

export default App;
