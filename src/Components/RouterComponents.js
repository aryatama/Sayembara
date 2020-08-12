import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


export const LogoTitle = () => {
    return (
        <Image style={{ resizeMode: "contain", width: 120 }} source={require("../Assets/Images/Sayembara_white.png")} />
    )
}

export const MenuLogout = () => {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch({ type : "MESSAGE", message:"Log out of sayembara?"})
    }
    if(token == null) {
        return (
            <View></View>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={() => handleLogout()} >
            <Icons name="logout" color="white" size={28} style={{ marginRight: 8 }} />
        </TouchableWithoutFeedback>
    )
}
