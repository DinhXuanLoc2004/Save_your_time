import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Attachment } from '../models/TaskModel'
import { DocumentUpload } from 'iconsax-react-native'
import { colors } from '../constants/colors'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import { globalStyles } from '../styles/globalStyles'
import TitleComponent from './TitleComponent'
import SpaceComponent from './SpaceComponent'
import TextComponent from './TextComponent'
import { CalcFileSize } from '../utils/CalcFileSize'
import { fontFamilies } from '../constants/fontFamilies'
import { Slider } from '@miblanchard/react-native-slider'
import RowComponent from './RowComponent'
import storage from '@react-native-firebase/storage';

interface Props {
    onUpload: (file: Attachment) => void
}

const UploadFileComponent = (props: Props) => {
    const [file, setfile] = useState<DocumentPickerResponse>();
    const [isVisibleModalUpload, setisVisibleModalUpload] = useState(false);
    const [progressUpload, setprogressUpload] = useState<number>(0);
    const [attachmentFile, setattachmentFile] = useState<Attachment>();

    useEffect(() => {
        file && handleUploadFileToStorage()
    }, [file]);

    useEffect(() => {
        if (attachmentFile) {
            onUpload(attachmentFile)
            setisVisibleModalUpload(false)
        }
    }, [attachmentFile]);

    const handleUploadFileToStorage =  () => {
        setisVisibleModalUpload(true)
        const filename = file?.name ?? `file${Date.now()}`
        const path = `documents/${filename}`
        const res = storage().ref(path).putFile(file?.fileCopyUri)

        res.on('state_changed', task => {
            setprogressUpload(task.bytesTransferred/task.totalBytes)
        })

        res.then(() => {
            storage().ref(path).getDownloadURL().then(url => {
               const data: Attachment = {
                   name: file?.name ?? '',
                   url: url,
                   size: file?.size ?? 0
               }
               setattachmentFile(data)
           }).catch(error => console.log('error::',error))
        })

        res.catch(error => console.log('handleUploadFileToStorage::', error))

    }

    const { onUpload } = props
    return (
        <>
            <TouchableOpacity onPress={async () => {
                await DocumentPicker.pick({
                    allowMultiSelection: false,
                    type: [DocumentPicker.types.images],
                    copyTo: 'cachesDirectory'
                }).then(res => {
                    setfile(res[0])
                }).catch(error => console.log('Pick Error::',error))
            }}>
                <DocumentUpload size={24} color={colors.white} />
            </TouchableOpacity>

            <Modal
                visible={isVisibleModalUpload}
                animationType='slide'
                style={{ flex: 1 }}
                transparent
                statusBarTranslucent>
                <View style={[
                    globalStyles.container,
                    {
                        backgroundColor: `${colors.gray}A1`,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20
                    }
                ]}>
                    <View style={{
                        width: '100%',
                        height: 'auto',
                        padding: 12,
                        backgroundColor: 'white',
                        borderRadius: 12
                    }}>
                        <TitleComponent text='Đang tải...' flex={0} color={colors.bgColor} />

                        <SpaceComponent height={20} />

                        <TextComponent text={file?.name ?? ''} color={colors.bgColor} font={fontFamilies.medium} />
                        <TextComponent text={`${CalcFileSize(file?.size as number)}`} color={colors.gray2} font={fontFamilies.medium} />
                        <RowComponent justify='space-between'>
                            <View style={{ flex: 1 }}>
                                <Slider
                                    value={progressUpload}
                                    renderThumbComponent={() => null}
                                    trackStyle={{
                                        height: 6,
                                        borderRadius: 100
                                    }}
                                    minimumTrackTintColor={colors.success}
                                    maximumTrackTintColor={colors.desc}
                                />
                            </View>
                            <SpaceComponent width={10} />
                            <TextComponent text={`${Math.floor(progressUpload * 100)}%`} color={colors.bgColor} font={fontFamilies.semiBold} />
                        </RowComponent>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default UploadFileComponent