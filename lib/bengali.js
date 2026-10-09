export function toBnNum(num) {
  if (num === undefined || num === null) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (digit) => bnDigits[digit]);
}

export function toBengaliNumber(num) {
  return toBnNum(num);
}

export function formatBengaliPrice(price) {
  if (!price && price !== 0) return '০';
  return toBnNum(price.toLocaleString('bn-BD'));
}

export function formatBengaliUnit(unit) {
  if (!unit) return '';
  return toBnNum(unit);
}

export function getTodayBanglaDate() {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = [
    'জানুয়ারী',
    'ফেব্রুয়ারী',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ];

  const now = new Date();
  const dayName = days[now.getDay()];
  const dateBn = toBnNum(now.getDate());
  const monthName = months[now.getMonth()];
  const yearBn = toBnNum(now.getFullYear());

  return `${dayName}, ${dateBn} ${monthName} ${yearBn}`;
}

