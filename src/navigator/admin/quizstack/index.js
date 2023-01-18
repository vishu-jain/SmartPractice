import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Createquiz from '../../../screens/admin/createquiz';
import Addquestion from '../../../screens/admin/addquestion/addquestion';
import COLORS from '../../../constants/colors';
import { Icon } from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function Quizstack(){

return (
    <Stack.Navigator>
        <Stack.Screen name ="Createquiz" component={Createquiz} options={{headerShown:false}}/>
        <Stack.Screen name="Addquestion" component={Addquestion} options={{headerShown:false}}/> 
    </Stack.Navigator>
)
}