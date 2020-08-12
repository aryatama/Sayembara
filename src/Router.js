import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';


import FlashScreen from './Pages/FlashScreen'
import HomeScreen from './Pages/HomeScreen';
import ProfileScreen from './Pages/ProfileScreen';
import MyContestScreen from './Pages/MyContestScreen';
import ContestDetailsScreen from './Pages/ContestDetailsScreen';
import { LogoTitle, MenuLogout } from './Components/RouterComponents';
import { StatusBar } from 'react-native';
import LoginScreen from './Pages/LoginScreen';
import RegisterScreen from './Pages/RegisterScreen';
import SubmitScreen from './Pages/SubmitScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getContest } from './Redux/Actions/ContestAction';
import Message from './Components/Message';
import Loading from './Components/Loading';
import { checkToken } from './Redux/Actions/AuthAction';
import DirectWebsite from './Components/DirectWebsite';


export default function Router() {
    const [Flash, setFlash] = useState(true)

    const dispatch = useDispatch()
    const handleCheckToken = () => {
        dispatch(checkToken())
    }

    useEffect(() => {
        StatusBar.setBackgroundColor("#10AC84")
        handleCheckToken()
        setTimeout(() => {
            setFlash(false)
        }, 1000);
        console.log("Router jalan")
    }, [])

    const MainTab = createBottomTabNavigator()
    const MainTabContainer = () => (
        <MainTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                showLabel: false,
                activeTintColor: "white",
                inactiveTintColor: "#10AC84",
                style: {
                    backgroundColor: '#1DD1A1',
                    borderTopColor: "transparent"

                },

            }}

        >
            <MainTab.Screen name="Profile" component={ProfileContainer} options={{
                tabBarIcon: ({ color }) => (
                    <Icons name="account" color={color} size={35} />
                )
            }} />
            <MainTab.Screen name="Home" component={HomeContainer} options={{
                tabBarIcon: ({ color }) => (
                    <Icons name="home" color={color} size={35} />
                )
            }} />
            <MainTab.Screen name="MyContest" component={MyContestContainer} options={{
                tabBarIcon: ({ color }) => (
                    <Icons name="view-list" color={color} size={35} />
                )
            }} />
        </MainTab.Navigator>
    )

    const Home = createStackNavigator()
    const HomeContainer = () => (
        <Home.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#1DD1A1",
            },
            headerTitle: props => (<LogoTitle {...props} />),
            headerTitleAlign: "center",
        }}>
            <Home.Screen name="HomeScreen" component={HomeScreen} />
            <Home.Screen name="ContestDetailsScreen" component={ContestDetailsScreen} />
            <Home.Screen name="SubmitScreen" component={SubmitScreen} />

        </Home.Navigator>
    )

    const Profile = createStackNavigator()
    const ProfileContainer = () => (
        <Profile.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#1DD1A1",
            },
            headerTitle: props => (<LogoTitle {...props} />),
            headerTitleAlign: "center",
        }}>
            <Profile.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerRight: props => (<MenuLogout {...props} />) }} />
        </Profile.Navigator>
    )

    const MyContest = createStackNavigator()
    const MyContestContainer = () => (
        <MyContest.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#1DD1A1",
            },
            headerTitle: props => (<LogoTitle {...props} />),
            headerTitleAlign: "center",
        }}>
            <MyContest.Screen name="MyContestScreen" component={MyContestScreen} />
            <Home.Screen name="MyContestDetailsScreen" component={ContestDetailsScreen} />
        </MyContest.Navigator>
    )

    const AuthScreen = createStackNavigator()
    const AuthSceenContainer = () => (
        <AuthScreen.Navigator>
            <AuthScreen.Screen name="LoginScreen" component={LoginScreen} />
            <AuthScreen.Screen name="RegisterScreen" component={RegisterScreen} />
        </AuthScreen.Navigator>
    )

    if (Flash) {
        return (
            <FlashScreen />
        )
    }

    const MainScreen = createStackNavigator()

    return (
        <>
            <NavigationContainer>

                {/* <Login.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: "#1DD1A1",
                },
                headerTitle: props => (<LogoTitle {...props} />),
                headerTitleAlign: "center",
            }}>
            <Login.Screen name="LoginScreen" component={LoginScreen} />
            <Login.Screen name="RegisterScreen" component={RegisterScreen} />
            </Login.Navigator> */}

                <MainScreen.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: "#1DD1A1",
                    },
                    headerTitle: props => (<LogoTitle {...props} />),
                    headerTitleAlign: "center",
                }}>
                    <MainScreen.Screen name="MainTab" component={MainTabContainer} options={{ headerShown: false }} />
                    <MainScreen.Screen name="AuthScreen" component={AuthSceenContainer} />
                </MainScreen.Navigator>
            </NavigationContainer>
            <Message />
            <Loading />
            <DirectWebsite/>
        </>


    )
}

