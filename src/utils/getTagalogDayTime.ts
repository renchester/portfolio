export type TagDayType = 'umaga' | 'tanghali' | 'hapon' | 'gabi' | 'araw';

const getTagalogDayTime = (currentHour: number): TagDayType => {
  if (currentHour >= 3 && currentHour < 10) {
    // 3:00 - 9:59
    return 'umaga';
  } else if (currentHour >= 10 && currentHour < 14) {
    // 10:00 - 14:59
    return 'tanghali';
  } else if (currentHour >= 14 && currentHour < 18) {
    // 14:00 - 17:59
    return 'hapon';
  } else if (currentHour >= 18 || currentHour < 3) {
    // 18:00 - 0:00
    return 'gabi';
  } else {
    // default
    return 'araw';
  }
};

export default getTagalogDayTime;
