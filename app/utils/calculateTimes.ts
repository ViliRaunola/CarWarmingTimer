import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import type { IWarmingForm } from '~/welcome/welcome'

dayjs.extend(duration)

export interface ILeaveTimeCalculations {
    minsUntilLeave: number
    warmingStartTime: string
    hoursUntilWarmStart: [number, number]
}

const parseWarmDuration = (warmDuration: string | undefined) => {
    const [hours, minutes] = (warmDuration || '00:00').split(':')
    return dayjs.duration({
        hours: parseInt(hours),
        minutes: parseInt(minutes),
    })
}

const calculateMinsUntilLeave = (leaveTime: dayjs.Dayjs) => {
    const currentTime = dayjs()
    return leaveTime.diff(currentTime, 'minutes')
}

const calculateTimeUntilWarmStart = (
    leaveTime: dayjs.Dayjs,
    warmDuration: duration.Duration
) => {
    return leaveTime.subtract(warmDuration).format('YYYY-MM-DD HH:mm')
}

const calculateHoursAndMinutesUntilWarmStart = (
    minsUntilLeave: number,
    offsetDuration: string | undefined,
    warmDuration: string | undefined
): [number, number] => {
    const [offsetHours, offsetMinutes] = (offsetDuration || '00:00').split(':')
    const totalOffsetMins =
        parseInt(offsetHours) * 60 + parseInt(offsetMinutes || '0')
    minsUntilLeave +=
        totalOffsetMins - parseWarmDuration(warmDuration).asMinutes()

    console.log('Total mins until leave with offset:', minsUntilLeave)

    const hours = Math.floor(minsUntilLeave / 60)
    const minutes = minsUntilLeave - hours * 60
    return [hours, minutes]
}

export const calculateLeaveTimes = ({
    leaveTime,
    warmDuration,
    offsetDuration,
}: IWarmingForm): ILeaveTimeCalculations => {
    const leaveTimeDayjs = dayjs(leaveTime)
    const warmTime = parseWarmDuration(warmDuration)

    const minsUntilLeave = calculateMinsUntilLeave(leaveTimeDayjs)
    const timeUntilWarmStart = calculateTimeUntilWarmStart(
        leaveTimeDayjs,
        warmTime
    )
    const hoursUntilWarmStart = calculateHoursAndMinutesUntilWarmStart(
        minsUntilLeave,
        offsetDuration,
        warmDuration
    )

    return {
        minsUntilLeave,
        warmingStartTime: timeUntilWarmStart,
        hoursUntilWarmStart,
    }
}
