import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SocialIcon,
         Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AboutScreen extends Component {
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
