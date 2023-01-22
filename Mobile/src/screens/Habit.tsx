import { View, ScrollView, Text, Alert } from "react-native";
import {useRoute} from '@react-navigation/native'
import { useState, useEffect } from "react";

import dayjs from "dayjs";

import { api } from "../lib/axios";
import {generateProgressPercentage} from '../utils/generate-progress-percentage'

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { HabitEmpty } from "../components/HabitEmpty";
import clsx from "clsx";

interface HabitParams {
    date: string
}

interface DayInfoProps {
    completed: string[],
    possibleHabits: {
        id: string,
        title: string
    }[]
}

export function Habit(){
    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])

    const route = useRoute()
    const {date} = route.params as HabitParams

    const parsedDate = dayjs(date)
    const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    const habitsProgress = dayInfo?.possibleHabits?.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    async function handleToggleCheckbox(habitID : string){
        try 
        {
            await api.patch(`/habits/${habitID}/toggle`)
            if (completedHabits.includes(habitID)) {
                setCompletedHabits(prevState => prevState.filter( habit => habit !== habitID))
            }
            else {
                setCompletedHabits(prevState => [...prevState, habitID])
            }
        } catch (e) {
            console.log(e)
            Alert.alert('Ops...', 'Houve um problema no servidor ao atualizar o hábito.')
        }
    }

    async function fetchData(){
        try{
            const response = await api.get('/day', {
                params: {
                    date
                }
            })
            
            setLoading(response.data)
            setDayInfo(response.data)

            setCompletedHabits(response.data.completedHabits ?? [])
        }
        catch (e){
            console.log(e)
            Alert.alert('Ops...', 'Não foi possível carregar as informações do hábito no servidor')
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    }, [])

    if (loading){
        return <Loading/>
    }
    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 0}}
            >          
                <BackButton/>     

                <Text className="text-white font-extrabold text-3xl mt-6">
                    {dayAndMonth}
                </Text>
                <Text className="text-zinc-400 font-semibold text-base uppercase">
                    {dayOfWeek}
                </Text>

                <ProgressBar progress={habitsProgress}/>

                <View className={clsx('mt-6', {
                    ['opacity-50']: isDateInPast
                })}>
                    { dayInfo?.possibleHabits 
                        ?
                            dayInfo.possibleHabits?.map((habit) => (
                                <Checkbox 
                                    key={habit.id}
                                    title={habit.title}
                                    checked={completedHabits.includes(habit.id)}
                                    onPress={()=>handleToggleCheckbox(habit.id)}
                                    disabled={isDateInPast}
                                />
                                ))
                        :
                            <HabitEmpty/>
                    }
                        
                </View>

                    {
                        isDateInPast && (
                            <Text className="text-white mt-10 text-center">
                                Para estimulá-lo a cultivar seus hábitos, você não pode editar uma data passada.
                            </Text>
                        )
                    }

            </ScrollView>
        </View>
    )
}