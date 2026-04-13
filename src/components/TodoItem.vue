<template lang="">
  <li class="todo-item">
    <span v-bind:class="{ completed: todo.completed }">{{ todo.text }}</span>
    <button @click="deleteTodo(todo)">Delete</button>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['todo'],
  methods: {
    deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    }
  }
};
</script>

<style scoped>
.todo-item.completed {
  text-decoration: line-through;
}
</style>
