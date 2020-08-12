import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getDetailContest, getDetailContestWithToken } from '../Redux/Actions/ContestAction';
import Submissions from '../Components/Submissions';


export default function ContestDetailsScreen({ route, navigation }) {
    const { contestId } = route.params;


    const detail = useSelector(state => state.contest.detailContest.detail_contest)
    const token = useSelector(state => state.auth.token)
    const submissions = useSelector(state => state.contest.detailContest.detail_submission)
    const submitStatus = useSelector(state => state.contest.detailContest.alreadySubmit)
    const winnerDetail = useSelector(state => state.contest.detailContest.contestWinner)
    const dispatch = useDispatch()

    useEffect(() => {
        if (token == null) {
            dispatch(getDetailContest(contestId))
        } else dispatch(getDetailContestWithToken(contestId, token))
    }, [])



    return (
        <ScrollView style={{ width: "100%", backgroundColor: "white" }}>

            <View style={styles.container}>

                <View style={styles.contentDetailsContainer}>
                    <Text style={styles.textDetailsTitle}>{detail.title}</Text>

                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Text>Status : </Text>
                        <Text style={styles.textDetails}>{detail.status}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text>Winner Prize : </Text>
                        <Text style={styles.textDetails}>IDR {detail.prize}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text>Due date : </Text>
                        <Text style={styles.textDetails}>{moment(detail.due_date).format('dddd, D MMMM YYYY')}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                        <Text>Announcement : </Text>
                        <Text style={styles.textDetails}>{moment(detail.announcement).format('dddd, D MMMM YYYY')}</Text>
                    </View>

                    <Text style={{ textAlign: "justify", color: "rgba(0,0,0,0.4)" }}>{detail.description}</Text>

                    {winnerDetail !== "Contest still open" ?
                        <View style={{ width: "80%", justifyContent: "center", alignItems: "center", marginTop: 25 }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                                Congratulations!
                            </Text>
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                                you re the winner!
                            </Text>
                            <Text style={{ color: "#1DD1A1", fontWeight: "bold", marginTop: 7 }} >{winnerDetail.user.profile.first_name}</Text>
                            <View style={{ flexDirection: "row" }} >
                                <Text>Bank : </Text>
                                <Text style={{ fontWeight: "bold" }}>{winnerDetail.user.profile.bank} </Text>
                                <Text style={{ fontWeight: "bold" }}>{winnerDetail.user.profile.acc_number}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }} >
                                <Text>Amount : </Text>
                                <Text style={{ fontWeight: "bold" }}>IDR {winnerDetail.contest.prize}</Text>
                            </View>

                            {winnerDetail.contest.winner_get_paid == false ?
                                <View style={{ width: "100%", backgroundColor: "rgba(29, 209, 161, 0.25)", borderRadius: 5, padding: 15, justifyContent: "center", alignItems: "center", borderColor: "#1DD1A1", borderWidth: 1, marginTop: 10 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 12 }}>Payment on proses</Text>
                                </View> :
                                <View style={{ width: "100%", backgroundColor: "rgba(29, 209, 161, 0.25)", borderRadius: 5, padding: 15, justifyContent: "center", alignItems: "center", borderColor: "#1DD1A1", borderWidth: 1, marginTop: 10 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 12 }}>Payment Sent</Text>
                                </View>
                            }
                        </View> :

                        (submitStatus == true ?
                            <View style={{ width: "80%", backgroundColor: "rgba(29, 209, 161, 0.25)", borderRadius: 5, padding: 15, justifyContent: "center", alignItems: "center", borderColor: "#1DD1A1", borderWidth: 1, marginTop: 25 }}>
                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 12 }}>You are already submitted your work! {submitStatus}</Text>
                            </View>
                            :
                            (detail.status == "closed" ?
                                <View style={{ width: "80%", backgroundColor: "rgba(29, 209, 161, 0.25)", borderRadius: 5, padding: 15, justifyContent: "center", alignItems: "center", borderColor: "#1DD1A1", borderWidth: 1, marginTop: 25 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 12 }}>This contest already closed</Text>
                                </View> :
                                (token !== null ?
                                    <TouchableOpacity style={styles.buttonProfile} onPress={() => navigation.navigate("SubmitScreen", { contestId: contestId })}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Submit your work</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={styles.buttonProfile} onPress={() => navigation.navigate("AuthScreen")}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Login and submit your work</Text>
                                    </TouchableOpacity>
                                )
                            )
                        )

                    }


                    <Text style={{ ...styles.textDetailsTitle, marginTop: 30, marginBottom: 20 }}>Submissions</Text>


                    {
                        typeof submissions.rows == "string" ?
                            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ ...styles.textDetailsTitle, marginTop: 30, marginBottom: 20, color: "#1DD1A1", fontSize: 14 }}>This contest have no submissions</Text>
                            </View>
                            :
                            submissions.rows.map(item => {
                                return (
                                    <View key={item.id}>
                                        <Submissions
                                            itemKey={item.id}
                                            images={item.file}
                                            title={item.title}
                                            desc={item.description}
                                            provider={item.user.profile.first_name}
                                        />
                                    </View>

                                )
                            })
                    }



                </View>
            </View>


        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    contentDetailsContainer: {
        width: "80%",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 20

    },
    textDetails: {
        fontWeight: "bold"
    },
    textDetailsTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign:"center"
    },
    buttonProfile: {
        width: "80%",
        backgroundColor: "#1DD1A1",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        elevation: 1,
        marginTop: 20
    },
    subContainer: {
        width: 250,
        height: 280,
        borderRadius: 5,
        marginBottom: 20
    },
    imgThumbnail: {
        width: "100%",
        height: "60%",
        resizeMode: "cover",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    subDetailsContainer: {
        height: "40%",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "rgba(0,0,0,0.2)",
        padding: 7
    }
})
