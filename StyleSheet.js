import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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
    button: {
        width: 50,
        height: 50,
    },
})
