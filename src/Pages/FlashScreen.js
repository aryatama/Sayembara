import React from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'

export default function FlashScreen() {
    return (
        <View style={styles.container} >
            <View style={{ width: "100%", alignItems: "center", justifyContent: "center", height: 150, margin: 20 }}>
                <Image source={require('../Assets/Images/Sayembara.png')} style={styles.imageStyle} />
            </View>


            <View style={{justifyContent:"space-between"}}>
                <ActivityIndicator color="#1DD1A1" size="large" />
                <View style={{ width: "80%", marginBottom: 20, marginTop: 200 }}>
                    <Text style={styles.subTitle}>Find the perfect contest for you</Text>
                </View>
            </View>

            <View style={{ width: "100%", alignItems: "flex-end", justifyContent: "center", height: 250}}>
                <Image source={require('../Assets/Images/Illustration.png')} style={{ ...styles.imageStyle, width: "120%" }} />
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
    },
    imageStyle: {
        width: "80%",
        resizeMode: "contain"
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 4,
        color: "#10AC84"
    }


})
