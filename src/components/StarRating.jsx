import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../styles/globalStyles'

const StarRating = () => {
    const [selectedValue, setselectedValue] = useState(0);

    const handleValue = (value) => {
        setselectedValue(value)
    }
    return (
        <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={styles.containerStar}>
                {
                    [1, 2, 3, 4, 5].map((value) => (
                        <TouchableOpacity
                            key={value}
                            style={[
                                styles.star,
                                value <= selectedValue ? styles.starSelected : null
                            ]}
                            onPress={() => handleValue(value)}
                        >
                            <Text style={styles.starText}>★</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}

export default StarRating

const styles = StyleSheet.create({
    starSelected: {
        backgroundColor: 'yellow'
    },
    starText: {
        fontSize: 40
    },
    star: {
        margin: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'transparent',
        // transform: [{ rotate: '0deg' }]
    },
    containerStar: {
        flexDirection: 'row',
        // transform: [{ scale: 0.15 }, { rotate: '180deg' }],
        justifyContent: 'center',
        alignItems: 'center'
    }
})