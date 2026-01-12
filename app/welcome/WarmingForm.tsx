import { DateTimePicker, TimePicker } from '@mantine/dates'
import { Button } from '@mantine/core'
import { useForm } from '@tanstack/react-form'
import dayjs from 'dayjs'

export interface IWarmingForm {
    leaveTime: string | null
    warmDuration: string | undefined
    offsetDuration: string | undefined
}

interface WarmingFormProps {
    onSubmit: (value: IWarmingForm) => void
}

export function WarmingForm({ onSubmit }: WarmingFormProps) {
    const form = useForm({
        defaultValues: {
            leaveTime: dayjs().format('YYYY-MM-DD HH:mm'),
            warmDuration: '00:30',
            offsetDuration: '02:00',
        } as IWarmingForm,

        onSubmit: async ({ value }) => {
            onSubmit(value)
        },
    })

    const { Field, handleSubmit } = form

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSubmit()
            }}
        >
            <Field
                name="leaveTime"
                children={({ state, handleChange, handleBlur }) => (
                    <DateTimePicker
                        value={state.value}
                        label="Valitse lähtöaika"
                        onChange={(value) => handleChange(value)}
                        onBlur={handleBlur}
                    />
                )}
            />
            <Field
                name="warmDuration"
                children={({ state, handleChange, handleBlur }) => (
                    <TimePicker
                        value={state.value}
                        label="Kuinka pitkään autoa lämmitetään?"
                        onChange={(value) => handleChange(value)}
                        onBlur={handleBlur}
                    />
                )}
            />
            <Field
                name="offsetDuration"
                children={({ state, handleChange, handleBlur }) => (
                    <TimePicker
                        value={state.value}
                        label="Kuinka pitkään ajastin lämmittää autoa?"
                        onChange={(value) => handleChange(value)}
                        onBlur={handleBlur}
                    />
                )}
            />
            <Button type="submit" mt="md">
                Laske aika
            </Button>
        </form>
    )
}
