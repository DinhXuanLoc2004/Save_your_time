import { View, Text, FlatList, TouchableOpacity, Task } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { TaskModel } from '../models/TaskModel';
import ListFullTaskComponent from '../components/ListFullTaskComponent';
import ListTaskComponent from '../components/ListTaskComponent';
import TitleComponent from '../components/TitleComponent';
import TextComponent from '../components/TextComponent';
import InputComponent from '../components/InputComponent';
import { SearchNormal1 } from 'iconsax-react-native';
import { colors } from '../constants/colors';
import SectionComponent from '../components/SectionComponent';
import RowComponent from '../components/RowComponent';
import { fontFamilies } from '../constants/fontFamilies';
import { replaceKey } from '../utils/replaceKey';

const SearchScreen = ({ navigation, route }: any) => {
  const { listTask }: { listTask: TaskModel[] } = route.params
  const [key, setkey] = useState<string>('');
  const [results, setresults] = useState<TaskModel[]>([]);

  useEffect(() => {
    if (!key) {
      setresults([])
    } else {
      const items = listTask.filter(item => 
        replaceKey(item.title).toLocaleLowerCase().includes(replaceKey(key).toLocaleLowerCase()) ||
        replaceKey(item.desctiption).toLocaleLowerCase().includes(replaceKey(key).toLocaleLowerCase())
      )

      setresults(items)
    }
  }, [key]);

  /**
   tiếng việt
   */
  return (
    <Container back title='Tìm công việc'>
      <InputComponent
        value={key}
        onChange={val => setkey(val)}
        height={20}
        prefix={
          <SearchNormal1 size={20} color={colors.gray2} />
        }
        allowClear
        placeholder='Tìm kiếm...'
        style={{
          paddingHorizontal: 20
        }}
      />
      <FlatList
      ListEmptyComponent={
        <RowComponent>
          <TextComponent text='Không tìm thấy công việc' color='red' font={fontFamilies.semiBold}/>
        </RowComponent>
      }
        data={key ? results : listTask}
        keyExtractor={(item, _) => _.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginBottom: 24,
              paddingHorizontal: 20
            }}
            onPress={() =>
              navigation.navigate('TaskDetail', {
                id: item.id,
                color: item.color
              })
            }
          >
            <TitleComponent text={item.title} />
            <TextComponent text={item.desctiption} line={2} />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default SearchScreen;
