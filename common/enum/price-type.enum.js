export const priceEnum = type => {
  switch (type) {
    case 'printPrice':
      return 'print';
    case 'digitalPurchasePrice':
      return 'digital';
    default:
      return '';
  }
};
