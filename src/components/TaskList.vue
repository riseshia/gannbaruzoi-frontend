<template>
  <div class="task-list">
    <h2>Task List</h2>
    <input
      type="text"
      :value="newTaskDescription"
      placeholder="Type new task!"
      @input="updateNewTaskDescription"
      @keyup.enter="createTask">
    <ul>
      <task-list-item
        v-for="edge in tasks"
        :key="edge.cursor"
        v-bind="edge.node"
      />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TaskListItem from './TaskListItem'
export default {
  name: 'task-list',

  components: {
    TaskListItem
  },

  created () {
    this.$store.dispatch('TASKS', { first: 20 })
  },

  computed: mapState({
    tasks: state => state.tasks.edges,
    newTaskDescription: state => state.newTask.description
  }),

  methods: {
    createTask () {
      this.$store.dispatch('CREATE_TASK')
    },

    updateNewTaskDescription (e) {
      this.$store.commit('UPDATE_NEW_TASK', {
        description: e.target.value
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
