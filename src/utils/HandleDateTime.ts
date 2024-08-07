import { MonthNames } from "../constants/appInfos"

export class HandleDateTime {
    static DateString = (num: number) => {
        const date = new Date(num)

        return `${date.getDate()}, ${MonthNames[date.getMonth()]} ${date.getFullYear()}`
    }

    static DateString1 = (num: number) => {
        const date = new Date(num)

        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    static MonthString = (num: number) => {
        const date = new Date(num)

        return `${date.getDate()}, ${MonthNames[date.getMonth()]}`
    }

    static Date = (num: number) => {
        const date = new Date(num)

        return date
    }

    static GetHour = (num: number) => {
        const date = new Date(num)
        return `${date.getHours()}:${date.getMinutes()}`
    }

    static GetHourDate = (num: number) => {
        const date = new Date(num)
        return date
    }
}