# 🎯 Bài tập thực hành Vue.js

## 📋 Tổng quan

Dưới đây là các bài tập thực hành để bạn củng cố kiến thức Vue.js dựa trên dự án Todo List.

## 🚀 Bước 1: Chạy dự án

```bash
# Install dependencies (nếu chưa cài)
npm install

# Chạy development server
npm run dev

# Mở trình duyệt và xem Todo List
```

## 📖 Bước 2: Đọc code

Hãy đọc các file sau để hiểu cách Vue.js hoạt động:

1. **src/App.vue** - Root component với state management
2. **src/components/TodoItem.vue** - Child component với props và emits
3. **src/types/todo.ts** - TypeScript types

## 🎓 Bước 3: Thực hành các bài tập

### Bài tập 1: Hiểu ref() và reactive()

**Mục tiêu:** Hiểu cách tạo reactive variable trong Vue

**Bài tập:**
1. Mở `src/App.vue`
2. Tìm `const newTask = ref('')`
3. Tìm `const todos = ref<Todo[]>([])`
4. Tìm `const darkMode = ref(false)`
5. Thêm một reactive variable mới: `const filterType = ref<'all' | 'active' | 'completed'>('all')`

**Angular equivalent:**
```typescript
// Angular
filterType = 'all'
```

**Vue 3:**
```typescript
const filterType = ref<'all' | 'active' | 'completed'>('all')
```

### Bài tập 2: Hiểu computed()

**Mục tiêu:** Hiểu cách tạo computed properties

**Bài tập:**
1. Mở `src/App.vue`
2. Tìm `const activeTodosCount = computed(...)`
3. Tìm `const filteredTodos = computed(...)`
4. Thêm một computed property mới: `const completedTodosCount = computed(() => todos.value.filter(t => t.completed).length)`

**Angular equivalent:**
```typescript
// Angular
completedTodosCount = computed(() => this.todos.filter(t => t.completed).length)
```

**Vue 3:**
```typescript
const completedTodosCount = computed(() =>
  todos.value.filter(t => t.completed).length
)
```

### Bài tập 3: Hiểu watch()

**Mục tiêu:** Hiểu cách theo dõi reactive variables

**Bài tập:**
1. Mở `src/App.vue`
2. Tìm `watch(todos, ...)`
3. Tìm `watch(darkMode, ...)`
4. Thêm một watch mới: `watch(filterType, (newFilter) => { console.log('Filter changed:', newFilter) })`

**Angular equivalent:**
```typescript
// Angular
constructor() {
  this.filterType$.subscribe(filter => {
    console.log('Filter changed:', filter)
  })
}
```

**Vue 3:**
```typescript
watch(filterType, (newFilter) => {
  console.log('Filter changed:', newFilter)
})
```

### Bài tập 4: Hiểu lifecycle hooks

**Mục tiêu:** Hiểu cách sử dụng lifecycle hooks

**Bài tập:**
1. Mở `src/App.vue`
2. Tìm `onMounted(() => ...)`
3. Thêm một lifecycle hook mới: `onUpdated(() => { console.log('Component updated') })`
4. Thêm một lifecycle hook mới: `onUnmounted(() => { console.log('Component unmounted') })`

**Angular equivalent:**
```typescript
ngOnInit() { console.log('Component initialized') }
ngOnChanges() { console.log('Component updated') }
ngOnDestroy() { console.log('Component destroyed') }
```

**Vue 3:**
```typescript
onMounted(() => { console.log('Component mounted') })
onUpdated(() => { console.log('Component updated') })
onUnmounted(() => { console.log('Component unmounted') })
```

### Bài tập 5: Hiểu Template Syntax

**Mục tiêu:** Hiểu cách sử dụng directives trong template

**Bài tập:**
1. Mở `src/App.vue`
2. Tìm `v-model="newTask"`
3. Tìm `v-if="filteredTodos.length === 0"`
4. Tìm `v-for="todo in filteredTodos"`
5. Tìm `@click="addTask"`
6. Tìm `:class="['class1', 'class2']"`
7. Tìm `:style="{ color: darkMode ? 'white' : 'black' }"`

