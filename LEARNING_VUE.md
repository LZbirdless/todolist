# 🎓 Học Vue.js trong 1 ngày - Angular Developer Guide

## 📋 Tổng quan

Dự án này được thiết kế để bạn học Vue.js trong 1 ngày dựa trên nền tảng Angular 12+ của bạn.

## 🎯 Mục tiêu học tập

- [x] Hiểu Composition API (ref, computed, watch, lifecycle)
- [x] Hiểu Template Syntax (v-model, v-if, v-for, directives)
- [x] Hiểu Component System (props, emits)
- [ ] Thực hành với dự án Todo List
- [ ] Tùy chỉnh và mở rộng dự án

## 📚 So sánh Angular vs Vue

### 1. Reactive System

| Angular | Vue 3 | Ghi chú |
|---------|-------|---------|
| `signal()` / `@Input()` | `ref()` | ref() cho primitive values |
| `signal()` (object) | `reactive()` | reactive() cho objects |
| `computed()` | `computed()` | computed properties |
| `effect()` | `watch()` | watch side effects |
| RxJS subscription | `watch()` | watch reactive variables |

**Ví dụ Angular:**
```typescript
// Angular 16+ Signals
newTask = signal('')
todos = signal<Todo[]>([])

// Angular cũ
newTask = ''
todos: Todo[] = []
```

**Ví dụ Vue 3:**
```typescript
import { ref, computed, watch } from 'vue'

const newTask = ref('')
const todos = ref<Todo[]>([])

const activeTodosCount = computed(() =>
  todos.value.filter(t => !t.completed).length
)

watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })
```

### 2. Lifecycle Hooks

| Angular | Vue 3 | Ghi chú |
|---------|-------|---------|
| `ngOnInit()` | `onMounted()` | Component mounted |
| `ngOnChanges()` | `onUpdated()` | Component updated |
| `ngOnDestroy()` | `onUnmounted()` | Component unmounted |

**Ví dụ Angular:**
```typescript
ngOnInit() {
  this.loadFromStorage()
}

ngOnDestroy() {
  this.subscription.unsubscribe()
}
```

**Ví dụ Vue 3:**
```typescript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
})

onUnmounted(() => {
  // Cleanup
})
```

### 3. Template Syntax

| Angular | Vue 3 | Ghi chú |
|---------|-------|---------|
| `[(ngModel)]` | `v-model` | Two-way binding |
| `*ngIf` | `v-if` | Conditional rendering (remove from DOM) |
| `[style.display]` | `v-show` | Conditional rendering (CSS toggle) |
| `*ngFor` | `v-for` | List rendering |
| `(click)` | `@click` | Event handling |
| `[ngClass]` | `:class` | Class binding |
| `[style]` | `:style` | Style binding |
| `{{ variable }}` | `{{ variable }}` | Interpolation |

**Ví dụ Angular:**
```html
<input [(ngModel)]="newTask" />
<div *ngIf="todo.completed">...</div>
<div [style.display]="todo.completed ? 'block' : 'none'">...</div>
<div *ngFor="let todo of todos">{{ todo.text }}</div>
<button (click)="addTask()">Add</button>
<div [ngClass]="['class1', 'class2']">...</div>
<div [style.color]="darkMode ? 'white' : 'black'">...</div>
```

**Ví dụ Vue 3:**
```html
<input v-model="newTask" />
<div v-if="todo.completed">...</div>
<div v-show="todo.completed">...</div>
<div v-for="todo in todos" :key="todo.id">{{ todo.text }}</div>
<button @click="addTask">Add</button>
<div :class="['class1', 'class2']">...</div>
<div :style="{ color: darkMode ? 'white' : 'black' }">...</div>
```

### 4. Component System

| Angular | Vue 3 | Ghi chú |
|---------|-------|---------|
| `@Input()` | `defineProps()` | Nhận props từ parent |
| `@Output()` | `defineEmits()` | Emit events lên parent |
| `@Component()` | `<script setup>` | Component definition |

**Ví dụ Angular:**
```typescript
@Component({
  selector: 'app-todo-item',
  template: `...`
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Input() darkMode: boolean = false;
  
  @Output() toggleTodo = new EventEmitter<Todo>();
  @Output() deleteTodo = new EventEmitter<number>();
}
```

**Ví dụ Vue 3:**
```typescript
// TodoItem.vue
<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '@/types/todo'

interface Props {
  todo: Todo
  darkMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  darkMode: false,
})

const emit = defineEmits<{
  toggleTodo: [todo: Todo]
  deleteTodo: [id: number]
}>()

const toggleTodo = () => {
  emit('toggleTodo', props.todo)
}

const deleteTodo = () => {
  emit('deleteTodo', props.todo.id)
}
</script>

<template>
  <li :class="['task-item', props.darkMode ? 'dark' : 'light']">
    <div @click="toggleTodo">{{ todo.text }}</div>
    <button @click="deleteTodo">Delete</button>
  </li>
</template>
```

## 🚀 Cách chạy dự án

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Cấu trúc dự án

```
todolist/
├── src/
│   ├── App.vue              # Root component
│   ├── main.ts              # Entry point
│   ├── components/          # Component files
│   │   ├── Sidebar.vue
│   │   ├── TaskAlert.vue
│   │   └── TodoItem.vue
│   ├── types/               # TypeScript types
│   │   └── todo.ts
│   └── style.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML entry
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎯 Các bước học

### Buổi sáng: Composition API

1. **ref()** - Tạo reactive variable cho primitive values
2. **reactive()** - Tạo reactive object
3. **computed()** - Tạo computed properties
4. **watch()** - Theo dõi reactive variables
5. **Lifecycle hooks** - onMounted, onUpdated, onUnmounted

### Buổi trưa: Template Syntax

1. **v-model** - Two-way binding
2. **v-if vs v-show** - Conditional rendering
3. **v-for** - List rendering
4. **v-bind** - Binding attributes
5. **v-on** - Event handling

### Buổi chiều: Component System

1. **defineProps()** - Nhận props
2. **defineEmits()** - Emit events
3. **TypeScript integration** - Type-safe props và emits

### Buổi tối: Thực hành

1. **Đọc code** - Xem code hiện tại
2. **Chạy dev** - Test Todo List
3. **Tùy chỉnh** - Thêm tính năng mới
4. **Refactor** - Tối ưu code

## 💡 Lợi ích khi chuyển từ Angular sang Vue

1. **Code gọn gàng hơn** - Không cần `this`, không cần decorators
2. **Type-safe** - Vue 3 + TypeScript = Angular type-safe
3. **Performance tốt hơn** - Tree-shaking, Composition API
4. **Ecosystem hiện đại** - Vite, Pinia, Vue Router, VueUse
5. **Học nhanh hơn** - Cùng concept, khác syntax

## 🎓 Tài liệu tham khảo

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 TypeScript Guide](https://vuejs.org/guide/typescript/composition-api.html)
- [Vite Documentation](https://vitejs.dev/)

## 📝 Ghi chú

- Dự án Todo List đã có sẵn code với comment so sánh Angular vs Vue
- Sử dụng kiến thức Angular của bạn để hiểu Vue nhanh hơn
- Thực hành từng concept một cách có hệ thống
- Tùy chỉnh dự án để củng cố kiến thức

## 🎉 Chúc bạn học vui vẻ!

Vue.js rất thú vị và dễ học, đặc biệt với nền tảng Angular của bạn. Hãy tận dụng kiến thức Angular để học Vue nhanh hơn!