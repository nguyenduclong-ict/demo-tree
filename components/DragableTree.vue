<script>
import ElTableDraggable from 'element-ui-el-table-draggable'
import sortable from 'sortablejs'

export default {
  extends: ElTableDraggable,
  methods: {
    makeTableSortAble() {
      const table = this.$children[0].$el.querySelector(
        '.el-table__body-wrapper tbody'
      )
      sortable.create(table, {
        nested: true,
        handle: this.handle,
        animation: this.animate,
        group: 'el-table__row',
        onStart: () => {
          this.$emit('drag')
        },
        onEnd: ({ newIndex, oldIndex }) => {
          this.keepWrapperHeight(true)
          this.$emit('drop', { newIndex, oldIndex })
        },
      })
    },
  },
}
</script>
