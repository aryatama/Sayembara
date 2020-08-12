import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../Redux/Actions/AuthAction';

export default function RegisterScreen({ navigation}) {

    const [checkEmail, setCheckEmail] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [checkPassword, setCheckPassword] = useState(false)
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    useEffect(() => {
        if (register) {
            navigation.goBack()
        }
    })
    

    const handleCheckEmail = (val) => {
        setEmail(val)
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            setCheckEmail(true)
        } else {
            setCheckEmail(false)
        }

    }

    useEffect(() => {
        handleCheckPassword()
    })

    const handleCheckPassword = () => {
        if ((password == password2) && (password !== "")) {
            setCheckPassword(true)
        } else setCheckPassword(false)
    }

    const handleRegister = (First, Last, Email, Password, Password2) => {
        if (checkEmail == true && checkPassword == true && first !== "" && last!==""){
            dispatch(Register(First, Last, Email, Password, Password2))
            dispatch({ type: 'LOADING' })
        }else {
            dispatch({ type: "TOAST", toastMessage: "Incorrect Input, try again!" })
        }
    }

    const register = useSelector(state => state.auth.register)

    

    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 50 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Create an account</Text>
            </View>


            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                    <Text style={styles.itemTitle}>First Name</Text>
                    <View style={styles.itemInput}>
                        <TextInput placeholder="John" onChangeText={(val) => setFirst(val)} />
                    </View>
                </View>

                <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                    <Text style={styles.itemTitle}>Last Name</Text>
                    <View style={styles.itemInput}>
                        <TextInput placeholder="Doe" onChangeText={(val) => setLast(val)} />
                    </View>
                </View>

                <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                    <Text style={styles.itemTitle}>Email</Text>
                    <View style={styles.itemInput}>
                        <TextInput autoCapitalize="none" placeholder="example@mail.com" value={email} onChangeText={(val) => handleCheckEmail(val)} />
                        {email == "" ? null :
                            <Icons name={checkEmail ? "check-circle" : "close-circle-outline"} color={checkEmail ? "#1DD1A1" : "rgba(0,0,0,0.4)"} size={28} />
                        }
                    </View>
                </View> 

                <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                    <Text style={styles.itemTitle}>Password</Text>
                    <View style={styles.itemInput}>
                        <TextInput autoCapitalize="none" placeholder="Password..." secureTextEntry={!showPassword} onChangeText={(val) => setPassword(val)} />
                        <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                            <Icons name={showPassword ? "eye" : "eye"} color={showPassword ? "#1DD1A1" : "rgba(0,0,0,0.4)"} size={28} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{ width: "80%", alignItems: "center", marginBottom: 25 }}>
                    <Text style={styles.itemTitle}>Verify Password</Text>
                    <View style={styles.itemInput}>
                        <TextInput placeholder="Verify Password..." autoCapitalize="none" secureTextEntry={!showPassword} onChangeText={(val) => setPassword2(val)} />
                        <View style={{ flexDirection: "row" }}>
                            {password2 == "" ? null :
                                <Icons name={checkPassword ? "check-circle" : "close-circle-outline"} color={checkPassword ? "#1DD1A1" : "rgba(0,0,0,0.4)"} size={28} />
                            }
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => handleRegister(first, last, email, password, password2) }>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Join</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ fontWeight: "bold", color: "#1DD1A1" }}>Sign In here</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
