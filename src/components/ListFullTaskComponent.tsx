import { View, Text, FlatList } from 'react-native'
import React, {memo} from 'react'
import { TaskModel } from '../models/TaskModel'
import Container from './Container'
import ItemTask from './ItemTask'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'



const ListFullTaskComponent = ({ navigation, route }: any) => {
    const { title, listTask }: { title: string, listTask: TaskModel[] } = route.params
    return (
        <Container back title={title}>
            <FlatList
                data={listTask}
                keyExtractor={(item, _) => _.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={(item) =>
                    <View key={item.index} style={{ width: '50%', paddingHorizontal: 10 }}>
                        <SpaceComponent width={5} />
                        <ItemTask item={item.item} navigation={navigation} />
                        <SpaceComponent width={5} />
                    </View>
                }
            />
        </Container>
    )
}

export default memo(ListFullTaskComponent)