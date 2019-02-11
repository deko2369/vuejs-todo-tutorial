// https://jp.vuejs.org/v2/examples/todomvc.html
const STORAGE_KEY = 'todos-vuejs-demo'

export default class TodoStorage {
  static uid;
  
  static fetch() {
    const todos = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function (todo, index) {
      todo.id = index;
    })
    this.uid = todos.length;
    return todos;
  }
  
  static save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}