export function assertNever(action: never): void {
  console.error("Unhandled case", action);
}
