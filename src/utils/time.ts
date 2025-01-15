export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function utc_now() {
  /**
   * return UTC timestamp as seconds
   *
   */
  return Math.floor(Date.now() / 1000);
}
