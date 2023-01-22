type ProgressBarProps = {
    progress: number,
}
export function ProgressBar(props: ProgressBarProps){     
    return (
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
            <div 
                className='h-3 rounded-xl bg-violet-600 transition-all' 
                style={{width: `${props.progress}%`}} 
                role='progressbar' 
                aria-label='Progresso de hábitos completos nesse dia' 
                aria-valuenow={75}
            />
        </div>
    )
}