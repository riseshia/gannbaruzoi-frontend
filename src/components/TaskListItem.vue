<template>
  <li class="task">
    <input type="checkbox" v-model="instanceStatus">

    <label>
      ( {{ loggedSize }} /<span contenteditable @keydown.enter.prevent.stop="updateEstimatedSize">
      {{ estimatedSize }}
      </span>)
      <span contenteditable @keydown.enter.prevent.stop="updateDescription">
        {{ description }}</span>
      <a href="#" @click.prevent="deleteTask">[x]</a>
    </label>
  </li>
</template>

<script>
export default {
  name: 'task-list-item',

  props: {
    taskId: Number,
    description: String,
    estimatedSize: Number,
    type: String,
    loggedSize: Number,
    status: Boolean
  },
  data () {
    return {
      instanceStatus: this.status
    }
  },
  watch: {
    instanceStatus: {
      handler: 'onInstanceStatusChanged',
      immediate: true,
      deep: false
    }
  },
  methods: {
    onInstanceStatusChanged (newVal) {
      this.$emit('updateTask', { id: this.taskId, status: newVal })
    },
    updateDescription (e) {
      this.$emit('updateTask', {
        description: e.target.innerText,
        id: this.taskId
      })
    },
    updateEstimatedSize (e) {
      this.$emit('updateTask', {
        estimatedSize: e.target.innerText,
        id: this.taskId
      })
    },
    deleteTask () {
      this.$emit('deleteTask', { id: this.taskId })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
