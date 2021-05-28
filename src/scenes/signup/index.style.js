import { StyleSheet } from 'react-native';
const styles = (props) => StyleSheet .create({
    login_referal:{
        paddingTop:40,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    loginContainer: {      
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        flex:0.2,
        alignItems:'center',
    },
    form :{
        flex:0.6,
        alignItems:'center',
    }
});
  export default styles;