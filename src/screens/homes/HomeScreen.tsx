import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  Add,
  Element4,
  Logout,
  Notification,
  SearchNormal1
} from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import CardComponent from '../../components/CardComponent';
import CicularComponent from '../../components/CicularComponent';
import Container from '../../components/Container';
import ListTaskComponent from '../../components/ListTaskComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceComponent from '../../components/SpaceComponent';
import TagComponent from '../../components/TagComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { TaskModel } from '../../models/TaskModel';
import { globalStyles } from '../../styles/globalStyles';
import { HandleDateTime } from '../../utils/HandleDateTime';
import { handleNotification } from '../../utils/handleNotification';

const HomeScreen = ({ navigation }: any) => {
  const user = auth().currentUser
  const handleSingout = async () => {
    await auth().signOut();
  };

  const [isLoading, setisLoading] = useState(false);
  const [dataTask, setdataTask] = useState<TaskModel[]>([]);
  const [listDoNot, setlistDoNot] = useState<TaskModel[]>([]);
  const [listDoing, setlistDoing] = useState<TaskModel[]>([]);
  const [listDone, setlistDone] = useState<TaskModel[]>([]);
  const [taskDoneToday, settaskDoneToday] = useState<TaskModel[]>([]);
  const [fullTaskToday, setFullTaskToday] = useState<TaskModel[]>([]);

  const today = Date.now()
  const date = new Date(today)

  const getNewTasks = async () => {
    setisLoading(true)
    firestore().collection('Tasks')
      .where('uids', 'array-contains', user?.uid)
      .onSnapshot(snap => {
        setisLoading(false);
        // if (snap !== null) {
        if (snap.empty) {
          console.log('Tasks not found');
          setdataTask([])
        } else {
          // snap.query.orderBy('dueDate', 'asc')
          const items: TaskModel[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data()
            })
          }
          );
          setdataTask(items.reverse());
        }
      })
  }

  useEffect(() => {
    getNewTasks()
    handleNotification.checkNotificationPermission()
  }, []);


  useEffect(() => {
    if (dataTask.length > 0) {
      setlistDoNot(dataTask.filter((item) => item.progress === 0))
      setlistDoing(dataTask.filter((item) => item.progress > 0 && item.progress < 1))
      setlistDone(dataTask.filter((item) => item.progress === 1))     
    }
  }, [dataTask]);
  return (
    <View style={{ flex: 1 }}>
      <Container isScroll styles={{ marginBottom: 60 }}>
        <SectionComponent>
          <RowComponent justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <View
              style={{
                flex: 1,
              }}>
              <TextComponent text={`Xin chào, ${user?.email}`} />
              <TitleComponent text="Công việc ngay hôm nay" />
            </View>
            <TouchableOpacity onPress={handleSingout}>
              <Logout size={22} color="coral" />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent
            styles={[globalStyles.inputContainer, { justifyContent: 'space-between' }]}
            onPress={() => navigation.navigate('SearchScreen', {listTask: dataTask})}>
            <TextComponent color="#696B6F" text="Tìm kiếm" />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{ flex: 1 }}>
                <TitleComponent text="Tiến độ" />
                <TextComponent text={`${listDone.length}/${dataTask.length} đã hoàn thành`} />
                <SpaceComponent height={12} />
                <RowComponent justify="flex-start">
                  <TagComponent
                    text={HandleDateTime.MonthString(today)}
                    onPress={() => console.log('Say Hi!!!')}
                  />
                </RowComponent>
              </View>
              <View>
                <CicularComponent value={dataTask.length === 0 ? 0 : Math.floor((listDone.length / dataTask.length) * 100)} />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>


        {
          isLoading
            ? <ActivityIndicator />
            : dataTask.length > 0
              ? <SectionComponent>
                <View style={[globalStyles.listTaskStyle]}>
                  <RowComponent justify='space-between'>
                    <TitleComponent text='Chưa làm' />
                    <TitleComponent text={`${listDoNot.length}`} />
                  </RowComponent>
                  <SpaceComponent height={10} />
                  <ListTaskComponent listTasks={listDoNot} navigation={navigation} />
                  {
                    listDoNot.length > 4 &&
                    <RowComponent justify='flex-start' onPress={() => {
                      navigation.navigate('ListFullTask', { listTask: listDoNot, title: 'Công việc chưa làm' })
                    }}>
                      <TextComponent text='Xem thêm...' size={16} color={colors.blue} font={fontFamilies.semiBold} />
                    </RowComponent>
                  }
                </View>

                <SpaceComponent height={10} />

                <View style={[globalStyles.listTaskStyle]}>
                  <RowComponent justify='space-between'>
                    <TitleComponent text='Đang làm' />
                    <TitleComponent text={`${listDoing.length}`} />
                  </RowComponent>
                  <SpaceComponent height={10} />
                  <ListTaskComponent listTasks={listDoing} navigation={navigation} />
                  {
                    listDoing.length > 4 &&
                    <RowComponent justify='flex-start'
                      onPress={() => {
                        navigation.navigate('ListFullTask', { listTask: listDoing, title: 'Công việc đang làm' })
                      }}>
                      <TextComponent text='Xem thêm...' size={16} color={colors.blue} font={fontFamilies.semiBold} />
                    </RowComponent>
                  }
                </View>

                <SpaceComponent height={10} />

                <View style={[globalStyles.listTaskStyle]}>
                  <RowComponent justify='space-between'>
                    <TitleComponent text='Đã xong' />
                    <TitleComponent text={`${listDone.length}`} />
                  </RowComponent>
                  <SpaceComponent height={10} />
                  <ListTaskComponent listTasks={listDone} navigation={navigation} />
                  {
                    listDone.length > 4 &&
                    <RowComponent justify='flex-start'
                      onPress={() => {
                        navigation.navigate('ListFullTask', { listTask: listDone, title: 'Công việc đã xong' })
                      }}>
                      <TextComponent text='Xem thêm...' size={16} color={colors.blue} font={fontFamilies.semiBold} />
                    </RowComponent>
                  }
                </View>
              </SectionComponent>
              : <></>
        }

      </Container>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('AddNewTask', { Id_user: user?.uid, editAble: true, isAdd: true })}
          style={[
            globalStyles.row,
            {
              backgroundColor: colors.blue,
              padding: 10,
              borderRadius: 12,
              paddingVertical: 14,
              width: '80%',
              alignItems: 'center'
            },
          ]}>
          <TextComponent text="Thêm công việc" flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
