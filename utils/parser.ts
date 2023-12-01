import { format } from 'date-fns';

export function addCommasToNumber(target: number) {
  return target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatAddress(address: string) {
  if (address) {
    const add1 = address.substring(0, 4);
    const add2 = address.substring(address.length - 4);
    const finalAddress = `${add1}...${add2}`;
    return finalAddress;
  }
}

export function formatPrice(price: number, currencyUnit: string) {
  if (price <= 0) {
    return 'Free';
  } else {
    const formattedPrice = price.toLocaleString();
    return `${formattedPrice} ${currencyUnit}`;
  }
}

export function formatTime(sec: number) {
  const min = Math.floor(sec / 60);
  const remainingSec = sec % 60;
  return `${min.toString().padStart(2, '0')}:${remainingSec
    .toString()
    .padStart(2, '0')}`;
}

export function formatSchedule(startDate: number, endDate: number) {
  return `${format(startDate, 'yyyy. MM. dd')} - ${format(
    endDate,
    'yyyy. MM. dd',
  )}`;
}
