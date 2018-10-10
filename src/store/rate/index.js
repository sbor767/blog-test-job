export function isExist(store, commentId, userId) {
  // return !!store.rates[comentId][userId]
  // @TODO Move this to Rest API
  return !!Object.keys(store.rates).filter(key => store.rates.key.commentId === commentId && store.rates.key.userId === userId)
}