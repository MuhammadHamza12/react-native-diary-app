import { StyleSheet } from 'react-native';
import { Colors } from "styles";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'styles/mixins';
import { FONT_SIZE_14 } from 'styles/typography';
const styles = ({list}) => StyleSheet.create({
    topText:{
        position: 'absolute', 
        top: 0, 
        color: Colors.WHITE, 
        fontSize: FONT_SIZE_14, 
        borderTopLeftRadius:5,
        padding: 5,
        backgroundColor:Colors.SECONDARY,

    },
    row:{
        display:'flex',
        flexDirection:'row-reverse',
    },
    editorStyle:{
        marginTop: list ? 15 : 10,
    marginBottom: list ? 0 : 10,
    height:80,
    },  
    main:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    webViewContainer: {   
        borderBottomWidth:5,   
        borderBottomColor:Colors.SECONDARY,
        padding:10,
        width: list ? WINDOW_WIDTH*0.9 : WINDOW_WIDTH*0.4,
        zIndex:0,
        
        margin: list ? 0 : 5,
        minHeight: list ? WINDOW_HEIGHT*0.15 : WINDOW_HEIGHT*0.2 , 
        minWidth:WINDOW_WIDTH*0.3,
        borderRadius:10,
        // borderWidth:1,
        // borderColor:Colors.WHITE,
        // height:WINDOW_HEIGHT*0.2,
        // margin:10,
        // shadowRadius: 2,  
        // elevation: 5,
        // shadowOffset:{  width: 10,  height: 10,  },
        // shadowColor: 'black',
        // shadowOpacity: 1.0,

    },
    


    webContainer: { 
        minHeight:WINDOW_HEIGHT*0.2,
        minWidth:WINDOW_WIDTH*0.3,
            
        // borderRadius:10,
        // borderColor:Colors.WHITE,
        // textAlign:'center',
   
        // padding:15,
        // width:WINDOW_WIDTH*0.4,
        // margin:10,
        // shadowRadius: 1,  
        // elevation: 9,
        // shadowOffset:{  width: 10,  height: 10,  },
        // shadowColor: 'black',
        // shadowOpacity: 1.0,
        
    }
});
  export default styles;