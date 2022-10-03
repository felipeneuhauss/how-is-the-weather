function timeToWeekDay(time: number) {
  return new Date(time * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}

function timeToHour(time: number) {
  return new Date(time * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export { timeToHour, timeToWeekDay };
