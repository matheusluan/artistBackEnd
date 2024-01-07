export function getOnlyNumbers(value: string) {
  if (!value) {
    return "";
  }

  return value.replace(/\D/g, "");
}
