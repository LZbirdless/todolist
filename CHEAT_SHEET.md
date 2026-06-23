# 📝 Vue.js Cheat Sheet - Angular Developer

## 🎯 Quick Reference

### Reactive System

| Angular | Vue 3 | Example |
|---------|-------|---------|
| `signal()` / `@Input()` | `ref()` | `const count = ref(0)` |
| `signal()` (object) | `reactive()` | `const state = reactive({ count: 0 })` |
| `computed()` | `computed()` | `const doubled = computed(() => count.value * 2)` |
| `effect()` | `watch()` | `watch(count, (newVal) => console.log(newVal))` |
| RxJS subscription | `watch()` | `watch(todos, (newTodos) => { ... }, { deep: true })` |

### Lifecycle Hooks

| Angular | Vue 3 | Example |
|---------|-------|---------|
| `ngOnInit()` | `onMounted()` | `onMounted(() => { ... })` |
| `ngOnChanges()` | `onUpdated()` | `onUpdated(() => { ... })` |
| `ngOnDestroy()` | `onUnmounted()` | `onUnmounted(() => { ... })` |

### Template Syntax

| Angular | Vue 3 | Example |
|---------|-------|---------|
| `[(ngModel)]` | `v-model` | `<input v-model="text" />` |
| `*ngIf` | `v-if` | `<div v-if="visible">...</div>` |
| `[style.display]` | `v-show` | `<div v-show="visible">...</div>` |
| `*ngFor` | `v-for` | `<div v-for="item in items">{{ item }}</div>` |
| `(click)` | `@click` | `<button @click="handleClick">Click</button>` |
| `[ngClass]` | `:class` | `<div :class="['class1', 'class2']">...</div>` |
| `[style]` | `:style` | `<div :style="{ color: 'red' }">...</div>` |
| `{{ variable }}` | `{{ variable }}` | `<div>{{ message }}</div>` |

### Component System

| Angular | Vue 3 | Example |
|---------|-------|---------|
| `@Input()` | `defineProps()` | `const props = defineProps<Props>()` |
| `@Output()` | `defineEmits()` | `const emit = defineEmits<Emits>()` |
| `@Component()` | `<script setup>` | `<script setup lang="ts">` |

### TypeScript

| Angular | Vue 3 | Example |
|---------|-------|---------|
| `@Input() todo!: Todo` | `defineProps<Props>()` | `interface Props { todo: Todo }` |
| `@Output() event = new EventEmitter()` | `defineEmits<Emits>()` | `interface Emits { event: [value: string] }` |

## 🎓 Key Concepts

### 1. ref() - Primitive Values

```typescript
import { ref } from 'vue'

// String
const name = ref('Vue')

// Number
const count = ref(0)

// Boolean
const isActive = ref(true)

// Array
const items = ref<string[]>([])

// Object
const user = ref({ name: 'Vue', age: 30 })

// Access in script
console.log(name.value) // 'Vue'
console.log(count.value) // 0

// Access in template (no .value needed)
<template>
  <div>{{ name }}</div>
  <div>{{ count }}</div>
</template>
```

### 2. reactive() - Objects

```typescript
import { reactive } from 'vue'

const state = reactive({
  name: 'Vue',
  count: 0,
  isActive: true,
  items: []
})

// Access in script
console.log(state.name) // 'Vue'
console.log(state.count) // 0

// Access in template
<template>
  <div>{{ state.name }}</div>
  <div>{{ state.count }}</div>
</template>
```

### 3. computed() - Derived State

```typescript
import { computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

const todos = ref([
  { id: 1, text: 'Learn Vue', completed: false },
  { id: 2, text: 'Build app', completed: true }
])

const activeTodos = computed(() => todos.value.filter(t => !t.completed))
const completedTodos = computed(() => todos.value.filter(t => t.completed))

// Access in template
<template>
  <div>{{ doubled }}</div>
  <div>{{ activeTodos.length }}</div>
</template>
```

### 4. watch() - Side Effects

```typescript
import { watch } from 'vue'

const count = ref(0)

// Watch single value
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`)
})

// Watch reactive object (deep: true)
const state = reactive({ count: 0, name: 'Vue' })
watch(state, (newState) => {
  console.log('State changed:', newState)
}, { deep: true })

// Watch multiple values
watch([count, state], ([newCount, newState]) => {
  console.log('Count:', newCount, 'Name:', newState.name)
})
```

### 5. Lifecycle Hooks

```typescript
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component mounted')
  // Load data from localStorage
  // Initialize subscriptions
})

onUpdated(() => {
  console.log('Component updated')
  // Update DOM
  // Log changes
})

onUnmounted(() => {
  console.log('Component unmounted')
  // Cleanup subscriptions
  // Remove event listeners
})
```

### 6. Template Directives

```html
<!-- v-model - Two-way binding -->
<input v-model="text" />

<!-- v-if - Conditional rendering (remove from DOM) -->
<div v-if="visible">Visible</div>

<!-- v-show - Conditional rendering (CSS toggle) -->
<div v-show="visible">Visible</div>

<!-- v-for - List rendering -->
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>

<!-- @click - Event handling -->
<button @click="handleClick">Click</button>

<!-- :class - Class binding -->
<div :class="['class1', 'class2', isActive ? 'active' : '']">...</div>

