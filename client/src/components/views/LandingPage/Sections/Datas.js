const continents = [
  { _id: 1, name: 'Africa' },
  { _id: 2, name: 'Europe' },
  { _id: 3, name: 'Asia' },
  { _id: 4, name: 'North America' },
  { _id: 5, name: 'South America' },
  { _id: 6, name: 'Austrailia' },
  { _id: 7, name: 'Antarctica' },
];

const price = [
  { _id: 1, name: 'Any', array: [0, 9999999] },
  { _id: 2, name: '$0 to $999', array: [0, 999] },
  { _id: 3, name: '$1000 to $4999', array: [1000, 4999] },
  { _id: 4, name: '$5000 to $9999', array: [5000, 9999] },
  { _id: 5, name: '$10000 to $19999', array: [10000, 19999] },
  { _id: 6, name: '$19999 to $29999', array: [19999, 29999] },
  { _id: 7, name: 'More than $30000', array: [30000, 9999999] },
];

export { continents, price };
