export const generateIndex = (list, ctx = { index: -1 }) => {
  list.forEach((element) => {
    ctx.index++
    element.index = ctx.index
    if (element.children) {
      generateIndex(element.children, ctx)
    }
  })
}

export const findItemInTree = (
  tree = [],
  compare,
  ctx = { childrenKey: 'children', parent }
) => {
  for (let index = 0; index < tree.length; index++) {
    const item = tree[index]

    if (compare(item)) {
      return { item, index, tree, ctx }
    }

    if (item[ctx.childrenKey]) {
      const childResult = findItemInTree(item[ctx.childrenKey], compare, {
        ...ctx,
        parent: item,
      })

      if (childResult.item) {
        return childResult
      }
    }
  }
  return { tree, ctx }
}
