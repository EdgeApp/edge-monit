import pino from 'pino'

import * as monitorModules from './monitors/index'
import { Monitor } from './types'
import { delay } from './util/delay'

const logger = pino()

async function main(): Promise<void> {
  for (const [name, makeMonitor] of Object.entries(monitorModules)) {
    const childLogger = logger.child({
      module: name
    })
    const monitor = await makeMonitor(childLogger)

    runMonitor(monitor).catch(handleError)
  }
}

async function runMonitor(monitor: Monitor): Promise<void> {
  while (true) {
    await monitor.check().catch(err => {
      logger.warn({ msg: 'monitor failed', err })
    })

    await delay(monitor.sleep)
  }
}

function handleError(err: any): void {
  logger.error(err)
  process.exit(1)
}

main().catch(handleError)
