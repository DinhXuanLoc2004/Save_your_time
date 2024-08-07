import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import SpaceComponent from "./SpaceComponent"
import CardImageConponent from "./CardImageConponent"
import { colors } from "../constants/colors"
import { globalStyles } from "../styles/globalStyles"
import { TaskModel } from "../models/TaskModel"
import TitleComponent from "./TitleComponent"
import TextComponent from "./TextComponent"
import AvatarGroup from "./AvatarGroup"
import ProgressBarComponent from "./ProgressBarComponent"
import { CalendarEdit, Clock, Edit2 } from "iconsax-react-native"
import { memo } from "react"
import { getRandomColor, getRandomColorRGBA } from "../utils/CalcFileSize"
import RowComponent from "./RowComponent"
import { HandleDateTime } from "../utils/HandleDateTime"

const ItemTask = ({ item, navigation, style }: { item: TaskModel, navigation: any, style?: StyleProp<ViewStyle> }) => {
    const color = getRandomColorRGBA()
    console.log('item::',HandleDateTime.GetHourDate(Number(item.dueDate)))
    return (
        <View style={[{ width: 'auto' }, style]}>
            <SpaceComponent height={5} />
            <CardImageConponent
                color={item.color ?? color}
                onPress={() => {
                    navigation.navigate('TaskDetail', { id: item.id, color: item.color ?? color })
                }}
                styles={{ borderRadius: 12 }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('AddNewTask', { editAble: true, id: item.id }) }}
                    style={globalStyles.iconContainer}>
                    <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text={item.title} />
                <TextComponent text={item.desctiption} size={13} line={3} />

                <View style={{ marginVertical: 10 }}>
                    {item.uids && <AvatarGroup uids={item.uids} />}
                    {item.progress.toString() &&
                        <ProgressBarComponent
                            percent={`${Math.floor(item.progress * 100)} %`}
                            color="#0AACFF"
                            size="large"
                        />
                    }
                </View>

                <RowComponent styles={{ flex: 1, marginRight: 12 }} justify='flex-start'>
                    <Clock size={18} color={colors.white} />
                    <SpaceComponent width={8} />
                    <TextComponent text={`${HandleDateTime.GetHour(item.start?.toDate())} - ${HandleDateTime.GetHour(item.end?.toDate())}`} />
                </RowComponent>
                <SpaceComponent height={5} />
                <RowComponent styles={{ flex: 1 }} justify='flex-start'>
                    <CalendarEdit size={18} color={colors.white} />
                    <SpaceComponent width={8} />
                    <TextComponent text={`${HandleDateTime.DateString1(item.dueDate.toDate())}`} />
                </RowComponent>
            </CardImageConponent>
            <SpaceComponent height={5} />
        </View>
    )
}

export default memo(ItemTask)