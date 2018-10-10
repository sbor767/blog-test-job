export const getNewObjectIdKey = obj => Object.keys(obj).length ? Math.max.apply(null, Object.keys(obj)) + 1 : 1
