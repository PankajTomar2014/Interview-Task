import {appImages} from './Colors';

export const maritalStatusOptions = [
  {label: 'Single', value: 'Single'},
  {label: 'Married', value: 'Married'},
  {label: 'Widowed', value: 'Widowed'},
  {label: 'Divorced', value: 'Divorced'},
  {label: 'Separated', value: 'Separated'},
  {label: 'Registered Partnership', value: 'Registered Partnership'},
];

const height = [
  '4ft 5in - 134cm',
  '4ft 6in - 137cm',
  '4ft 7in - 139cm',
  '4ft 8in - 142cm',
  '4ft 9in - 144cm',
  '4ft 10in - 147cm',
  '4ft 11in - 149cm',
  '5ft 1in - 154cm',
  '5ft 2in - 157cm',
  '5ft 3in - 160cm',
  '5ft 4in - 163cm',
  '5ft 5in - 165cm',
  '5ft 6in - 168cm',
  '5ft 7in - 170cm',
  '5ft 8in - 173cm',
  '5ft 9in - 175cm',
  '5ft 10in - 178cm',
  '5ft 11in - 180cm',
  '6ft 1in - 185cm',
  '6ft 2in - 188cm',
  '6ft 3in - 191cm',
  '6ft 4in - 193cm',
  '6ft 5in - 196cm',
  '6ft 6in - 198cm',
  '6ft 7in - 201cm',
  '6ft 8in - 203cm',
  '6ft 9in - 206cm',
  '6ft 10in - 208cm',
  '7ft 1in - 213cm',
  '7ft 2in - 216cm',
  '7ft 3in - 218cm',
  '7ft 4in - 221cm',
  '7ft 5in - 223cm',
  '7ft 6in - 226cm',
  '7ft 7in - 229cm',
  '7ft 8in - 231cm',
  '7ft 9in - 234cm',
  '7ft 10in - 236cm',
];

export const heightOptions = height.map(h => ({
  label: h,
  value: h,
}));
const subCommunit = [
  'Brahmin',
  'Kshatriya',
  'Vaishya',
  'Shudra',
  'Jat',
  'Yadav',
  'Scheduled Caste (SC)',
  'Scheduled Tribe (ST)',
  'OBC (Other Backward Classes)',
  'Maratha',
  'Baniya',
  'Rajput',
  'Bengali Brahmin',
  'Punjabi Khatri',
  'Gujarati Patel',
  'Reddy',
  'Kamma',
  'Naidu',
  'Vanniyar',
  'Iyer',
  'Iyengar',
  'Chettiar',
  'Mudaliar',
  'Nair',
  'Menon',
  'Pillai',
  'Thakur',
  'Goud',
  'Lingayat',
  'Bunt',
  'Kuruba',
  'Brahmin - Anavil',
  'Brahmin - Saraswat',
  'Brahmin - Deshastha',
  'Brahmin - Havyaka',
];

export const casteOptions = subCommunit.map(caste => ({
  label: caste,
  value: caste,
}));

export const religions = [
  'Christianity',
  'Islam',
  'Hinduism',
  'Buddhism',
  'Sikhism',
  'Judaism',
  'Baháʼí Faith',
  'Jainism',
  'Zoroastrianism',
  'Shinto',
  'Taoism',
  'Confucianism',
  'Bahaism',
  'Rastafari',
  'Satanism',
  'Wicca',
  `Jehovah's Witnesses`,
  'Mormonism (Latter-Day Saints)',
  'Scientology',
  'Unitarian Universalism',
  'Native American Spirituality',
  'Shamanism',
  'Paganism',
  'Atheism',
  'Agnosticism',
  'Humanism',
  'New Age',
  'Spiritualism',
  'Eckankar',
  'Raelism',
  'Jediism',
];

export const religionsOptions = religions.map(religion => ({
  label: religion,
  value: religion,
}));
