import dayjs from 'dayjs';

export function isTimeStampExpired(timestamp: number): boolean {
  return dayjs().isAfter(dayjs(new Date((timestamp - 20) * 1000)));
}

export function getFileNameFromUrl(url: string, suffix: string = '') {
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];
  const fileNameParts = fileName.split('.');
  const name = fileNameParts[0];
  const extension = fileNameParts[1];

  return `${name}${suffix}.${extension}`;
}
