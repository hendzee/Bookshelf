import { StyleSheet } from 'react-native';

const GREY = '#b2bec3';
const SOFT_GREY = '#dfe6e9';

const generalSty = StyleSheet.create({
    full: {
        flex: 1
    },

    mainContainer: {
        flex: 1,
        padding: 15
    },

    mmAll: {
        margin: 7
    },

    mmTop: {
        marginTop: 7
    },

    mmRight: {
        marginRight: 7
    },

    mmLeft: {
        marginLeft: 7
    },

    mmBottom: {
        marginBottom: 7
    },

    /** Margin large */
    mlAll: {
        margin: 15
    },

    mlTop: {
        marginTop: 15
    },

    mlRight: {
        marginRight: 15
    },

    mlLeft: {
        marginLeft: 15
    },

    mlBottom: {
        marginBottom: 15
    },

    /** Padding large */
    plAll: {
        padding: 15
    },

    plTop: {
        paddingTop: 15
    },

    plRight: {
        paddingRight: 15
    },

    plLeft: {
        paddingLeft: 15
    },

    plBottom: {
        paddingBottom: 15
    },

    w150: {
        maxWidth: 150,
    },

    itemImage: {
        height: 210,
        width: 150
    },

    smallText: {
        fontSize: 12.6
    },

    /** Secondary color */
    greyText: {
        color: GREY
    },

    greyBorder: {
        borderColor: SOFT_GREY
    }

});

export { generalSty };