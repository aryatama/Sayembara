import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button, ToastAndroid } from 'react-native'
import { Picker } from '@react-native-community/picker';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getContest, getMyContest, getAllContest } from '../Redux/Actions/ContestAction';
import { getProfile } from '../Redux/Actions/ProfileAction';



const Contest = (props) => (
    <View style={styles.contestContainer}>

        <View style={styles.descContainer}>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textContest}>Posted </Text>
                    <Text style={{ ...styles.textContest, fontWeight: "bold" }}>{moment(props.createdTime).startOf('day').fromNow()}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icons name="calendar-clock" size={19} color="red" />
                    <Text style={{ ...styles.textContest, color: "red" }}> {moment(props.due_date).format('MMMM Do YYYY')}</Text>
                </View>
            </View>

            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#10AC84" }}>{props.title}</Text>
            <View style={{ flexDirection: "row" }}>
                <Text>by </Text>
                <Text style={{ fontWeight: "bold" }}>{props.provider}</Text>
            </View>
            <Text>IDR {props.prize}</Text>

            <View style={{ marginTop: 7 }}>
                <Text numberOfLines={3} style={{ color: "rgba(0,0,0,0.3)", }}>{props.desc}</Text>
            </View>
        </View>

        {props.status == "open" ?
            <TouchableOpacity style={styles.buttonApply} onPress={() => props.handleGoToContestDetail()}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Apply</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ ...styles.buttonApply, backgroundColor: "rgba(84, 160, 255, 0.25)" }} onPress={() => props.handleGoToContestDetail()}>
                <Text style={{ color: "#10AC84", fontWeight: "bold", fontSize: 18 }}>Open</Text>
            </TouchableOpacity>
        }
    </View>
)
export default function HomeScreen({ navigation }) {
    const handleGetContest = () => {
        dispatch(getContest())
    }
    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId)

    useEffect(() => {
        dispatch({ type: "LOADING" })
        handleGetContest()
        console.log("HomeScreen")
        if (token !== null) {
            dispatch(getMyContest(token))
            dispatch(getProfile(token, userId))
            console.log("Ini jalan bgsdsdsd")
        }
    }, [])

    const dispatch = useDispatch()

    const allContest = useSelector(state => state.contest.allContest)
    const toast = useSelector(state => state.message)


    const openContest = allContest.filter(contest => {
        return contest.status == "open"
    });

    const closeContest = allContest.filter(contest => {
        return contest.status == "closed"
    });

    const handleSearch = (Title) => {
        dispatch(getAllContest((Title)))
        dispatch({ type: "LOADING" })
    }
    const showToast = () => {
        ToastAndroid.show(toast.toastMessage, ToastAndroid.SHORT);
        dispatch({ type: "TOAST" })
    };


    const [category, setCategory] = useState("all")
    const [title, setTitle] = useState("")

    return (
        <View style={styles.container}>

            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <View style={styles.itemInput}>
                    <Text style={{ color: "rgba(0,0,0,0.3)" }}>Status :</Text>
                    <Picker
                        mode="dropdown"
                        selectedValue={category}
                        style={{ width: "85%" }}
                        onValueChange={(itemValue) =>
                            setCategory(itemValue)
                        }
                    >
                        <Picker.Item label="All" value="all" />
                        <Picker.Item label="Open" value="open" />
                        <Picker.Item label="Close" value="close" />
                    </Picker>
                </View>

                <View style={styles.itemInput}>
                    <TextInput placeholder="Find contest" value={title} onChangeText={(val) => setTitle(val)} />
                </View>
                <TouchableOpacity style={styles.buttonProfile} onPress={() => handleSearch(title)}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Search</Text>
                </TouchableOpacity>
            </View>


            {category == "all" ?
                <View style={{ width: "100%", height: "70%" }}>
                    <FlatList
                        data={allContest}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Contest
                                createdTime={item.createdAt}
                                desc={item.description}
                                prize={item.prize}
                                title={item.title}
                                provider={item.user.profile.first_name}
                                due_date={item.due_date}
                                idContest={item.id}
                                status={item.status}
                                handleGoToContestDetail={() => { navigation.navigate("ContestDetailsScreen", { contestId: item.id }); dispatch({ type: "LOADING" }) }}
                            />
                        )}
                        keyExtractor={item => `item ${item.id}`}
                    />
                </View> :
                (category == "open" ?
                    <View style={{ width: "100%", height: "70%" }}>
                        <FlatList
                            data={openContest}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Contest
                                    createdTime={item.createdAt}
                                    desc={item.description}
                                    prize={item.prize}
                                    title={item.title}
                                    provider={item.user.profile.first_name}
                                    due_date={item.due_date}
                                    idContest={item.id}
                                    status={item.status}
                                    handleGoToContestDetail={() => { navigation.navigate("ContestDetailsScreen", { contestId: item.id }); dispatch({ type: "LOADING" }) }}
                                />
                            )}
                            keyExtractor={item => `item ${item.id}`}
                        />
                    </View> :
                    <View style={{ width: "100%", height: "70%" }}>
                        <FlatList
                            data={closeContest}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Contest
                                    createdTime={item.createdAt}
                                    desc={item.description}
                                    prize={item.prize}
                                    title={item.title}
                                    provider={item.user.profile.first_name}
                                    due_date={item.due_date}
                                    idContest={item.id}
                                    status={item.status}
                                    handleGoToContestDetail={() => { navigation.navigate("ContestDetailsScreen", { contestId: item.id }); dispatch({ type: "LOADING" }) }}
                                />
                            )}
                            keyExtractor={item => `item ${item.id}`}
                        />
                    </View>
                )
            }

            {/* <View style={{ width: "100%" }}>
                <FlatList
                    data={allContest || []}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.contestContainer}>

                            <View style={styles.descContainer}>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.textContest}>Posted </Text>
                                        <Text style={{ ...styles.textContest, fontWeight: "bold" }}>{moment(item.createdAt).startOf('day').fromNow()}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Icons name="calendar-clock" size={19} color="red" />
                                        <Text style={{ ...styles.textContest, color: "red" }}> {moment(item.due_date).format('MMMM Do YYYY')}</Text>
                                    </View>
                                </View>

                                <Text style={{ fontSize: 22, fontWeight: "bold", color: "#10AC84" }}>{item.title}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text>by </Text>
                                    <Text style={{ fontWeight: "bold" }}>{item.user.profile.first_name}</Text>
                                </View>
                                <Text>IDR {item.prize}</Text>

                                <View style={{ marginTop: 7 }}>
                                    <Text numberOfLines={3} style={{ color: "rgba(0,0,0,0.3)", }}>{item.description}</Text>
                                </View>
                            </View>

       
                            <TouchableOpacity style={styles.buttonApply} onPress={() => {navigation.navigate("ContestDetailsScreen", { contestId: item.id });  dispatch({ type: "LOADING" })} }>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => `item ${item.id}`}
                />
            </View> */}



            {toast.isToast && showToast()}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"

    },
    itemInput: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 10
    },
    buttonProfile: {
        width: "80%",
        backgroundColor: "#1DD1A1",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        elevation: 1
    },
    contestContainer: {
        width: "80%",
        height: 220,
        marginBottom: 16,
        alignSelf: "center",

    },
    descContainer: {
        height: "80%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: "rgba(0,0,0,0.2)",
        padding: 10,
    },
    buttonApply: {
        justifyContent: "center",
        alignItems: "center",
        height: "20%",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "#1DD1A1",

    },
    textContest: {
        fontSize: 12
    }

})
