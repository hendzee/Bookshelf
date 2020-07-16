import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { generalSty, GREY, WHITE } from '../../styles';

const StepIndicator = () => {
    const data = [
        {
        info: 'WAITING',
        subInfo: '10 Juli, 2020',
        active: true,
        },
        {
            info: 'APPOINTMENT',
            subInfo: '10 Juli, 2020',
            active: false
        },
        {
            info: 'BORROW',
            subInfo: '10 Juli, 2020',
            active: false
        },
        {
            info: 'RETURN',
            subInfo: '10 Juli, 2020',
            active: false
        },
    ];

    const setStrip = (isPut, active) => {
        if (isPut) {
            return(
                <Layout style={ styles.stripContainer }>
                    <Layout style={ active ? styles.ActiveStripBox : styles.stripBox }>
                    </Layout>
                </Layout>
            );
        }

        return null;
    }

    const smallGroup = (index, size, info, subInfo, active) => {
        return (
            <Layout style={ styles.mainContainer }>
                <Layout style={ styles.stepContainer }>
                    <Layout>
                        <Layout style={ active ?  styles.ActiveIndicatorBox : styles.indicatorBox }>
                            <Text style={ active ? styles.ActiveIndex : styles.index }>
                                { index }
                            </Text>
                        </Layout>
                        { setStrip(size > index, active) }
                    </Layout>
                    <Layout style={ styles.infoContainer }>
                        <Text style={ styles.infoText }>
                            { info }
                        </Text>
                        <Text style={ styles.subInfoText }>
                            { subInfo }
                        </Text>
                    </Layout>
                </Layout>
            </Layout>
        );
    }

    const setContent = () => {
        let wholeContent = [];

        for(let i=0; i<data.length; i++){
            wholeContent.push(
                smallGroup(i+1, data.length, data[i].info, data[i].subInfo, data[i].active)
            )
        }

        return wholeContent;
    }

    return (
        <Layout>
            { setContent() }
        </Layout>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        flexDirection: 'row'
    },
    stripContainer: {
        flex: 1,
        width: 30,
        alignItems: 'center',
    },
    stripBox: {
        flex: 1,
        width: 3,
        ...generalSty.sofyGreyBackground
    },
    ActiveStripBox: {
        flex: 1,
        width: 3,
        ...generalSty.primaryBackground
    },
    indicatorBox: {
        ...generalSty.mmRight,
        ...generalSty.greyBorder,
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    ActiveIndicatorBox: {
        ...generalSty.mmRight,
        ...generalSty.primaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    infoContainer: {
        paddingBottom: 50
    },
    index: {
        ...generalSty.smallText
    },
    ActiveIndex: {
        ...generalSty.smallText,
        color: WHITE
    },
    infoText: {
        fontWeight: 'bold'
    },
    subInfoText: {
        color: GREY
    }
})

export { StepIndicator };