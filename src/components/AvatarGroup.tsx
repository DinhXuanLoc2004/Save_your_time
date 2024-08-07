import React, { Fragment, useEffect, useState, memo } from 'react';
import RowComponent from './RowComponent';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { globalStyles } from '../styles/globalStyles';
import { fontFamilies } from '../constants/fontFamilies';
import firestore from '@react-native-firebase/firestore';
import { getRandomColor } from '../utils/CalcFileSize';

interface Props {
  uids?: string[]
}

const AvatarGroup = (props: Props) => {
  const { uids } = props
  // console.log('uids::',uids)
  
  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.white,
  };

  const [usersName, setUsersName] = useState<any[]>([]);

  useEffect(() => {
    getUserNameOrAvatar()
  }, [uids]);

  const getUserNameOrAvatar = async () => {
    let items: any = []
    if (uids) {
      for (const id of uids) {
        await firestore().doc(`Users/${id}`).get().then((snap: any) => {
          if (snap.exists) {
            const data = {
              displayName: snap.data().displayName,
              avatar: snap.data().avatar ?? '',
              color: snap.data().color ?? getRandomColor()
            }
            items.push(data)
          }
        }).catch(error => console.log('getUserNameOrAvatar::', error))
      }
    }
    setUsersName(items)
  }

  


  return (
    <RowComponent styles={{ justifyContent: 'flex-start' }}>
      {usersName.map(
        (item, index) => {
          return index < 3 && (
            <Fragment key={index}>
              {
                item.avatar !== '' ?
                  <Image
                    source={{ uri: item.avatar }}
                    key={`image${index}`}
                    style={[imageStyle, { marginLeft: index > 0 ? -10 : 0 }]}
                  />
                  : <View style={[
                    imageStyle,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: index > 0 ? -10 : 0,
                      backgroundColor: item.color
                    }]}>
                    <TextComponent flex={0} text={item?.displayName?.charAt(0).toUpperCase()} size={15} font={fontFamilies.bold} color={colors.white} />
                  </View>
              }
            </Fragment>
          )
        }
      )}

      {usersName.length > 3 && (
        <View
          style={[
            imageStyle,
            {
              backgroundColor: 'coral',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              marginLeft: -10,
            },
          ]}>
          <TextComponent
            flex={0}
            styles={{
              lineHeight: 19,
            }}
            font={fontFamilies.semiBold}
            text={`+${usersName.length - 3 > 9 ? 9 : usersName.length - 3}`}
          />
        </View>
      )}
    </RowComponent>
  );
};

export default memo(AvatarGroup);
