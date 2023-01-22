import {Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function HabitEmpty(){
    const {navigate} = useNavigation()

    return (
        <>
            <Text className='text-zinc-400 text-base mt-3 mb-1'>
                Ainda não temos nem um hábito para monitorar hoje.
            </Text>

            <Text 
                className='text-violet-400 text-base underline active:text-violet-500'
                onPress={()=>navigate('New')}    
            >
                Comece adicionando um ao dia.
            </Text>
        </>
        
    )
}