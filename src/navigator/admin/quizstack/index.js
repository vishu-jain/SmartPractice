import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Createquiz from '../../../screens/admin/createquiz';
import Addquestion from '../../../screens/admin/addquestion/addquestion';

const Stack = createNativeStackNavigator();

export default function Quizstack(){

return (
    <Stack.Navigator>
        <Stack.Screen name ="Createquiz" component={Createquiz}/>
        <Stack.Screen name="Addquestion" component={Addquestion} /> 
    </Stack.Navigator>
)
}