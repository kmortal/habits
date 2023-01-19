import { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import {Feather} from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const avaiableWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

export function New(){
    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex: number){
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            >
                <BackButton/>
                <Text className="text-white font-extrabold text-3xl mt-6">
                    Criar Hábito
                </Text>
                <Text className="text-white font-semibold text-base mt-6">
                    Qual seu comprometimento?
                </Text>
                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
                    placeholder="Ex.: Me exercitar, Estudar, Dormir 4h..."
                    placeholderTextColor={colors.zinc[400]}
                />
                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>
                {
                    avaiableWeekDays.map((weekDay, i)=> (
                        <Checkbox 
                            key={weekDay} 
                            title={weekDay} 
                            checked={weekDays.includes(i)}
                            onPress={()=>handleToggleWeekDay(i)} 
                        />
                    ))
                }
                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    activeOpacity={0.7}
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}