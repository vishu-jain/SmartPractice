import { StyleSheet } from "react-native"
import COLORS from "../../../constants/colors";
const styles = StyleSheet.create({
   liststyle:{
    padding:20,
    borderRadius:5,
    marginVertical:5,
    marginHorizontal:10,
    // flexDirection:'row',
    // alignItems:'center',
    // justifyContent:'space-between',
    backgroundColor:COLORS.WHITE,
    elevation:2
   },
   titlestyle:{
    fontSize:25,
    color:COLORS.BLACK,
    fontWeight:'bold'
   },
   descriptionstyle:{
    fontSize:20,
    color:COLORS.BLACK,
   }
  
})

export default styles;