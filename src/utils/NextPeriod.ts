export type NextPeriod = {
    year: number;
    month: number;
}

export const nextPeriod = (currentYear: number, currentMonth: number, installment: number) => {
    if(installment === 1)
        return {year: currentYear, month: currentMonth} as NextPeriod

    currentMonth += (installment-1)
    while(currentMonth > 12) {
        currentYear++
        currentMonth -= 12
    }

    return {year: currentYear, month: currentMonth} as NextPeriod
}