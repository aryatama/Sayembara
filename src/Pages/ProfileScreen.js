import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../Redux/Actions/ProfileAction';
import ImagePicker from 'react-native-image-picker';


export default function ProfileScreen({ navigation }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [location, setLocation] = useState("")
    const [bank, setBank] = useState("")
    const [accNum, setAccNum] = useState()
    const [photoProfile, setPhotoProfile] = useState(null);
    const [photoName, setPhotoName] = useState(null);
    const [photoType, setPhotoType] = useState(null);

    const [update, setUpdate] = useState(false)


    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId)

    const dataProfile = useSelector(state => state.profile.dataProfile)



    const handleInitData = () => {
        setUpdate(true)
        setFirstName(dataProfile.first_name)
        setLastName(dataProfile.last_name)
        setLocation(dataProfile.location)
        setBank(dataProfile.bank)
        setAccNum(String(dataProfile.acc_number))
        setPhotoProfile(dataProfile.picture)
    }

    const dispatch = useDispatch()

    const handleUpdateData = (Token, UserId, fname, lname, locat, bank, accnum, photo, photoName, photoType) => {
        dispatch({ type: "LOADING" })
        dispatch(updateProfile(Token, UserId, fname, lname, locat, bank, accnum, photo, photoName, photoType))
        setUpdate(false)
    }

    const handleChoosePhoto = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error = ', response.error);
            } else {
                console.log(response)
                setPhotoProfile(response.uri);
                setPhotoName(response.fileName);
                setPhotoType(response.type);
            }
        });
    };
    if (token == null) {
        return (
            <View style={{ ...styles.container, justifyContent: "center" }}>
                <View style={{ height: 225, justifyContent: "center" }}>
                    <Image style={{ width: 350, resizeMode: "contain" }} source={require("../Assets/Images/Ilustration_sm.png")} />
                </View>

                <Text style={{ fontSize: 30, color: "#1DD1A1", fontWeight: "bold" }}>Oops!</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, color: "rgba(0,0,0,0.5)" }}>Are you a participant? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("AuthScreen")}>
                        <Text style={{ fontSize: 20, color: "#1DD1A1", fontWeight: "bold" }}>Join here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <ScrollView style={{ width: "100%" }}>



            {update ?
                <View style={styles.container}>

                    <View style={styles.thumbnail}>
                        <Image style={styles.imgThumbnail} source={{ uri: photoProfile }} />
                        <TouchableOpacity onPress={() => handleChoosePhoto()} style={{ width: 35, height: 35, backgroundColor: "#1DD1A1", justifyContent: "center", alignItems: "center", borderRadius: 20, position: "absolute", alignSelf: "center", elevation: 2 }}>
                            <Icons name="pencil-circle" color="white" size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemProfile}>
                        <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                            <Text style={styles.itemTitle}>First Name</Text>
                            <View style={{ ...styles.itemInput, borderColor: "#1DD1A1" }}>
                                <TextInput placeholder={dataProfile.first_name} value={firstName} onChangeText={(val) => setFirstName(val)} />
                            </View>
                        </View>
                        <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                            <Text style={styles.itemTitle}>Last Name</Text>
                            <View style={{ ...styles.itemInput, borderColor: "#1DD1A1" }}>
                                <TextInput placeholder={dataProfile.last_name} value={lastName} onChangeText={(val) => setLastName(val)} />
                            </View>
                        </View>

                        <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                            <Text style={styles.itemTitle}>Location</Text>
                            <View style={{ ...styles.itemInput, borderColor: "#1DD1A1" }}>
                                <TextInput placeholder={dataProfile.location} value={location} onChangeText={(val) => setLocation(val)} />
                                {/* <Icons name="check-circle" color="#1DD1A1" size={28} /> */}
                            </View>
                        </View>

                        <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                            <Text style={styles.itemTitle}>Bank</Text>
                            <View style={{ ...styles.itemInput, borderColor: "#1DD1A1" }}>
                                <TextInput placeholder={dataProfile.bank} value={bank} onChangeText={(val) => setBank(val)} />
                                {/* <Icons name="eye" color="#1DD1A1" size={28} /> */}
                            </View>
                        </View>
                        <View style={{ width: "80%", alignItems: "center", marginBottom: 25 }}>
                            <Text style={styles.itemTitle}>Account Number</Text>
                            <View style={{ ...styles.itemInput, borderColor: "#1DD1A1" }}>
                                <TextInput placeholder={String(dataProfile.acc_number)} value={accNum} onChangeText={(val) => setAccNum(val)} />
                            </View>
                        </View>

                        <View style={{flexDirection:"row", width:"90%", justifyContent:"space-around"}}>
                            <TouchableOpacity style={{...styles.buttonProfile, width:"40%", backgroundColor:"rgba(0,0,0,0.3)"}} onPress={() => setUpdate(false)}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{...styles.buttonProfile, width:"40%"}} onPress={() => handleUpdateData(token, userId, firstName, lastName, location, bank, accNum, photoProfile, photoName, photoType)}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                :
                <View style={styles.container}>

                    <View style={styles.thumbnail}>
                        <Image style={styles.imgThumbnail} source={{ uri: dataProfile.picture }} />

                    </View>
                    <View style={styles.itemProfile}>
                        <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                            <Text style={styles.itemTitle}>First Name</Text>
                            <View style={styles.itemInput}>
                                <TextInput placeholder="John" editable={false} style={{ color: "black" }} value={dataProfile.first_name} />
                            </View>
                        </View>
                        <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                            <Text style={styles.itemTitle}>Last Name</Text>
                            <View style={styles.itemInput}>
                                <TextInput placeholder="Doe" editable={false} style={{ color: "black" }} value={dataProfile.last_name} />
                            </View>
                        </View>

                        <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                            <Text style={styles.itemTitle}>Location</Text>
                            <View style={styles.itemInput}>
                                <TextInput placeholder="Your Location" style={{ color: "black" }} editable={false} value={dataProfile.location} />
                                {/* <Icons name="check-circle" color="#1DD1A1" size={28} /> */}
                            </View>
                        </View>

                        <View style={{ width: "80%", alignItems: "center", marginBottom: 10 }}>
                            <Text style={styles.itemTitle}>Bank</Text>
                            <View style={styles.itemInput}>
                                <TextInput placeholder="Bank Name" style={{ color: "black" }} editable={false} value={dataProfile.bank} />
                                {/* <Icons name="eye" color="#1DD1A1" size={28} /> */}
                            </View>
                        </View>
                        <View style={{ width: "80%", alignItems: "center", marginBottom: 25 }}>
                            <Text style={styles.itemTitle}>Account Number</Text>
                            <View style={styles.itemInput}>
                                <TextInput placeholder="Account Number" style={{ color: "black" }} editable={false} value={String(dataProfile.acc_number)} />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.buttonProfile} onPress={() => handleInitData()} >
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        backgroundColor: "white"
    },
    thumbnail: {
        width: 170,
        height: 170,
        justifyContent: "flex-end",
        alignItems: "center",
        marginVertical: 10
    },
    imgThumbnail: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 100
    },

    itemProfile: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
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
    buttonProfile: {
        width: "80%",
        backgroundColor: "#1DD1A1",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    }
})
