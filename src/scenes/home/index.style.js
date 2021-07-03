import { StyleSheet } from 'react-native';
import { Colors } from 'styles';
import { FONT_SIZE_16, FONT_WEIGHT_REGULAR } from 'styles/typography';
// commit: for checking
const styles = (props) => StyleSheet .create({

    main:{
        flex: 1, display: 'flex', justifyContent: 'space-between'
    },
    subMain:{
        flex: 0.3, alignItems: 'center', justifyContent: 'center' 
    },
    scroll:{
        flex:1
    },
    scrollDirectView:{
        flex: 0.7, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'
    },
    center:{
        flex:1,justifyContent:'center',alignItems:'center' 
    },
    midButtonContainer: {      
        position: 'absolute',
        bottom:0,
        right:5,
        // bottom: 20, // space from bottombar
        height: 58,
        width: 58,
        borderRadius: 58,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'flex-end',
        margin: 10
      },
      buttonText: {
        color: Colors.WHITE,
        fontWeight:FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_16,
      }
});
  export default styles;