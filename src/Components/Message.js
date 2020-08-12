import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Logout } from '../Redux/Actions/AuthAction'


export default function Message(props) {
    const message = useSelector(state => state.message)
    const dispatch = useDispatch()
    const handleCloseMessage = () => dispatch({ type: "MESSAGE", message: "" })
    const handleLogout = () => {
        dispatch(Logout())
        dispatch({ type: "LOADING" })
        dispatch({ type: "MESSAGE", message: "" })
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={message.isVisible}
        >

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" }}>

                <View style={{ width: "70%", backgroundColor: "white", justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 10, elevation: 8 }}>
                    <Icon name="alert-circle" size={40} color="#10AC84" />
                    <Text style={{ fontWeight: "normal", fontSize: 20, marginVertical: 20, color: "rgba(0,0,0,0.7)", fontWeight: "bold", textAlign: "center" }} >{message.message}</Text>
                    <View style={{ flexDirection: "row", width:"100%", justifyContent:"space-around" }}>
                        <TouchableOpacity onPress={() => handleCloseMessage()} style={{ borderRadius: 5, backgroundColor: "#10AC84", padding: 7, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>CANCEL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleLogout()} style={{ borderRadius: 5, backgroundColor: "#10AC84", padding: 7, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>LOGOUT</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})
