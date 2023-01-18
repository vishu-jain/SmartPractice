import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Startassessment from '../../../screens/user/startassessment';
const Stack = createNativeStackNavigator();

export default function Assessmentstack(){

return (
    <Stack.Navigator >
        <Stack.Screen name ="Startassessment" component={Startassessment} options={{headerShown:false}}/>
    </Stack.Navigator>
)
}