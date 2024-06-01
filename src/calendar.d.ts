import { JSX } from "preact"

type CalendarValues = {
  single: Date
  range: [Date, Date]
}

export type CalendarValue<M extends CalendarMode = CalendarMode> = CalendarValues[M]

export type CalendarMode = "single" | "range"

export type CalendarProps<M extends CalendarMode = CalendarMode> = {
  value?: CalendarValue<M>
  weekdayFormat?: "narrow" | "short" | "long"
  arrowLeft?: () => any
  arrowRight?: () => any
  mode?: M
  onSelect?: (nextValue: CalendarValue<M>) => void
}

export const Calendar: <M extends CalendarMode>(props: CalendarProps<M>) => JSX.Element
