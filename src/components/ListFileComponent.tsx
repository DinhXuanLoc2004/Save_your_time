import { View, Text, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { Attachment } from '../models/TaskModel'
import { colors } from '../constants/colors'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { fontFamilies } from '../constants/fontFamilies'
import { CalcFileSize } from '../utils/CalcFileSize'
import { CloseCircle, CloseSquare } from 'iconsax-react-native'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    list: Attachment[],
    onChange: (list: Attachment[]) => void,
    isEdit?: boolean
}

const ListFileComponent = (props: Props) => {
    const { list, onChange, isEdit } = props
    const [isVisible, setisVisible] = useState(false);
    const [url, seturl] = useState<string>('');

    const removeFile = (index: number) => {
        if (list) {
            list.splice(index, 1)
            onChange(list)
        }
    }

    const handleClickFile = (url: string) => {
        setisVisible(true)
        seturl(url)
    }

    const handleCanle = () => {
        setisVisible(false)
    }

    return (
        <>
            {
                list.length > 0 ?
                    <>
                        <View style={{ padding: 12, borderRadius: 10, backgroundColor: colors.gray }}>
                            {
                                list.map((item, index) =>
                                    <RowComponent
                                        onPress={() => handleClickFile(item.url)}
                                        justify='space-between'
                                        key={index}
                                        styles={{
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: colors.gray2,
                                            padding: 5,
                                            marginBottom: 5,
                                            marginTop: 5
                                        }}>
                                        <View>
                                            <TextComponent text={item.name} font={fontFamilies.semiBold} />
                                            <TextComponent text={CalcFileSize(item.size)} font={fontFamilies.medium} />
                                        </View>

                                        {
                                            isEdit &&
                                            <TouchableOpacity onPress={() => removeFile(index)}>
                                                <CloseCircle size={18} color={colors.white} />
                                            </TouchableOpacity>
                                        }
                                    </RowComponent>)
                            }
                        </View>
                        <Modal
                            visible={isVisible}
                            animationType='slide'
                            transparent
                        // statusBarTranslucent
                        >
                            <View style={[
                                globalStyles.container,
                                {
                                    backgroundColor: `${colors.gray}A1`,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 20
                                }
                            ]}>
                                {
                                    url !== '' && <View style={{ width: '100%', height: '100%', }}>
                                        <Image source={{ uri: url }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                        <TouchableOpacity
                                            onPress={() => handleCanle()}
                                            style={{ position: 'absolute', right: -12, top: -12 }}>
                                            <CloseSquare size={40} color='red' variant='Bold' />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </Modal>
                    </>
                    : <></>
            }
        </>
    )
}

export default ListFileComponent