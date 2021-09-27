const asyncTimeout = (timeout) => new Promise((resolve) => setTimeout(() => resolve(), timeout))

export { asyncTimeout }
