import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { sendSubmission, } from '../Redux/Actions/ContestAction';




export default function SubmitScreen({ navigation, route }) {
    const { contestId } = route.params;
    const token = useSelector(state => state.auth.token)



    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")


    const [photoProfile, setPhotoProfile] = useState(null);
    const [photoName, setPhotoName] = useState(null);
    const [photoType, setPhotoType] = useState(null);

    const [photoProfile1, setPhotoProfile1] = useState(null);
    const [photoName1, setPhotoName1] = useState(null);
    const [photoType1, setPhotoType1] = useState(null);

    const [photoProfile2, setPhotoProfile2] = useState(null);
    const [photoName2, setPhotoName2] = useState(null);
    const [photoType2, setPhotoType2] = useState(null);

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
    const handleChoosePhoto1 = () => {
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
                setPhotoProfile1(response.uri);
                setPhotoName1(response.fileName);
                setPhotoType1(response.type);
            }
        });
    };
    const handleChoosePhoto2 = () => {
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
                setPhotoProfile2(response.uri);
                setPhotoName2(response.fileName);
                setPhotoType2(response.type);
            }
        });
    };
    const dispatch = useDispatch()

    const handleSubmit = (idContest, token, title, desc, photo, photoName, photoType, photo1, photoName1, photoType1, photo2, photoName2, photoType2) => {
        if (title == "" && desc == "" && photo == null && photo1 == null && photo2 == null) {
            dispatch({ type: "TOAST", toastMessage: "Please input 3 file, title and description of your submissions" })
        } else {
            dispatch(sendSubmission(idContest, token, title, desc, photo, photoName, photoType, photo1, photoName1, photoType1, photo2, photoName2, photoType2))
            dispatch({ type: "LOADING" })
            navigation.goBack()
        }

    }


    const toast = useSelector(state => state.message)

    const showToast = () => {
        ToastAndroid.show(toast.toastMessage, ToastAndroid.SHORT);
        dispatch({ type: "TOAST" })
    };
    return (
        <View style={styles.container}>
            <Text style={styles.textDetailsTitle}>Upload your file</Text>
            <View style={styles.imageFormContainer}>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => handleChoosePhoto()}>
                    <Image style={styles.imageContainer} source={{ uri: photoProfile }} />
                    <Icons name="plus-circle" color="black" size={48} style={{ position: "absolute" }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => handleChoosePhoto1()}>
                    {/* <Image style={styles.imageContainer} source={require("../Assets/Images/Ilustration_sm.png")} /> */}
                    <Image style={styles.imageContainer} source={{ uri: photoProfile1 }} />
                    <Icons name="plus-circle" color="black" size={48} style={{ position: "absolute" }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => handleChoosePhoto2()}>
                    <Image style={styles.imageContainer} source={{ uri: photoProfile2 }} />
                    <Icons name="plus-circle" color="black" size={48} style={{ position: "absolute" }} />
                </TouchableOpacity>
            </View>


            <View style={{ width: "80%" }}>
                <Text style={styles.itemTitle}>Title</Text>
                <View style={{ borderRadius: 5, borderWidth: 1, borderColor: "rgba(0,0,0,0.3)", marginVertical: 5 }}>
                    <TextInput value={title} onChangeText={(val) => setTitle(val)} />
                </View>
            </View>
            <View style={{ width: "80%" }}>
                <Text style={styles.itemTitle}>Description</Text>
                <View style={{ borderRadius: 5, borderWidth: 1, borderColor: "rgba(0,0,0,0.3)", marginVertical: 5 }}>
                    <TextInput multiline editable numberOfLines={5} textAlignVertical="top" value={desc} onChangeText={(val) => setDesc(val)} />
                </View>
            </View>

            <TouchableOpacity style={styles.buttonSubmit} onPress={() => handleSubmit(contestId, token, title, desc, photoProfile, photoName, photoType, photoProfile1, photoName1, photoType1, photoProfile2, photoName2, photoType2)} >
                <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>Submit</Text>
            </TouchableOpacity>
            {toast.isToast && showToast()}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    textDetailsTitle: {
        fontSize: 27,
        fontWeight: "bold",
        marginVertical: 23
    },
    imageFormContainer: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-around",
        backgroundColor: "#c0c0c0",
        paddingVertical: 8,
        marginBottom: 25

    },
    imageContainer: {
        width: 90,
        height: 90,
        resizeMode: "cover"
    },
    itemTitle: {
        alignSelf: "flex-start",
        fontWeight: "bold",
        fontSize: 16
    },
    buttonSubmit: {
        width: "80%",
        backgroundColor: "#1DD1A1",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        marginTop: 10,
        borderRadius: 5
    }
})
