import fetch from 'cross-fetch'
import { Logger } from 'pino'

import { config } from '../config'
import { Monitor } from '../types'
import { slackAlert } from '../util/slack-alert'

const uri =
  'https://{hostname}/api/v2/store/0000000000000000000000000000000000000000'

export default async function makeMonitor(logger: Logger): Promise<Monitor> {
  const sleep = 30000

  async function check(): Promise<void> {
    for (const hostname of config.syncServers.hostnames) {
      const url = uri.replace('{hostname}', hostname)
      let msg: string

      try {
        const response = await fetch(url)
        msg = `${hostname} status ${response.status}`

        if (!response.ok) {
          slackAlert(`(${new Date().toLocaleString('en-US')}) ${msg}`).catch(
            logger.warn
          )
        }
      } catch (error: any) {
        msg = error != null ? error.message : error
        slackAlert(`(${new Date().toLocaleString('en-US')}) ${msg}`).catch(
          logger.warn
        )
      }

      logger.info(msg)
    }
  }

  return { check, sleep }
}
