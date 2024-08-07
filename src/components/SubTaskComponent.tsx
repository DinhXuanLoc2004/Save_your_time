import {View, Text, TouchableOpacity, Modal, Alert} from 'react-native';
import React, {useState} from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {
  Add,
  AddCircle,
  AddSquare,
  CloseSquare,
  Edit,
  Record,
  TickCircle,
} from 'iconsax-react-native';
import {colors} from '../constants/colors';
import {SubTask} from '../models/TaskModel';
import TitleComponent from './TitleComponent';
import SpaceComponent from './SpaceComponent';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import firestore from '@react-native-firebase/firestore';
import {handleTextInput} from '../utils/handleTextInput';

interface Props {
  onSave: (listSubTask: SubTask[]) => void;
  listSubTask: SubTask[];
  isUpdate: boolean;
  idTask?: string;
  isEdit?: boolean;
  isAdd?: boolean;
}

const SubTaskComponent = (props: Props) => {
  const {onSave, listSubTask, isUpdate, idTask, isEdit, isAdd} = props;
  const [isVisible, setisVisible] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [listSubTaskLocal, setlistSubTaskLocal] = useState<SubTask[]>([]);
  const [isUpdateLocal, setisUpdateLocal] = useState<boolean>(false);
  const [index, setindex] = useState<number>(-1);
  const [isLoading, setisLoading] = useState(false);
  const [idSubTask, setidSubTask] = useState<string>('');
  const [errTilte, seterrTilte] = useState<string>('');
  const [errDscription, seterrDscription] = useState<string>('');
  const COLLECTION = 'SubTasks';

  const handleSaveSubTask = async () => {
    const subTask = {
      title: title,
      description: description,
    };
    if (handleTextInput.handleTextEmlty(subTask.title)) {
      seterrTilte('Vui lòng điền tiêu đề công việc phụ!');
    }
    if (handleTextInput.handleTextEmlty(subTask.description)) {
      seterrDscription('Vui lòng điền mô tả công việc phụ!');
    }
    if (
      !handleTextInput.handleTextEmlty(subTask.title) &&
      !handleTextInput.handleTextEmlty(subTask.description)
    ) {
      if (idTask !== '' && idTask !== undefined) {
        const data = {
          ...subTask,
          idTask: idTask,
        };
        setisLoading(true);
        if (isUpdate) {
          if (isUpdateLocal) {
            if (idSubTask !== '') {
              await firestore()
                .collection(COLLECTION)
                .doc(idSubTask)
                .update({...data, updateAt: Date.now()})
                .then(snap => {
                  console.log('Update SubTask Success::', snap);
                  // const list: any = [
                  //     ...listSubTask,
                  //     { ...data, updateAt: Date.now() }
                  // ]
                  // onSave(list)
                  setisLoading(false);
                  setisVisible(false);
                  setTitle('');
                  setDescription('');
                  setisUpdateLocal(false);
                })
                .catch(error =>
                  console.log('handleSaveSubTask Error In Line 51::', error),
                );
            }
          } else {
            await firestore()
              .collection(COLLECTION)
              .add({...data, isCompleted: false, createAt: Date.now()})
              .then(snap => {
                // const list: any = [
                //     ...listSubTask,
                //     { ...data, createAt: Date.now(), id: snap.id }
                // ]
                // onSave(list)
                setisLoading(false);
                setisVisible(false);
                setTitle('');
                setDescription('');
                setisUpdateLocal(false);
              })
              .catch(error => console.log('handleSaveSubTask Error::', error));
          }
        }
      } else {
        if (isUpdateLocal) {
          const list: any = [...listSubTask];
          if (index > -1) {
            list[index] = subTask;
            // console.log('list::', list)
            onSave(list);
            setisVisible(false);
            setTitle('');
            setDescription('');
          }
        } else {
          const list: any = [...listSubTask];
          list.push(subTask);
          onSave(list);
          setlistSubTaskLocal(list);
          setisVisible(false);
          setTitle('');
          setDescription('');
        }
      }
    }
  };

  const handleDeleteSubTask = (item: SubTask, index: number) => {
    if (listSubTask) {
      Alert.alert('Xác nhận', `Bạn có muốn xóa công việc phụ ${item.title}?`, [
        {
          text: 'Thoát',
          style: 'cancel',
          onPress: () => console.log('Cancel'),
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            const list = [...listSubTask];
            list.splice(index, 1);
            onSave(list);
            if (isUpdate && item.id !== undefined) {
              await firestore().collection(COLLECTION).doc(item.id).delete();
            }
          },
        },
      ]);
    }
  };

  const handleUpdateSubTask = (item: SubTask, index: number) => {
    if (listSubTask) {
      setidSubTask(item.id ?? '');
      setTitle(item.title);
      setDescription(item.description);
      setindex(index);
      setisVisible(true);
      setisUpdateLocal(true);
    }
  };

  const handleChangeComplete = async (item: SubTask) => {
    if (isUpdate) {
      const changeComplete = !item.isCompleted;
      const data = {
        title: item.title,
        description: item.description,
        isCompleted: changeComplete,
        updateAt: Date.now(),
      };
      await firestore()
        .collection(COLLECTION)
        .doc(item.id)
        .update(data)
        .then(documentRef => {
          console.log('Update Complete Success::', data);
        })
        .catch(error => console.log('error::', error));
    }
  };

  return (
    <View>
      <RowComponent justify="space-between" styles={{alignItems: 'center'}}>
        <TextComponent
          text="Công việc phụ"
          size={16}
          font={fontFamilies.semiBold}
        />
        {isEdit ? (
          <TouchableOpacity onPress={() => setisVisible(true)}>
            <AddSquare size={25} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </RowComponent>
      <SpaceComponent height={10} />

      {listSubTask.length > 0 &&
        listSubTask.map((item, index) => (
          <RowComponent
            key={index}
            styles={{
              backgroundColor: colors.gray,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
            }}
            justify="space-between">
            <RowComponent justify="flex-start">
              <TouchableOpacity
                disabled={isEdit ? true : isUpdate ? false : true}
                onPress={() => handleChangeComplete(item)}>
                {item.isCompleted ? (
                  <TickCircle size={22} color={colors.success} variant="Bold" />
                ) : (
                  <Record size={22} color={colors.white} />
                )}
              </TouchableOpacity>

              <SpaceComponent width={10} />
              <View>
                <TextComponent
                  text={item.title}
                  font={fontFamilies.semiBold}
                  line={1}
                  size={20}
                />
                <TextComponent text={item.description} line={1} />
              </View>
            </RowComponent>

            {isEdit ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteSubTask(item, index);
                  }}>
                  <CloseSquare size={20} color="red" />
                </TouchableOpacity>
                <SpaceComponent height={5} />
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateSubTask(item, index);
                  }}>
                  <Edit size={20} color="blue" />
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
          </RowComponent>
        ))}

      <Modal visible={isVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: `${colors.gray}A1`,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              padding: 12,
              borderRadius: 10,
              backgroundColor: colors.bgColor,
              width: '100%',
            }}>
            <TitleComponent
              text={
                isUpdateLocal ? 'Chỉnh sửa công việc phụ' : 'Thêm công việc phụ'
              }
              font={fontFamilies.bold}
              flex={1}
              styles={{textAlign: 'center'}}
            />
            <SpaceComponent height={20} />
            <InputComponent
              value={title}
              onChange={val => setTitle(val)}
              placeholder="Tiêu đề"
              allowClear
              title="Tiêu đề"
              height={25}
              messageError={errTilte}
            />
            <SpaceComponent height={10} />
            <InputComponent
              value={description}
              onChange={val => setDescription(val)}
              placeholder="Mô tả"
              allowClear
              title="Mô tả"
              height={50}
              messageError={errDscription}
            />

            <SpaceComponent height={10} />

            <RowComponent justify="space-between">
              <ButtonComponent
                text="Thoát"
                colorText={colors.blue}
                color={colors.white}
                font={fontFamilies.bold}
                onPress={() => {
                  setisVisible(false);
                  setTitle('');
                  setDescription('');
                }}
                style={{width: 0, flex: 1}}
              />
              <SpaceComponent width={10} />
              <ButtonComponent
                text="Thêm"
                colorText={colors.white}
                color={colors.blue}
                font={fontFamilies.bold}
                onPress={() => {
                  handleSaveSubTask();
                }}
                style={{width: 0, flex: 1}}
                isLoading={isLoading}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SubTaskComponent;
