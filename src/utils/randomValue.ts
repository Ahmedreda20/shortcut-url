export default function GenerateRandomValue(): string {
  const min = 100000;
  const max = 999999;
  return Math.round(min + Math.random() * max - min).toString();
}
