<template>
  <div class="task-list">
    <h2>Task List</h2>
    <input
      type="text"
      v-model="description"
      placeholder="Type new task!"
      @keyup.enter="createTask">
    <ul>
      <task-list-item
        v-for="edge in tasks"
        :key="edge.cursor"
        v-bind="edge.node"
        :logged-size="edge.node.logs.length"
      />
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TaskListItem from '@/components/TaskListItem'
export default {
  name: 'TaskList',

  components: {
    TaskListItem,
  },

  data() {
    return {
      description: '',
      estimatedSize: 5,
    }
  },
  created() {
    this.getTasks({ first: 20 })
  },

  computed: mapState({
    tasks: state => state.tasks.edges,
  }),

  methods: {
    ...mapActions({
      getTasks: 'tasks',
      async createTask(dispatch) {
        try {
          await dispatch('createTask', this.$data)
        } catch (error) {
          return
        }
        this.description = ''
      },
    }),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
