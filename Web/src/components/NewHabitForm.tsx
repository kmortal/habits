import { Check } from "phosphor-react";

export function NewHabitForm(){
    return (
        <form action="" className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input type="text" name="title" id="title" autoFocus placeholder="Ex.: Me exercitar, Estudar, Dormir 4h..." className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-white"/>

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <button type="submit" className="mt-6 rounded-lg p-4 flex gap-3 items-center justify-center font-semibold bg-green-400 hover:bg-green-700">
                <Check size={20} weight='bold'/>
                Confirmar 
            </button>
        </form>
    )
}