export const formatNumber = (amount = 0) => {
  const options = {
    minimumFractionDigits: 2,
  };

  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('de-DE', options);
  return formatter.format(amount / 100);
};
