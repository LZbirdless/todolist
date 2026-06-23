<script setup lang="ts">
/**
 * App.vue - Component chính, nơi mọi thứ hội tụ
 *
 * 💡 Angular equivalent:
 * - AppComponent là root component (giống App.vue trong Vue)
 * - main.ts: createApp(App).mount('#app')
 * - Angular: appModule.bootstrap([AppComponent])
 */
import { ref, computed, watch, onMounted } from 'vue'
import type { Todo, FilterType } from '@/types/todo'
import Sidebar from '@/components/Sidebar.vue'
import TodoItem from '@/components/TodoItem.vue'

// ========================================
// STATE MANAGEMENT với ref()
// ========================================

/**
 * ref<T>() - tạo reactive variable cho primitive values
 *
 * 💡 Angular equivalent:
 * ```typescript
 * // Angular 16+ Signals
 * newTask = signal('')
 * todos = signal<Todo[]>([])
 * darkMode = signal(false)
 *
 * // Angular cũ
 * newTask = ''
 * todos: Todo[] = []
 * darkMode = false
 * ```
 *
 * QUAN TRỌNG: ref() wrapper cho value, truy cập bằng .value trong script
 * Nhưng trong template, Vue tự unwrap (không cần .value)!
 */
const newTask = ref('')
const todos = ref<Todo[]>([])
const darkMode = ref(false)
const sidebarCollapsed = ref(false)
const activeFilter = ref<FilterType>('all')

// ========================================
// COMPUTED PROPERTIES
// ========================================

/**
 * computed() - tạo giá trị derived tự động update khi dependency thay đổi
 *
 * 💡 Angular equivalent:
 * ```typescript
 * // Angular 16+ Signals
 * activeTodosCount = computed(() =>
 *   todos.value.filter(t => !t.completed).length
 * )
 *
 * // Angular cũ với rxjs
 * activeTodosCount$ = todos$.pipe(
 *   map(todos => todos.filter(t => !t.completed).length)
 * )
 * ```
 */
const activeTodosCount = computed(() =>
  todos.value.filter(t => !t.completed).length
)

/**
 * filteredTodos - apply filter dựa trên activeFilter
 *
 * 💡 Angular với rxjs:
 * ```typescript
 * filteredTodos$ = combineLatest([todos$, filter$]).pipe(
 *   map(([todos, filter]) => {
 *     if (filter === 'all') return todos
 *     if (filter === 'active') return todos.filter(t => !t.completed)
 *     return todos.filter(t => t.completed)
 *   })
 * )
 * ```
 * Vue computed đơn giản hơn nhiều!
 */
const filteredTodos = computed(() => {
  switch (activeFilter.value) {
    case 'active':
      return todos.value.filter(t => !t.completed)
    case 'completed':
      return todos.value.filter(t => t.completed)
    default:
      return todos.value
  }
})

// ========================================
// CRUD OPERATIONS
// ========================================

/**
 * Thêm task mới
 * 💡 Angular: giống hệt - function trong component class
 */
const addTask = () => {
  const text = newTask.value.trim()
  if (!text) return

  todos.value.push({
    id: Date.now(),
    text,
    completed: false,
    createdAt: Date.now(),
  })

  newTask.value = ''
}

const xoatatca = () => {
  todos.value = computed(() => todos.value.filter(t => !t.completed)).value
}

/**
 * Toggle completed status
 */
const toggleTodo = (todo: Todo) => {
  todo.completed = !todo.completed
}

/**
 * Xóa task
 */
const deleteTodo = (id: number) => {
  todos.value = todos.value.filter(t => t.id !== id)
}

/**
 * Cập nhật task (edit)
 */
const updateTodo = (id: number, text: string) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.text = text
  }
}

// ========================================
// LIFECYCLE HOOKS + PERSISTENT STORAGE
// ========================================

/**
 * onMounted() - chạy sau khi component mount vào DOM
 *
 * 💡 Angular equivalent: ngOnInit()
 * ```typescript
 * export class AppComponent implements OnInit {
 *   ngOnInit() {
 *     this.loadFromStorage()
 *   }
 * }
 * ```
 */
onMounted(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    try {
      todos.value = JSON.parse(savedTodos)
    } catch (e) {
      console.error('Lỗi parse todos:', e)
    }
  }

  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode) {
    darkMode.value = JSON.parse(savedDarkMode)
  }

  if (todos.value.length === 0) {
    todos.value = [
      { id: 1, text: 'Learn React', completed: false, createdAt: Date.now() - 20000 },
      { id: 2, text: 'Prototyping To-Do List', completed: true, createdAt: Date.now() - 10000 },
      { id: 3, text: 'Push to Github', completed: false, createdAt: Date.now() },
    ]
  }
})

