<template>
  <div class="p-2">
    <dragable-tree @drop="handleDrop">
      <el-table :data="tree" row-key="_id">
        <el-table-column label="Category" prop="category"> </el-table-column>
        <!-- <el-table-column
          label="Desciption"
          prop="description"
          show-overflow-tooltip
        >
        </el-table-column> -->
      </el-table>
    </dragable-tree>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { findItemInTree, generateIndex } from '@/utils'
import DragableTree from '~/components/DragableTree.vue'

export default {
  components: { DragableTree },
  async asyncData({ $axios }) {
    const tree = await $axios.$get('http://localhost:3001/work-items/tree', {
      params: {
        query: {},
      },
    })
    generateIndex(tree)
    return { tree }
  },

  methods: {
    async handleDrop({ newIndex, oldIndex }) {
      const backup = cloneDeep(this.tree)
      try {
        const oldPos = findItemInTree(this.tree, (e) => e.index === oldIndex)
        const newPos = findItemInTree(this.tree, (e) => e.index === newIndex)
        // Move
        oldPos.tree.splice(oldPos.index, 1)
        newPos.tree.splice(newPos.index, 0, oldPos.item)
        generateIndex(this.tree)

        const link = { from: newPos.ctx.parent._id, to: oldPos.item._id }
        const result = await this.$axios.$post(
          'http://localhost:3001/relations/add',
          link
        )
        console.log(link, result)
      } catch (error) {
        this.tree = backup
      }
    },
  },
}
</script>

<style>
.p-2 {
  padding: 2rem;
}
</style>
