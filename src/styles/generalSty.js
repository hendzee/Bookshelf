import { StyleSheet } from 'react-native';
import color from './custom-theme.json';

const GREY = '#b2bec3';
const SOFT_GREY = '#dfe6e9';
const PRIMARY = color['color-primary-500'];
const WHITE = '#FFF';
const RADIUS = 15;

const generalSty = StyleSheet.create({
    full: {
        flex: 1
    },

    mainContainer: {
        flex: 1,
        padding: 15
    },

    /** Margin medium */
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

    /** Padding normal */
    pmAll: {
        padding: 7
    },

    pmTop: {
        paddingTop: 7
    },

    pmRight: {
        paddingRight: 7
    },

    pmLeft: {
        paddingLeft: 7
    },

    pmBottom: {
        paddingBottom: 7
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

    w230: {
        maxWidth: 230,
    },

    itemImage: {
        height: 210,
        width: 150,
        resizeMode: 'cover',
        borderRadius: RADIUS
    },

    navigationIcon: {
        width: 30,
        height: 30
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
    },

    titleScreenStyle: {
        fontWeight: 'bold'
    },

    /** Background color */
    primaryBackground: {
        backgroundColor: PRIMARY
    },

    greyBackground: {
        backgroundColor: GREY
    },

    /** Colors */
    white: {
        color: WHITE
    },

    /** Radius */
    topLeftRadius: {
        borderTopLeftRadius: RADIUS
    },

    topRightRadius: {
        borderTopRightRadius: RADIUS
    },

    bottomRightRadius: {
        borderBottomRightRadius: RADIUS
    },

    bottomLeftRadius: {
        borderBottomLeftRadius: RADIUS
    }

});

export { generalSty };