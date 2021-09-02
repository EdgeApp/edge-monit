export async function delay(ms: number): Promise<void> {
  return await new Promise((resolve): void => {
    setTimeout((): void => {
      resolve()
    }, ms)
  })
}