/**
 * watch() - theo dõi reactive variable và thực hiện action khi thay đổi
 *
 * 💡 Angular equivalent:
 * ```typescript
 * // Angular 16+ Signals với effect()
 * effect(() => {
 *   localStorage.setItem('todos', JSON.stringify(todos()))
 * })
 *
 * // Angular cũ với subscription
 * constructor(private todosService: TodosService) {
 *   this.todosService.todos$.subscribe(todos =>
 *     localStorage.setItem('todos', JSON.stringify(todos))
 *   )
 * }
 * ```
 */
watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })

watch(darkMode, (newDarkMode) => {
  localStorage.setItem('darkMode', JSON.stringify(newDarkMode))
})

// ========================================
// SIDEBAR & THEME ACTIONS
// ========================================

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleTheme = () => {
  darkMode.value = !darkMode.value
}

const setFilter = (filter: FilterType) => {
  activeFilter.value = filter
}
</script>

<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-300',
      'font-sans',
      darkMode ? 'bg-[#101828]' : 'bg-[#F3F4F6]'
    ]"
  >
    <!-- Sidebar Component -->
    <Sidebar
      :dark-mode="darkMode"
      :active-menu="'tasks'"
      :collapsed="sidebarCollapsed"
      @toggle-sidebar="toggleSidebar"
      @toggle-theme="toggleTheme"
    />

    <!-- Main Content Area -->
    <main
      :class="[
        'transition-all duration-300',
        sidebarCollapsed ? 'ml-16' : 'ml-[359px]'
      ]"
    >
      <div class="max-w-4xl mx-auto p-8">
        <!-- Header Section -->
        <div class="mt-8 mb-10">
          <h1 class="text-[48px] font-bold text-[#333]">
            My Tasks
          </h1>
        </div>

        <!-- Input Section -->
        <div class="flex items-center gap-4 mb-8">
          <div class="relative flex-1">
            <input
              v-model="newTask"
              type="text"
              placeholder="Type your task here.."
              @keyup.enter="addTask"
              :class="[
                'w-full rounded-[12px] px-5 py-3 text-[24px] outline-none shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]',
                darkMode
                  ? 'bg-[#364153] text-white placeholder-[#A9A9A9] border border-[#4A5565]'
                  : 'bg-white text-[#333] placeholder-[#A9A9A9]'
              ]"
            />
          </div>

          <button
            @click="addTask"
            class="flex items-center rounded-[12px] px-6 py-3 text-white font-bold text-[24px] shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] bg-[#4A5565]"
          >
            <span class="mr-2">+</span>
            Add
          </button>
          <button @click="xoatatca">xóa</button>
        </div>

        <!-- Filter Tabs -->
        <div v-if="todos.length > 0" class="flex gap-4 mb-6">
          <button
            @click="setFilter('all')"
            :class="[
              'text-[20px] cursor-pointer',
              activeFilter === 'all' ? 'font-bold underline' : '',
              'text-[#6A7282]'
            ]"
          >
            All
          </button>
          <span class="text-[#6A7282]">|</span>
          <button
            @click="setFilter('active')"
            :class="[
              'text-[20px] cursor-pointer',
              activeFilter === 'active' ? 'font-bold underline' : '',
              'text-[#6A7282]'
            ]"
          >
            Active
          </button>
          <span class="text-[#6A7282]">|</span>
          <button
            @click="setFilter('completed')"
            :class="[
              'text-[20px] cursor-pointer',
              activeFilter === 'completed' ? 'font-bold underline' : '',
              'text-[#6A7282]'
            ]"
          >
            Completed
          </button>
        </div>

        <!-- Task List -->
        <ul class="mb-8">
          <TodoItem
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            :dark-mode="darkMode"
            @toggle-todo="toggleTodo"
            @delete-todo="deleteTodo"
            @update-todo="updateTodo"
          />
        </ul>

        <!-- Empty State -->
        <div
          v-if="filteredTodos.length === 0"
          :class="[
            'mt-12 text-[24px] text-center max-w-lg',
            darkMode ? 'text-white' : 'text-[#333]'
          ]"
        >
          <span v-if="todos.length === 0">
            Empty as my motivation on Monday 😅. Let's start adding stuff!
          </span>
          <span v-else>
            No {{ activeFilter }} tasks found.
            <template v-if="activeFilter !== 'all'">
              <button @click="setFilter('all')" class="underline hover:no-underline ml-2">
                Show all
              </button>
            </template>
          </span>
        </div>

        <!-- Task Counter -->
         <div v-if="todos.length == 0">
          không có công việc nào cả
         </div>
        <span
          v-else
          class="text-[20px] text-[#6A7282] mb-4"
        >
          {{ activeTodosCount }} task{{ activeTodosCount !== 1 ? 's' : '' }} left
        </span>

        <!-- Footer -->
        <footer class="text-[#6A7282] text-[20px] mt-8">
          © 2025
        </footer>
      </div>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Lato', sans-serif;
}
</style>
