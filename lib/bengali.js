export function toBengaliNumber(number) {
  if (number === null || number === undefined) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().replace(/\d/g, (digit) => banglaDigits[digit]);
}

export function getTodayBanglaDate() {
  const now = new Date();

  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
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

  const dayName = days[now.getDay()];
  const dateBn = toBengaliNumber(now.getDate());
  const monthName = months[now.getMonth()];
  const yearBn = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${dateBn} ${monthName} ${yearBn}`;
}
