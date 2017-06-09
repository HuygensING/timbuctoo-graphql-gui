export default (camelCase) => camelCase
  .replace(/([A-Z0-9])/g, (match) => ` ${match.toLowerCase()}`)
  .replace(/^./, (match) => match.toUpperCase());
