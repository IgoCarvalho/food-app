import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getTimeFromNow(date: Date) {
  return dayjs(date).locale(ptBr).fromNow();
}
