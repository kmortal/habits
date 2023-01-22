import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from 'phosphor-react';
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitsListProps {
    date: Date,
    onCompletedChange: (completed:number)=>void
}

interface HabitsInfo{
    possibleHabits: {
        id: string,
        title: string,
        created_at: string
    }[],
    completedHabits: string[]
}

export function HabitsList({date, onCompletedChange} :HabitsListProps){
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()
    
    useEffect(()=>{
        api.get('/day', {
            params:{
                date: date.toISOString()
            }
        }).then(response=>setHabitsInfo(response.data))
    }, [])
    
    const isDateInPast = dayjs(date)
        .endOf('day')
        .isBefore(new Date())

    async function handleToggleHabit(habitID:string){
        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitID)
        
        await api.patch(`/habits/${habitID}/toggle`)

        let completedHabits : string[] = []

        if(isHabitAlreadyCompleted){
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitID)
        }
        else{
            completedHabits = [...habitsInfo!.completedHabits, habitID]
        }
        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        })

        onCompletedChange(completedHabits.length)
    }

    return (
        <div className='mt-6 flex flex-col gap-3'>
            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root 
                        key={habit.id} 
                        className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        disabled={isDateInPast}
                        onCheckedChange={()=>handleToggleHabit(habit.id)}
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-offset-2 group-focus:ring-offset-background group-focus:ring-2 group-focus:ring-violet-500'>
                            <Checkbox.Indicator>
                                <Check size={20} className='text-white'/>
                            </Checkbox.Indicator>
                        </div>
                        <span className='text-white font-semibold text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                            {habit.title}
                        </span>
                    </Checkbox.Root>
                ) 
            })}
        </div>
    )
}