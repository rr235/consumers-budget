const formatCurrencyEUR = (value) => {
  if (typeof value === 'number') {
    return value.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
    });
  }
  return value;
};

export { formatCurrencyEUR };
