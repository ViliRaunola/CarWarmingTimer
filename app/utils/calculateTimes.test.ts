import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
    calculateLeaveTimes,
    type ILeaveTimeCalculations,
} from './calculateTimes'
import dayjs from 'dayjs'

describe('calculateLeaveTimes', () => {
    beforeEach(() => {
        // Mock the current time to 2026-01-13 00:00
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-01-13T00:00:00'))
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should calculate warming times correctly for basic case', () => {
        const result = calculateLeaveTimes({
            leaveTime: '2026-01-13 08:00',
            warmDuration: '00:30',
            offsetDuration: undefined,
        })

        expect(result.minsUntilLeave).toBe(480) // 8 hours
        expect(result.warmingStartTime).toBe('2026-01-13 07:30')
        expect(result.hoursUntilWarmStart).toEqual([7, 30]) // 8 hours - 30 mins = 7h 30min
    })

    it('should handle offset duration correctly', () => {
        const result = calculateLeaveTimes({
            leaveTime: '2026-01-13 02:00',
            warmDuration: '00:30',
            offsetDuration: '02:00',
        })

        expect(result.minsUntilLeave).toBe(120) // 2 hours
        expect(result.warmingStartTime).toBe('2026-01-13 01:30')
        expect(result.hoursUntilWarmStart).toEqual([3, 30]) // 2h + 2h offset - 30min warm = 3h 30min
    })

    it('should calculate correctly when leaving in less than an hour', () => {
        const result = calculateLeaveTimes({
            leaveTime: '2026-01-13 00:45',
            warmDuration: '00:15',
            offsetDuration: undefined,
        })

        expect(result.minsUntilLeave).toBe(45)
        expect(result.warmingStartTime).toBe('2026-01-13 00:30')
        expect(result.hoursUntilWarmStart).toEqual([0, 30]) // 45min - 15min = 30min
    })

    it('should handle multi-hour warming and offset durations', () => {
        const result = calculateLeaveTimes({
            leaveTime: '2026-01-13 10:00',
            warmDuration: '02:00',
            offsetDuration: '01:30',
        })

        expect(result.minsUntilLeave).toBe(600) // 10 hours
        expect(result.warmingStartTime).toBe('2026-01-13 08:00')
        expect(result.hoursUntilWarmStart).toEqual([9, 30]) // 10h + 1.5h offset - 2h warm = 9.5h
    })

    it('should handle edge case with no warming duration', () => {
        const result = calculateLeaveTimes({
            leaveTime: '2026-01-13 05:00',
            warmDuration: '00:00',
            offsetDuration: undefined,
        })

        expect(result.minsUntilLeave).toBe(300) // 5 hours
        expect(result.warmingStartTime).toBe('2026-01-13 05:00')
        expect(result.hoursUntilWarmStart).toEqual([5, 0])
    })

    it('should handle undefined warming duration', () => {
        const result = calculateLeaveTimes({
            leaveTime: '2026-01-13 03:00',
            warmDuration: undefined,
            offsetDuration: undefined,
        })

        expect(result.minsUntilLeave).toBe(180) // 3 hours
        expect(result.warmingStartTime).toBe('2026-01-13 03:00')
        expect(result.hoursUntilWarmStart).toEqual([3, 0])
    })

    it('should calculate correctly for next day leave time', () => {
        const result = calculateLeaveTimes({
            leaveTime: '2026-01-14 06:00',
            warmDuration: '01:00',
            offsetDuration: undefined,
        })

        expect(result.minsUntilLeave).toBe(1800) // 30 hours
        expect(result.warmingStartTime).toBe('2026-01-14 05:00')
        expect(result.hoursUntilWarmStart).toEqual([29, 0]) // 30h - 1h = 29h
    })

    it('should handle complex scenario with both offset and warming', () => {
        const result = calculateLeaveTimes({
            leaveTime: '2026-01-13 07:45',
            warmDuration: '00:45',
            offsetDuration: '00:30',
        })

        expect(result.minsUntilLeave).toBe(465) // 7h 45min
        expect(result.warmingStartTime).toBe('2026-01-13 07:00')
        expect(result.hoursUntilWarmStart).toEqual([7, 30]) // 465min + 30min offset - 45min warm = 450min = 7.5h
    })

    it('should format warming start time correctly', () => {
        const result = calculateLeaveTimes({
            leaveTime: '2026-01-13 12:15',
            warmDuration: '01:30',
            offsetDuration: undefined,
        })

        expect(result.warmingStartTime).toBe('2026-01-13 10:45')
        expect(result.warmingStartTime).toMatch(
            /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
        )
    })
})
