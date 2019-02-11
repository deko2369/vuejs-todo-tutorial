<template>
  <div id="todo">
    <table>
      <thead>
      <tr>
        <th class="id">ID</th>
        <th class="comment">Comment</th>
        <th class="state">State</th>
        <th class="button">-</th>
      </tr>
      </thead>
      <tbody>
      <tr v-bind:key="item.id" v-for="item in computedTodos">
        <th>{{ item.id }}</th>
        <td>{{ item.comment }}</td>
        <td class="state">
          <button v-on:click="doChangeState(item)">{{ labels[item.state] }}</button>
        </td>
        <td class="button">
          <button v-on:click.ctrl="doRemove(item)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <h2>Add New TODO</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
      Comment: <input ref="comment" type="text">
      <button type="submit">Add</button>
    </form>

    <label v-for="label in options">
      <input type="radio" v-bind:value="label.value" v-model="current">
      {{label.label}}
    </label>

    <p>Displaying {{ computedTodos.length }} todos.</p>
  </div>
</template>

<script>
  import TodoStorage from "@/lib/todo_storage";

  export default {
    name: "Todo",
    data: function () {
      return {
        todos: [],
        options: [
          {value: -1, label: 'all'},
          {value: 0, label: 'doing'},
          {value: 1, label: 'done'}
        ],
        current: -1
      };
    },
    methods: {
      doAdd: function (event, value) {
        const comment = this.$refs.comment;
        if (!comment.value.length) {
          return;
        }
        this.todos.push({
          id: TodoStorage.uid++,
          comment: comment.value,
          state: 0
        });

        comment.value = '';
      },
      doChangeState: function (item) {
        item.state = item.state ? 0 : 1;
      },
      doRemove: function (item) {
        const index = this.todos.indexOf(item);
        this.todos.splice(index, 1);
      }
    },
    watch: {
      todos: {
        handler: function (todos) {
          TodoStorage.save(todos);
        },
        deep: true
      }
    },
    created() {
      this.todos = TodoStorage.fetch();
    },
    computed: {
      computedTodos: function () {
        return this.todos.filter(function (el) {
          return this.current < 0 ? true : this.current === el.state;
        }, this);
      },
      labels: function () {
        return this.options.reduce(function (a, b) {
          return Object.assign(a, {[b.value]: b.label});
        });
      }
    }
  };
</script>

<style scoped>

</style>