import { SliderBox } from "react-native-image-slider-box";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import React, { useState, useEffect } from 'react'


export default function Submissions(props) {
    const [modalView, setModalView] = useState(false)

    return (
        <View key={props.itemKey}>
        <TouchableOpacity style={styles.subContainer} onPress={() => setModalView(true)}>
            <Image style={styles.imgThumbnail} source={{ uri: props.images[0] }} />
            <View style={styles.subDetailsContainer}>
                <Text style={{ fontWeight: "bold", color: "#1DD1A1" }}>{props.title}</Text>
                <View style={{ flexDirection: "row", marginBottom: 5, }}>
                    <Text>by </Text>
                    <Text style={{ fontWeight: "bold" }}>{props.provider}</Text>
                </View>
                <Text numberOfLines={3} style={{ textAlign: "justify", color: "rgba(0,0,0,0.4)" }}>{props.desc}</Text>
            </View>
        </TouchableOpacity>
        
        <View>
            <Modal isVisible={modalView} onBackdropPress={() => setModalView(!modalView)} backdropTransitionOutTiming={0} animationIn="fadeIn" animationInTiming={300} animationOut="fadeOut" animationOutTiming={300}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: 320, backgroundColor: "white", borderRadius: 5 }} >
                        <View style={{ width: "100%", justifyContent: "center", alignSelf: "center" }}>
                            <SliderBox
                                parentWidth={320}
                                images={props.images}
                                ImageComponentStyle={{ borderTopLeftRadius: 5, borderTopRightRadius: 5, width: "100%" }}
                                imageLoadingColor="#1DD1A1"
                                dotColor="#1DD1A1"
                            />
                        </View>
                        <View style={{ width: "100%", justifyContent: "center", alignSelf: "center", padding: 10 }}>
                            <Text style={{ fontSize: 24, marginBottom: 10, color: "#1DD1A1", fontWeight: "bold" }}>by {props.provider}</Text>
                            <Text style={{ textAlign: "justify", color: "rgba(0,0,0,0.7)" }}>{props.desc}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
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
