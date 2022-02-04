import React, {useContext, useEffect} from 'react'
import { Container, LoadingIcon } from './styles'
import {AsyncStorage} from "react-native";
import {useNavigation} from "@react-navigation/native";

import Api from '../../Api'

import BarberLogo from '../../assets/barber.svg'
import { UserContext} from "../../contexts/UserContext";

export default () => {
    const {dispatch: userDispatch} = useContext(UserContext);

    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')
            if (token) {
                let res = await Api.checkToken(token)
                if (res.token) {
                    await asyncStorage.setItem('token', res.token)


                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: res.data.avatar
                        }
                    })

                    navigation.reset({
                        routes: [{name: 'MainTab'}]
                    })
                } else {
                    navigation.navigate('SignIn')
                }
            } else {
                navigation.navigate('SignIn')
            }
        }
        checkToken()
    }, [])

    return (
        <Container>
            <BarberLogo width="100%" height="160"/>
            <LoadingIcon size="large" color="#FFFFFF"/>
        </Container>
    )
}