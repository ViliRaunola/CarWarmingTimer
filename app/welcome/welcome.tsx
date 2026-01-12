import { calculateLeaveTimes } from '~/utils/calculateTimes'
import { useState } from 'react'
import { WarmingForm, type IWarmingForm } from './WarmingForm'
import { WarmingResults } from './WarmingResults'

export function Welcome() {
    const [calculations, setCalculations] = useState<{
        minsUntilLeave: number
        warmingStartTime: string
        hoursUntilWarmStart: [number, number]
    } | null>(null)

    const handleFormSubmit = (value: IWarmingForm) => {
        const result = calculateLeaveTimes(value)
        setCalculations(result)
        console.log(result)
    }

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div className="w-full max-w-md px-4">
                <WarmingForm onSubmit={handleFormSubmit} />
                {calculations && (
                    <WarmingResults
                        warmingStartTime={calculations.warmingStartTime}
                        hoursUntilWarmStart={calculations.hoursUntilWarmStart}
                    />
                )}
            </div>
        </main>
    )
}
export type { IWarmingForm }
