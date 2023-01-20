import {useState, useEffect} from 'react'
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {generateRangeDatesFromYearStart} from '../utils/generate-range-between-dates'
import {api} from '../lib/axios'

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from '../components/Loading';
import dayjs from 'dayjs';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimumSummaryDatesSize = 18*5
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length

type SummaryProprs = {
    id: string,
    date: string,
    amount: string,
    completed: number
}[]

export function Home(){
    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<SummaryProprs | null>(null)
    const {navigate} = useNavigation()


    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get('/summary')
            
            setSummary(response.data)
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível carregar o Sumário de Hábitos')
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        fetchData()
    }, [])

    if(loading){
        return (
            <Loading/>
        )
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header/>

            <View className="flex-row mt-6 mb-2">
                {weekDays.map((weekDay, i)=>(
                    <Text 
                        key={`${weekDay} - ${i}`}
                        className='text-zinc-400 text-xl font-bold text-center mx-1'
                        style={{width: DAY_SIZE}}
                    >
                        {weekDay}
                    </Text>
                ))}
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 0}}
            >

                {summary &&
                    <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date=>{
                            const dayWithHabits = summary.find(day => {
                                return dayjs(date).isSame(day.date, 'day')
                            })

                            return (
                                <HabitDay 
                                    key={date.toISOString()}
                                    onPress={()=>navigate('Habit', {date: date.toISOString()})}
                                    date={date}
                                    amountOfHabits={Number(dayWithHabits?.amount)}
                                    amountCompleted={dayWithHabits?.completed}

                                />
                            )})
                    }

                    {
                        amountOfDaysToFill > 0 && Array
                                                    .from({length: amountOfDaysToFill})
                                                    .map((_, i) => (
                                                        <View
                                                            key={i}
                                                            className='bg-zinc-700 rounded-lg border-2 m-1 border-zinc-600opacity-40s'
                                                            style={{width: DAY_SIZE, height: DAY_SIZE}}
                                                        />
                                                    ))
                    }
                    </View>
                }

            </ScrollView>



        </View>
    )
}