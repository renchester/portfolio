export type EngDayType = 'morning' | 'afternoon' | 'evening' | 'day';

const getEnglishDayTime = (currentHour: number): EngDayType => {
  if (currentHour >= 3 && currentHour < 12) {
    // 3:00 - 11:59
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    // 12:00 - 17:59
    return 'afternoon';
  } else if (currentHour >= 18 || currentHour < 3) {
    // 18:00 - 2:59
    return 'evening';
  } else {
    // default
    return 'day';
  }
};

export default getEnglishDayTime;
