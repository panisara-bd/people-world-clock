type FormattedTime = {
  hour: string
  minute: string
  ampm: string
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
}

export const getFormattedTime = (
  time: string | undefined,
  timeZone: string | undefined
): FormattedTime => {
  if (!time) {
    return { hour: '', minute: '', ampm: '', timeOfDay: 'afternoon' }
  }

  const hour = time.split(':')[0]
  const minute = time.split(':')[1]
  const ampm = time.split(' ')[1]

  const hour24 = new Date().toLocaleTimeString('en', { timeZone, hour12: false }).split(':')[0]

  const timeOfDay =
    Number(hour24) >= 5 && Number(hour24) <= 10
      ? 'morning'
      : Number(hour24) >= 11 && Number(hour24) <= 16
      ? 'afternoon'
      : Number(hour24) >= 17 && Number(hour24) <= 20
      ? 'evening'
      : 'night'

  return { hour, minute, ampm, timeOfDay }
}
