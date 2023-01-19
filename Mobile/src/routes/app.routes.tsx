import {createNativeStackNavigator} from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

import {Home} from '../screens/Home'
import {New} from '../screens/New'
import {Habit} from '../screens/Habit'

export function AppRoutes(){
    return (        
        <Navigator screenOptions={{headerShown: false}}>
            <Screen 
                name='Home'
                component={Home}
            />
            <Screen 
                name='New'
                component={New}
            />
            <Screen 
                name='Habit'
                component={Habit}
            />
        </Navigator>
    )
}