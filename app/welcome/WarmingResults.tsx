import { Card, Text, Stack, Title } from '@mantine/core'

interface WarmingResultsProps {
    warmingStartTime: string
    hoursUntilWarmStart: [number, number]
}

export function WarmingResults({
    warmingStartTime,
    hoursUntilWarmStart,
}: WarmingResultsProps) {
    const [hours, minutes] = hoursUntilWarmStart

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl">
            <Stack gap="md">
                <div>
                    <Title order={3} size="h4" mb="xs">
                        Lämmityksen aloitusaika
                    </Title>
                    <Text size="xl" fw={700} c="blue">
                        {warmingStartTime}
                    </Text>
                </div>

                <div>
                    <Title order={3} size="h4" mb="xs">
                        Aseta ajastin
                    </Title>
                    <Text size="xl" fw={700} c="green">
                        {hours}h {minutes}min
                    </Text>
                </div>
            </Stack>
        </Card>
    )
}
