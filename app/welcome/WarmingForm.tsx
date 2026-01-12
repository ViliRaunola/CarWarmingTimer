import { Button, TextInput } from '@mantine/core'
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
            leaveTime: dayjs().format('YYYY-MM-DDTHH:mm'),
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
                children={({ state, handleChange }) => (
                    <TextInput
                        type="datetime-local"
                        value={state.value ?? ''}
                        label="Valitse lähtöaika"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            />
            <Field
                name="warmDuration"
                children={({ state, handleChange }) => (
                    <TextInput
                        type="time"
                        value={state.value}
                        label="Kuinka pitkään autoa lämmitetään?"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            />
            <Field
                name="offsetDuration"
                children={({ state, handleChange }) => (
                    <TextInput
                        type="time"
                        value={state.value}
                        label="Kuinka pitkään ajastin lämmittää autoa?"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            />
            <Button type="submit" mt="md">
                Laske aika
            </Button>
        </form>
    )
}
