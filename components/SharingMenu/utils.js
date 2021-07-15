import compact from 'lodash/compact'
import { I18N } from '../util'

// 产品类型
// const PROTOTYPE = 'prototype'
export const DESIGNDRAFT = 'design-draft'
export const FLOWCHART = 'flow-chart'
const MIND_MAP = 'mind-map'

const getSharingUrl = (accessToken, type, cid) => {
  if (type === DESIGNDRAFT) {
    return `${location.origin}/sigma/design/${cid}`
  } else if (type === FLOWCHART) {
    return `${location.origin}/flow/${accessToken}`
  } else if (type === MIND_MAP) {
    return `${location.origin}/mind/share/${accessToken}`
  }
}

const getAccessList = (isOrgProject, locale) => compact([
  {
    value: 'public',
    label: I18N.sharingMenu.optionPublic[ locale ],
    accessLabel: I18N.sharingMenu.public[ locale ]
  },
  isOrgProject && {
    value: 'restricted',
    label: I18N.sharingMenu.optionRestricted[ locale ],
    accessLabel: I18N.sharingMenu.restricted[ locale ]
  },
  {
    value: 'private',
    label: I18N.sharingMenu.optionPrivate[ locale ],
    accessLabel: I18N.sharingMenu.private[ locale ]
  }
])

const createErrorWithPayload = (message, payload) => {
  const error = new Error(message)
  Object.assign(error, payload)
  return error
}

const fetchPutJSON = async (url, bodyObject) => {
  const result = await fetch(url, { method: 'PUT', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify(bodyObject) })
  if (!result.ok) throw createErrorWithPayload(`[fetchPutJSON] failed with ${result.status}: ${url}`, { ...await result.json(), status: result.status })
  return result.json()
}

const getRandomCid = prefix => `${prefix || ''}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`

export {
  getSharingUrl,
  getAccessList,
  getRandomCid,
  fetchPutJSON
}