<!-- :style - Style binding -->
<div :style="{ color: 'red', fontSize: '16px' }">...</div>

<!-- v-once - One-time binding -->
<div v-once>{{ staticText }}</div>

<!-- v-pre - Skip compilation -->
<div v-pre>{{ code }}</div>
```

### 7. Component Props

```typescript
// TodoItem.vue
<script setup lang="ts">
import type { Todo } from '@/types/todo'

interface Props {
  todo: Todo
  darkMode?: boolean
  priority?: 'low' | 'medium' | 'high'
}

const props = withDefaults(defineProps<Props>(), {
  darkMode: false,
  priority: 'medium'
})
</script>

<template>
  <div :class="['todo-item', props.darkMode ? 'dark' : 'light']">
    {{ props.todo.text }}
  </div>
</template>
```

### 8. Component Emits

```typescript
// TodoItem.vue
<script setup lang="ts">
const emit = defineEmits<{
  toggleTodo: [todo: Todo]
  deleteTodo: [id: number]
  updateTodo: [id: number, text: string]
}>()

const handleToggle = () => {
  emit('toggleTodo', props.todo)
}

const handleDelete = () => {
  emit('deleteTodo', props.todo.id)
}
</script>

<template>
  <button @click="handleToggle">Toggle</button>
  <button @click="handleDelete">Delete</button>
</template>
```

### 9. Composables - Reusable Logic

```typescript
// useLocalStorage.ts
import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const stored = localStorage.getItem(key)
  const value = ref(stored ? JSON.parse(stored) : initialValue)

  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return value
}

// App.vue
<script setup lang="ts">
import { useLocalStorage } from './composables/useLocalStorage'

const todos = useLocalStorage('todos', [])
const theme = useLocalStorage('theme', 'light')
</script>
```

## 🎯 Common Patterns

### Pattern 1: Form Handling

```typescript
// Script
const formData = reactive({
  name: '',
  email: '',
  age: 0
})

const handleSubmit = () => {
  console.log(formData)
  // Submit to API
}

// Template
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formData.name" placeholder="Name" />
    <input v-model="formData.email" type="email" placeholder="Email" />
    <input v-model.number="formData.age" type="number" placeholder="Age" />
    <button type="submit">Submit</button>
  </form>
</template>
```

### Pattern 2: List Management

```typescript
// Script
const items = ref<string[]>([])
const newItem = ref('')

const addItem = () => {
  if (newItem.value.trim()) {
    items.value.push(newItem.value.trim())
    newItem.value = ''
  }
}

const removeItem = (index: number) => {
  items.value.splice(index, 1)
}

// Template
<template>
  <div>
    <input v-model="newItem" @keyup.enter="addItem" />
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button @click="removeItem(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>
```

### Pattern 3: Conditional Rendering

```typescript
// Script
const isVisible = ref(true)
const isLoggedIn = ref(false)
const error = ref<string | null>(null)

// Template
<template>
  <div v-if="isVisible">Visible</div>
  <div v-else>Hidden</div>
  
  <div v-if="isLoggedIn">
    Welcome, User!
  </div>
  <div v-else>
    Please login
  </div>
  
  <div v-if="error" class="error">
    {{ error }}
  </div>
  <div v-else>
    No errors
  </div>
</template>
```

### Pattern 4: Dynamic Styling

```typescript
// Script
const isActive = ref(false)
const count = ref(0)

// Template
<template>
  <div :class="['button', isActive ? 'active' : 'inactive']">
    Button
  </div>
  
  <div :style="{
    color: isActive ? 'green' : 'red',
    fontSize: count > 5 ? '20px' : '16px'
  }">
    Dynamic Style
  </div>
</template>
```

## 🎓 Best Practices

1. **Use `ref()` for primitive values, `reactive()` for objects**
2. **Always use `:key` in `v-for`**
3. **Type your props and emits**
4. **Use `computed()` for derived state**
5. **Use `watch()` for side effects**
6. **Clean up in `onUnmounted()`**
7. **Use `<script setup>` for cleaner code**
8. **Create composables for reusable logic**

## 🎓 Angular to Vue Migration

### Component Migration

**Angular:**
```typescript
@Component({
  selector: 'app-todo',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.text }}
    </div>
  `
})
export class TodoComponent implements OnInit {
  @Input() todos: Todo[] = []
  @Output() delete = new EventEmitter<number>()
  
  ngOnInit() {
    this.loadTodos()
  }
  
  loadTodos() {
    // Load data
  }
}
```

**Vue 3:**
```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Todo } from '@/types/todo'

const todos = ref<Todo[]>([])

const deleteTodo = (id: number) => {
  emit('delete', id)
}

onMounted(() => {
  loadTodos()
})

const loadTodos = () => {
  // Load data
}
</script>

<template>
  <div v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </div>
</template>
```

## 🎓 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 TypeScript Guide](https://vuejs.org/guide/typescript/composition-api.html)
- [Vite Documentation](https://vitejs.dev/)
- [VueUse](https://vueuse.org/) - Collection of Vue composition utilities

## 🎉 Happy Coding!

This cheat sheet should help you quickly reference Vue.js concepts while learning. Use your Angular knowledge to understand Vue faster!