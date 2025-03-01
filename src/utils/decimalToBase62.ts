export function decimalToBase62(decimal: number): string {
  const base62Chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let remainder: number[] = [];
  let quotient = decimal;
  let result = "";

  while (quotient >= 62) {
    remainder.push(quotient % 62);
    quotient = Math.floor(quotient / 62);
  }
  result = base62Chars[quotient];

  while (remainder.length > 0) {
    result += base62Chars[remainder.pop()!];
  }

  return result;
}
