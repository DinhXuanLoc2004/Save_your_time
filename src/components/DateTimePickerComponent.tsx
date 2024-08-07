import {View, Text, Modal, Button, Dimensions} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {colors} from '../constants/colors';
import {ArrowDown2} from 'iconsax-react-native';
import {globalStyles} from '../styles/globalStyles';
import SpaceComponent from './SpaceComponent';
import DatePicker from 'react-native-date-picker';
import ButtonComponent from './ButtonComponent';
import {fontFamilies} from '../constants/fontFamilies';
import { HandleDateTime } from '../utils/HandleDateTime';

interface Props {
  type?: 'date' | 'time' | 'datetime';
  title?: string;
  placeholder?: string;
  selected: Date;
  onSelect: (val: Date) => void;
  minDate?: Date;
}

const DateTimePickerComponent = (props: Props) => {
  const {selected, onSelect, placeholder, title, type, minDate} = props;
  const [isVisibleModalDateTime, setIsVisibleModalDateTime] = useState(false);
  const DateSelected = HandleDateTime.GetHourDate(Number(selected))
  const [date, setDate] = useState(DateSelected);
  const miniDate = new Date();
  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <TitleComponent text={title} size={16} />}
        <RowComponent
          onPress={() => setIsVisibleModalDateTime(true)}
          styles={[
            globalStyles.inputContainer,
            {
              marginTop: title ? 8 : 0,
              paddingVertical: 16,
              justifyContent: 'space-between',
            },
          ]}>
          <TextComponent
            flex={1}
            text={
              DateSelected
                ? type === 'time'
                  ? `${DateSelected.getHours()}:${DateSelected.getMinutes()}`
                  : `${DateSelected.getDate()}/${
                      DateSelected.getMonth() + 1
                    }/${DateSelected.getFullYear()}`
                : placeholder
                ? placeholder
                : ''
            }
            color={DateSelected ? colors.text : '#676767'}
          />
          <ArrowDown2 size={20} color={colors.text} />
        </RowComponent>
      </View>

      <Modal visible={isVisibleModalDateTime} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              margin: 20,
              width: '90%',
              backgroundColor: colors.white,
              borderRadius: 20,
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <View>
              <DatePicker
                mode={type ? type : 'datetime'}
                date={date}
                onDateChange={val => setDate(val)}
                locale="vi"
                textColor={colors.bgColor}
                theme="light"
                minimumDate={type === 'time' ? minDate : miniDate}
              />
            </View>
            <SpaceComponent height={20} />
            <View style={{paddingHorizontal: 20, width: '100%'}}>
              <ButtonComponent
                text="Chọn"
                onPress={() => {
                  onSelect(date);
                  setIsVisibleModalDateTime(false);
                }}
                color={colors.green}
                padding={10}
                font={fontFamilies.semiBold}
              />
              <SpaceComponent height={10} />
              <ButtonComponent
                text="Thoát"
                onPress={() => {
                  setIsVisibleModalDateTime(false);
                }}
                color={colors.gray2}
                padding={10}
                font={fontFamilies.semiBold}
              />
              <SpaceComponent height={10} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default memo(DateTimePickerComponent);
