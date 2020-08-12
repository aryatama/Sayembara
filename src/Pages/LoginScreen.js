import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../Redux/Actions/AuthAction';


export default function LoginScreen({ navigation }) {
    const [checkEmail, setCheckEmail] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        dispatch({type :"RESET_REGISTER"})
    }, [])

    const handleCheckEmail = (val) => {
        setEmail(val)
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            setCheckEmail(true)
        } else {
            setCheckEmail(false)
        }

    }



    const handleLogin = (Email, Password) => {
        if (checkEmail == true && email !== "" && password !== "") {
            dispatch(Login(Email, Password))
            dispatch({ type: 'LOADING' })
        } else {
            dispatch({ type: "TOAST", toastMessage: "Incorrect Input, try again!" })
        }
    }

    const dispatch = useDispatch()

    const toast = useSelector(state => state.message)

    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        if (token !== null) {
            navigation.navigate("MainTab")
        }
    })
    

    const showToast = () => {
        ToastAndroid.show(toast.toastMessage, ToastAndroid.SHORT);
        dispatch({ type: "TOAST" })
    };

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", paddingTop: 50 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Sign in to your account</Text>

                <View style={{ width: "100%", backgroundColor: "white" }}>
                    <Image source={require("../Assets/Images/Ilustration_sm.png")} style={{ resizeMode: "contain", width: "100%", height: 240 }} />
                </View>
            </View>



            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                    <Text style={styles.itemTitle}>Email</Text>
                    <View style={styles.itemInput}>
                        <TextInput autoCapitalize="none" placeholder="example@mail.com" value={email} onChangeText={(val) => handleCheckEmail(val)} />
                        {email == "" ? null :
                            <Icons name={checkEmail ? "check-circle" : "close-circle-outline"} color={checkEmail ? "#1DD1A1" : "rgba(0,0,0,0.4)"} size={28} />
                        }
                    </View>
                </View>

                <View style={{ width: "80%", alignItems: "center", marginBottom: 25 }}>
                    <Text style={styles.itemTitle}>Password</Text>
                    <View style={styles.itemInput}>
                        <TextInput autoCapitalize="none" placeholder="Password..." secureTextEntry={!showPassword} value={password} onChangeText={(val) => setPassword(val)} />
                        <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                            <Icons name={showPassword ? "eye" : "eye"} color={showPassword ? "#1DD1A1" : "rgba(0,0,0,0.4)"} size={28} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => handleLogin(email, password)}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Sign In</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                        <Text style={{ fontWeight: "bold", color: "#1DD1A1" }}>Join here</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {toast.isToast && showToast()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        backgroundColor: "white"
    },
    itemTitle: {
        alignSelf: "flex-start",
        fontWeight: "bold",
        marginBottom: 3,
        fontSize: 16
    },

    itemInput: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: "rgba(0,0,0,0.3)"
    },
    button: {
        width: "80%",
        backgroundColor: "#1DD1A1",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        elevation: 1
    }
})
