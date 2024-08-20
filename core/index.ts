export { status } from './status/status'
export { check } from './check/check'
export { init } from './new/new'


export const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));