import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { getRandomColor } from "./CalcFileSize";

export class handleUser {
    static SaveUserToDataBase = async (user: FirebaseAuthTypes.User) => {
        const data = {
            email: user.email ?? '',
            displayName: user.displayName ?? user.email?.split('@')[0],
            color: getRandomColor()
        }

        await firestore().doc(`Users/${user.uid}`)
        .set(data).then(() => {
            console.log('Add user to firestore success!');
        }).catch(error => console.log('SaveUserToDataBase Error::',error))
    }
}