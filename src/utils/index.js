export {default as reducer} from './reducer'

export const getNewObjectIdKey = obj => Object.keys(obj).length ? Math.max.apply(null, Object.keys(obj)) + 1 : 1

export const getStringFromTimestamp = ts => {
  const d = new Date(ts * 1000)
  const z = num => ('0' + num).slice(-2)
  return `${d.getFullYear()}-${z(d.getMonth())}-${z(d.getDate())} ${z(d.getHours())}:${z(d.getMinutes())}`
}