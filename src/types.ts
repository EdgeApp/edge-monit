export interface Monitor {
  sleep: number
  check: () => Promise<void>
}
