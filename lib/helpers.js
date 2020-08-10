export function makeClasses(...args) {
  return args.filter(Boolean).join(" ");
}