**Angular equivalent:**
```html
<input [(ngModel)]="newTask" />
<div *ngIf="filteredTodos.length === 0">...</div>
<div *ngFor="let todo of filteredTodos">{{ todo.text }}</div>
<button (click)="addTask()">Add</button>
<div [ngClass]="['class1', 'class2']">...</div>
<div [style.color]="darkMode ? 'white' : 'black'">...</div>
```

**Vue 3:**
```html
<input v-model="newTask" />
<div v-if="filteredTodos.length === 0">...</div>
<div v-for="todo in filteredTodos" :key="todo.id">{{ todo.text }}</div>
<button @click="addTask">Add</button>
<div :class="['class1', 'class2']">...</div>
<div :style="{ color: darkMode ? 'white' : 'black' }">...</div>
```

### Bài tập 6: Hiểu Component System

**Mục tiêu:** Hiểu cách tạo và sử dụng component

**Bài tập:**
1. Mở `src/components/TodoItem.vue`
2. Tìm `defineProps<Props>()`
3. Tìm `defineEmits<...>()`
4. Tìm `emit('toggleTodo', props.todo)`
5. Tìm `emit('deleteTodo', props.todo.id)`

**Angular equivalent:**
```typescript
@Component({
  selector: 'app-todo-item'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleTodo = new EventEmitter<Todo>();
  @Output() deleteTodo = new EventEmitter<number>();
}
```

**Vue 3:**
```typescript
const props = defineProps<Props>()
const emit = defineEmits<...>()
emit('toggleTodo', props.todo)
emit('deleteTodo', props.todo.id)
```

## 🎯 Bước 4: Tùy chỉnh dự án

### Tùy chỉnh 1: Thêm filter theo priority

**Mục tiêu:** Thêm tính năng filter theo priority

**Bài tập:**
1. Thêm `priority` field vào `Todo` type trong `src/types/todo.ts`:
```typescript
export interface Todo {
  id: number
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: number
}
```

2. Thêm filter buttons trong `src/App.vue`:
```html
<div class="flex gap-2 mb-6">
  <button
    @click="setFilter('all')"
    :class="['px-4 py-2 rounded', activeFilter === 'all' ? 'bg-blue-500' : 'bg-gray-200']"
  >
    All
  </button>
  <button
    @click="setFilter('active')"
    :class="['px-4 py-2 rounded', activeFilter === 'active' ? 'bg-blue-500' : 'bg-gray-200']"
  >
    Active
  </button>
  <button
    @click="setFilter('completed')"
    :class="['px-4 py-2 rounded', activeFilter === 'completed' ? 'bg-blue-500' : 'bg-gray-200']"
  >
    Completed
  </button>
</div>
```

### Tùy chỉnh 2: Thêm sort functionality

**Mục tiêu:** Thêm tính năng sort

**Bài tập:**
1. Thêm sort state trong `src/App.vue`:
```typescript
const sortBy = ref<'createdAt' | 'text' | 'priority'>('createdAt')
```

2. Thêm sort buttons trong template:
```html
<div class="flex gap-2 mb-6">
  <button
    @click="sortBy = 'createdAt'"
    :class="['px-4 py-2 rounded', sortBy === 'createdAt' ? 'bg-blue-500' : 'bg-gray-200']"
  >
    Created At
  </button>
  <button
    @click="sortBy = 'text'"
    :class="['px-4 py-2 rounded', sortBy === 'text' ? 'bg-blue-500' : 'bg-gray-200']"
  >
    Text
  </button>
  <button
    @click="sortBy = 'priority'"
    :class="['px-4 py-2 rounded', sortBy === 'priority' ? 'bg-blue-500' : 'bg-gray-200']"
  >
    Priority
  </button>
</div>
```

3. Thêm sort logic trong computed:
```typescript
const sortedTodos = computed(() => {
  let result = [...filteredTodos.value]
  
  switch (sortBy.value) {
    case 'createdAt':
      result.sort((a, b) => b.createdAt - a.createdAt)
      break
    case 'text':
      result.sort((a, b) => a.text.localeCompare(b.text))
      break
    case 'priority':
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      result.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
      break
  }
  
  return result
})
```

4. Sử dụng `sortedTodos` thay vì `filteredTodos` trong template

