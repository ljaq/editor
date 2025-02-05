export function getOptionsFromEnum(params: { [key in string]: string | number }) {
  return Object.entries(params)
    .map(([label, value]) => ({ value, label }))
    .filter(i => !!isNaN(i.label as any))
}
