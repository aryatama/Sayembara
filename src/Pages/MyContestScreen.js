import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image, FlatList } from 'react-native'
import { Picker } from '@react-native-community/picker';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';



export default function MyContestScreen({navigation}) {

    const token = useSelector(state => state.auth.token)

    const myContest = useSelector(state => state.contest.myContest)

    const dispatch = useDispatch()

    const openContest = myContest.filter(contest => {
        return contest.status == "open"
    });

    const closeContest = myContest.filter(contest => {
        return contest.status == "close"
    });

    const [category, setCategory] = useState("all")
    if (token == null) {
        return (
            <View style={{ ...styles.container, justifyContent: "center" }}>
                <View style={{ height: 225, justifyContent:"center" }}>
                    <Image style={{ width: 350, resizeMode: "contain" }} source={require("../Assets/Images/Ilustration_sm.png")} />
                </View>

                <Text style={{fontSize:30, color:"#1DD1A1", fontWeight:"bold"}}>Oops!</Text>
                <View style={{flexDirection:"row"}}>
                <Text style={{fontSize:20, color:"rgba(0,0,0,0.5)"}}>Are you a participant? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("AuthScreen")}>
                    <Text style={{fontSize:20, color:"#1DD1A1", fontWeight:"bold"}}>Join here</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
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

                {/* <View style={styles.itemInput}>
                    <TextInput placeholder="Find contest" />
                </View>
                <TouchableOpacity style={styles.buttonProfile}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Search</Text>
                </TouchableOpacity> */}
            </View>


            {category == "all" ?
                <View style={{ width: "100%",height: "90%"  }}>
                    <FlatList
                        data={myContest}
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
                                handleGoToContestDetail={() => {navigation.navigate("MyContestDetailsScreen", { contestId: item.id });  dispatch({ type: "LOADING" })}}
                            />
                        )}
                        keyExtractor={item => `item ${item.id}`}
                    />
                </View> :
                (category == "open" ?
                    <View style={{ width: "100%",height: "70%"  }}>
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
                                    handleGoToContestDetail={() => {navigation.navigate("ContestDetailsScreen", { contestId: item.id });  dispatch({ type: "LOADING" })}}
                                />
                            )}
                            keyExtractor={item => `item ${item.id}`}
                        />
                    </View> :
                    <View style={{ width: "100%",height: "70%"  }}>
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
                                    handleGoToContestDetail={() => {navigation.navigate("ContestDetailsScreen", { contestId: item.id });  dispatch({ type: "LOADING" })} }
                                />
                            )}
                            keyExtractor={item => `item ${item.id}`}
                        />
                    </View>
                )
            }
        </View>
    )
}

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

        <TouchableOpacity style={{...styles.buttonApply, backgroundColor:"rgba(84, 160, 255, 0.25)"}} onPress={() => props.handleGoToContestDetail()}>
            <Text style={{ color: "#10AC84", fontWeight: "bold", fontSize: 18 }}>Open</Text>
        </TouchableOpacity>
    </View>
)

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
        marginBottom:16,
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
