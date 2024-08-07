import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { err } from 'react-native-svg';

const user = auth().currentUser

export class handleNotification {

    static SendNotification = async ({
        memberId,
        title,
        body,
        taskId
    }: {
        memberId: string,
        title: string,
        body: string,
        taskId: string
    }) => {
        try {
            const member: any = firestore().doc(`Users/${memberId}`).get()
            if (member && member.data().tokens) {

            }
        } catch (error) {
            console.log(error)
        }
    }

    static checkNotificationPermission = async () => {
        const authStatus = await messaging().requestPermission()

        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
            this.getFcmToken()
        }
    }

    static getFcmToken = async () => {
        const fcmTokenLocal = await AsyncStorage.getItem('fcmToken')
        if (!fcmTokenLocal) {
            const fcmToken = await messaging().getToken()

            console.log('fcmToken::', fcmToken)
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken)
                this.UpdateTokenFirestore(fcmToken)
            }
        }
    }

    static UpdateTokenFirestore = async (fcmToken: string) => {
        await firestore().doc(`Users/${user?.uid}`).get().then(snap => {
            if (snap.exists) {
                const data: any = snap.data()


                if (!data.tokens || !data.tokens.includes(fcmToken)) {
                    firestore().doc(`Users/${user?.uid}`).update({
                        tokens: firestore.FieldValue.arrayUnion(fcmToken)
                    })
                }
            }
        })
    }
}