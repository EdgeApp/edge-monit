import { makeConfig } from 'cleaner-config'
import { asArray, asObject, asOptional, asString } from 'cleaners'

export const asSyncServersConfig = asObject({
  hostnames: asArray(asString)
})

export const asConfig = asObject({
  slackUri: asOptional(asString, ''),
  syncServers: asOptional(asSyncServersConfig, {
    hostnames: []
  })
})

export const config = makeConfig(asConfig)