### Tùy chỉnh 3: Thêm dark mode toggle

**Mục tiêu:** Thêm dark mode toggle

**Bài tập:**
1. Thêm dark mode toggle button trong `src/App.vue`:
```html
<button
  @click="toggleTheme"
  class="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
  :class="darkMode ? 'text-white' : 'text-gray-800'"
>
  {{ darkMode ? '☀️' : '🌙' }}
</button>
```

### Tùy chỉnh 4: Thêm task priority

**Mục tiêu:** Thêm priority cho task

**Bài tập:**
1. Thêm priority selector trong input section:
```html
<select v-model="newTaskPriority" class="px-4 py-3 rounded-[12px]">
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
```

2. Thêm `newTaskPriority` state:
```typescript
const newTaskPriority = ref<'low' | 'medium' | 'high'>('medium')
```

3. Cập nhật `addTask` function:
```typescript
const addTask = () => {
  const text = newTask.value.trim()
  if (!text) return

  todos.value.push({
    id: Date.now(),
    text,
    completed: false,
    priority: newTaskPriority.value,
    createdAt: Date.now(),
  })

  newTask.value = ''
  newTaskPriority.value = 'medium'
}
```

## 🎓 Bước 5: Refactor code

**Mục tiêu:** Tối ưu code với Composition API

**Bài tập:**
1. Tách state management ra khỏi component
2. Tạo `useTodoStore()` composable
3. Tạo `useLocalStorage()` composable
4. Tạo `useTheme()` composable

**Angular equivalent:**
```typescript
// Angular
@Injectable()
export class TodoService {
  todos$ = this.http.get<Todo[]>('/api/todos')
  addTodo(todo: Todo) { ... }
  deleteTodo(id: number) { ... }
}

@Component({
  selector: 'app-todo',
  template: `...`
})
export class TodoComponent implements OnInit {
  todos$ = this.todoService.todos$
  constructor(private todoService: TodoService) {}
}
```

**Vue 3:**
```typescript
// useTodoStore.ts
import { ref } from 'vue'

export function useTodoStore() {
  const todos = ref<Todo[]>([])
  const addTodo = (todo: Todo) => { ... }
  const deleteTodo = (id: number) => { ... }
  return { todos, addTodo, deleteTodo }
}

// App.vue
<script setup lang="ts">
import { useTodoStore } from './composables/useTodoStore'

const { todos, addTodo, deleteTodo } = useTodoStore()
</script>
```

## 📊 Bước 6: Test code

**Mục tiêu:** Kiểm tra code hoạt động đúng

**Bài tập:**
1. Chạy `npm run dev`
2. Test tất cả tính năng:
   - Thêm task mới
   - Toggle completed
   - Xóa task
   - Edit task
   - Filter tasks
   - Dark mode
   - LocalStorage persistence

3. Kiểm tra console logs:
```typescript
// TodoItem.vue
const toggleTodo = () => {
  if (!isEditing.value) {
    console.log('[Child] 📤 Đang gửi sự kiện: toggleTodo', props.todo)
    emit('toggleTodo', props.todo)
  }
}
```

## 🎉 Bước 7: Tạo tài liệu

**Mục tiêu:** Tạo tài liệu cho dự án

**Bài tập:**
1. Tạo README.md với hướng dẫn sử dụng
2. Tạo API documentation cho components
3. Tạo tutorial cho từng feature
4. Tạo cheat sheet cho Angular vs Vue

## 💡 Lời khuyên

- Thực hành từng bài tập một cách có hệ thống
- Sử dụng kiến thức Angular để so sánh
- Đọc comment trong code - chúng so sánh Angular vs Vue
- Tùy chỉnh dự án để củng cố kiến thức
- Tạo tài liệu để ghi nhớ kiến thức

## 🎓 Tài liệu tham khảo

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 TypeScript Guide](https://vuejs.org/guide/typescript/composition-api.html)
- [Vite Documentation](https://vitejs.dev/)

## 🎉 Chúc bạn thực hành vui vẻ!

Hãy thử từng bài tập và tùy chỉnh dự án để củng cố kiến thức Vue.js. Sử dụng kiến thức Angular của bạn để học Vue nhanh hơn!