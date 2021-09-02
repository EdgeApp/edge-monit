import fetch from 'cross-fetch'

import { config } from '../config'

export async function slackAlert(text: string): Promise<void> {
  await fetch(config.slackUri, {
    body: JSON.stringify({ text }),
    headers: { 'content-type': 'application/json' },
    method: 'POST'
  })
}
