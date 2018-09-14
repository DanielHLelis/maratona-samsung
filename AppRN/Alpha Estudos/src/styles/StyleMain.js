import {
    StyleSheet,
    Dimensions
} from 'react-native';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

let StyleMain = StyleSheet.create({
    backgroundView: {
        backgroundColor: "#00d8ff",
        height: deviceHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startLogo: {
        width: deviceWidth * 0.8,
        height: deviceWidth * 0.8,
        borderRadius: deviceWidth * 0.4
    },
    littleIco: {
        width: deviceHeight * 0.095,
        height: deviceHeight * 0.095,
        borderRadius: deviceHeight * 0.0475,
        marginRight: 10
    },
    listItem: {
        backgroundColor: '#ffffff',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'solid',
        marginTop: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    listText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#5d5d5d'
    }
});
/*
#00d8ff
#ffffff
#146b93
#4ea4cc //Main
*/

export default StyleMain;