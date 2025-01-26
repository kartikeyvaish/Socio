import dayjs from 'dayjs';

export function isTimeStampExpired(timestamp: number): boolean {
  return dayjs().isAfter(dayjs(new Date((timestamp - 20) * 1000)));
}
