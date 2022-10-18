/**
 * @param {number} delay time to wait in ms
 * @returns {Promise<void>}
 */
export const millis = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
