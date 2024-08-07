import {
  View,
  Text,
  Modal,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SelectModel} from '../models/SelectModel';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import {globalStyles} from '../styles/globalStyles';
import TextComponent from './TextComponent';
import {colors} from '../constants/colors';
import {
  ArrowDown2,
  CloseCircle,
  SearchNormal1,
  TickCircle,
} from 'iconsax-react-native';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import InputComponent from './InputComponent';

interface Props {
  title?: string;
  items: SelectModel[];
  selected?: string[];
  onSelect: (val: string[]) => void;
  multible?: boolean;
  size?: number;
  font?: string;
  isEdit?: boolean;
}

const DropDownPicker = (props: Props) => {
  const {title, items, selected, onSelect, multible, size, font, isEdit} =
    props;

  const [isVisible, setisVisible] = useState(false);
  const [key, setkey] = useState('');
  const [results, setresults] = useState<SelectModel[]>([]);
  const [dataSelected, setdataSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!key) {
      setresults([]);
    } else {
      const data = items.filter(item =>
        item.label.toLowerCase().includes(key.toLowerCase()),
      );
      setresults(data);
    }
  }, [key]);

  useEffect(() => {
    selected && setdataSelected(selected);
    console.log(selected);
  }, [isVisible, selected]);

  const handelSelectItem = (id: string) => {
    if (multible) {
      const data = [...dataSelected];
      const index = data.findIndex(item => item === id);
      if (index !== -1) {
        data.splice(index, 1);
      } else {
        data.push(id);
      }
      setdataSelected(data);
    } else {
      setdataSelected([id]);
    }
  };

  const handleConfirmSelect = () => {
    console.log('dataSelect::', dataSelected);
    onSelect(dataSelected);
    setisVisible(false);
    setdataSelected([]);
  };

  const handleRemoveItem = (index: number) => {
    if (selected) {
      const list: any = [...selected];
      list.splice(index, 1);
      onSelect(list);
    }
  };

  const renderItemSelect = (id: string, index: number) => {
    const members = items.find(item => item.value == id);

    return (
      members && (
        <RowComponent
          key={id}
          styles={{
            marginRight: 8,
            padding: 4,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: colors.gray2,
            marginBottom: 8,
          }}>
          <TextComponent text={members.label} flex={0} />
          <SpaceComponent width={5} />
          {isEdit && (
            <TouchableOpacity onPress={() => handleRemoveItem(index)}>
              <CloseCircle size={14} color={colors.text} />
            </TouchableOpacity>
          )}
        </RowComponent>
      )
    );
  };

  return (
    <View>
      {title && <TitleComponent text={title} size={16} />}
      <RowComponent
        disabled={isEdit ? false : true}
        onPress={() => {
          setisVisible(true);
        }}
        styles={[
          globalStyles.inputContainer,
          {marginTop: title ? 8 : 0, paddingVertical: 16},
        ]}>
        <View style={{flex: 1, paddingRight: 12}}>
          {selected && selected.length > 0 ? (
            <RowComponent
              justify={isEdit ? 'flex-start' : 'center'}
              styles={{flexWrap: 'wrap'}}>
              {selected.map((id, index) => renderItemSelect(id, index))}
            </RowComponent>
          ) : (
            <TextComponent text="Select" color={colors.gray2} flex={0} />
          )}
        </View>
        {isEdit ? <ArrowDown2 size={20} color={colors.text} /> : <View />}
      </RowComponent>

      <Modal
        visible={isVisible}
        style={{flex: 1}}
        transparent
        animationType="slide"
        statusBarTranslucent>
        <SafeAreaView
          style={[
            globalStyles.container,
            {
              paddingHorizontal: 20,
            },
          ]}>

          <RowComponent styles={{alignItems: 'center'}}>
            <View style={{flex: 1, height: 'auto'}}>
              <SpaceComponent height={10} />
              <InputComponent
                value={key}
                onChange={val => setkey(val)}
                prefix={<SearchNormal1 size={20} color={colors.gray2} />}
                placeholder="Tìm kiếm..."
                allowClear
              />
            </View>
            <SpaceComponent width={7} />
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => setisVisible(false)}>
              <TextComponent text="Thoát" color="coral" />
            </TouchableOpacity>
          </RowComponent>

          <FlatList
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            data={key ? results : items}
            keyExtractor={(item, _) => _.toString()}
            renderItem={({item}) => (
              <RowComponent
                onPress={() => handelSelectItem(item.value)}
                styles={{paddingBottom: 16, justifyContent: 'space-between'}}>
                <TextComponent
                  size={16}
                  text={item.label}
                  color={
                    dataSelected.includes(item.value) ? 'coral' : colors.text
                  }
                />
                {dataSelected.includes(item.value) && (
                  <TickCircle size={22} color="coral" />
                )}
              </RowComponent>
            )}
          />

          <RowComponent
            styles={{
              position: 'absolute',
              bottom: 15,
              justifyContent: 'space-between',
            }}>
            <SpaceComponent width={10} />
            <ButtonComponent
              text="Xác nhận"
              onPress={() => handleConfirmSelect()}
            />
            <SpaceComponent width={10} />
          </RowComponent>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default DropDownPicker;
