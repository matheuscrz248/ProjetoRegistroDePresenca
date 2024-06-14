import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../Welcome';
import SignIn from '../SignIn';
import TableEditor1 from '../TableEditor1';
import TableEditor2 from '../TableEditor2';
import TableEditor3 from '../TableEditor3';
import TableEditor4 from '../TableEditor4';
import TableEditor5 from '../TableEditor5';
import TableEditor6 from '../TableEditor6';
import TurmasScreen from '../TurmasScreen';

const Stack = createNativeStackNavigator();
export default function Routes()
{
    return(
<Stack.Navigator>
<Stack.Screen
name="Welcome"
component={Welcome}
options={{headerShown: false}}
/>

<Stack.Screen
name="SignIn"
component={SignIn}
options={{headerShown: false}}
/>
<Stack.Screen
name="TableEditor1"
component={TableEditor1}
options={{headerShown: false}}
/>
<Stack.Screen
name="TableEditor2"
component={TableEditor2}
options={{headerShown: false}}
/>
<Stack.Screen
name="TableEditor3"
component={TableEditor3}
options={{headerShown: false}}
/>
<Stack.Screen
name="TableEditor4"
component={TableEditor4}
options={{headerShown: false}}
/>
<Stack.Screen
name="TableEditor5"
component={TableEditor5}
options={{headerShown: false}}
/>
<Stack.Screen
name="TableEditor6"
component={TableEditor6}
options={{headerShown: false}}
/>
<Stack.Screen
name="TurmasScreen"
component={TurmasScreen}
options={{headerShown: false}}
/>

</Stack.Navigator>

)
}