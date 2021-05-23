import { StyleSheet } from 'react-native';
import { Colors } from "styles";
const styles = (props) => StyleSheet .create({
    activeDotsStyle: {      
        backgroundColor:Colors.PRIMARY, 
        width: 10, 
        height: 8,
        borderRadius: 4, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3,
        marginBottom: 0
    }
});
  export default styles;