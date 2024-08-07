import { View, Text, TouchableOpacity, FlatList, Task } from 'react-native'
import React, { memo } from 'react'
import { TaskModel } from '../models/TaskModel'
import CardImageConponent from './CardImageConponent'
import { useNavigation } from '@react-navigation/native'
import { Edit2 } from 'iconsax-react-native'
import { globalStyles } from '../styles/globalStyles'
import { colors } from '../constants/colors'
import TitleComponent from './TitleComponent'
import AvatarGroup from './AvatarGroup'
import ProgressBarComponent from './ProgressBarComponent'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'
import TextComponent from './TextComponent'
import ItemTask from './ItemTask'

interface Props {
    listTasks: TaskModel[],
    navigation: any
}



const ListTaskComponent = (props: Props) => {
    const { listTasks, navigation } = props;
    const firstFourItems = listTasks.slice(0, 4);

    // Chia danh sách thành các hàng, mỗi hàng chứa 2 mục
    const rows = firstFourItems.reduce((acc: any, item: any, index: number) => {
        if (index % 2 === 0) {
            acc.push([item]);
        } else {
            acc[acc.length - 1].push(item);
        }
        return acc;
    }, []);

    return (
        <>
            {rows.map((row: any, rowIndex: number) => (
                <View key={rowIndex} style={
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginVertical: 5, // Khoảng cách giữa các hàng
                        width: row.length === 1 ? '50%' : '100%',
                    }
                }>
                    {row.map((item: any, colIndex: number) => (
                        <ItemTask 
                        item={item} 
                        navigation={navigation} 
                        key={colIndex} 
                        style={{flex: 1, marginHorizontal: 5}}
                        />
                    ))}
                </View>
            ))}
        </>
    );
};

export default memo(ListTaskComponent)