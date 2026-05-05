export function formatCurrency(amountCents: number, currency = 'USD'): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(amountCents / 100);
}

export function formatPercent(value: number, total: number): string {
  if (total === 0) {
    return '0%';
  }

  return `${((value / total) * 100).toFixed(1)}%`;
}
