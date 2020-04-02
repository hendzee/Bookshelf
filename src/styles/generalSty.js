import { StyleSheet } from 'react-native';
import color from './custom-theme.json';

const GREY = '#b2bec3';
const SOFT_GREY = '#dfe6e9';
const PRIMARY = color['color-primary-500'];
const WHITE = '#FFF';
const BLACK = '#000';
const RADIUS = 15;
const YELLOW = '#fdcb6e';

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

    /** Width max */
    w110: {
        maxWidth: 110,
    },

    w180: {
        maxWidth: 180
    },

    w230: {
        maxWidth: 230,
    },

    /** Width fixed */
    wf230:{
        width: 230
    },

    wf300:{
        width: 300
    },

    /** Height fixed */
    hf150: {
        height: 150
    },

    itemImage: {
        height: 175,
        width: 110,
        resizeMode: 'cover',
        borderRadius: RADIUS
    },

    itemImageLarge: {
        height: 231,
        width: 147,
        resizeMode: 'cover',
        borderRadius: RADIUS
    },

    navigationIcon: {
        width: 30,
        height: 30
    },

    /** Font size */
    smallText: {
        fontSize: 12.6
    },

    veryLargeText: {
        fontSize: 18
    },

    superLargeText: {
        fontSize: 28
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

    sofyGreyBackground: {
        backgroundColor: SOFT_GREY
    },

    /** Colors */
    white: {
        color: WHITE
    },

    black: {
        color: BLACK
    },

    primaryColor: {
        color: PRIMARY
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
    },

    allRadius: {
        borderTopLeftRadius: RADIUS,
        borderTopRightRadius: RADIUS,
        borderBottomRightRadius: RADIUS,
        borderBottomLeftRadius: RADIUS
    },

    /** Image size */
    iconSizeNormal: {
        width: 50,
        height: 50,
    },

    iconSizeLarge: {
        width: 90,
        height: 90,
    }

});

export { generalSty, WHITE, GREY, SOFT_GREY, BLACK, PRIMARY, YELLOW };