<script setup lang="ts">
/**
 * TodoItem Component - Một task card theo thiết kế Figma
 * 
 * 💡 Angular equivalent (Options API):
 * ```typescript
 * @Component({
 *   selector: 'app-todo-item',
 *   template: `...`
 * })
 * export class TodoItemComponent {
 *   @Input() todo!: Todo;
 *   @Output() toggleTodo = new EventEmitter<Todo>();
 *   @Output() deleteTodo = new EventEmitter<number>();
 * }
 * ```
 * 
 * Vue Composition API với <script setup> - hiện đại, gọn gàng, 
 * type-safe, không cần this., không cần declare gì cả!
 */
import { ref, nextTick } from 'vue'
import type { Todo } from '@/types/todo'

/**
 * defineProps với TypeScript generic - type-safe 100%
 * 
 * 💡 Angular equivalent:
 * ```typescript
 * @Input() todo: Todo
 * @Input() darkMode: boolean = false
 * ```
 */
interface Props {
  todo: Todo
  darkMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  darkMode: false,
})

/**
 * defineEmits - khai báo events gửi lên parent
 * 
 * 💡 Angular equivalent:
 * ```typescript
 * @Output() toggleTodo = new EventEmitter<Todo>()
 * @Output() deleteTodo = new EventEmitter<number>()
 * @Output() updateTodo = new EventEmitter<{id: number, text: string}>()
 * ```
 */
const emit = defineEmits<{
  toggleTodo: [todo: Todo]
  deleteTodo: [id: number]
  updateTodo: [id: number, text: string]
}>()

/**
 * ref() - tạo reactive variable
 * 
 * 💡 Angular equivalent:
 * - Angular 16+: signal(): WritableSignal<string>
 * - Angular cũ: this.editText = ''
 * 
 * QUAN TRỌNG: ref() tạo object { value: T }, truy cập bằng .value trong script,
 * nhưng trong template Vue tự unwrap (không cần .value)!
 */
const editText = ref('')
const isEditing = ref(false)
const editInput = ref<HTMLInputElement | null>(null)

/**
 * Hàm toggle - đánh dấu hoàn thành/xóa hoàn thành
 */
const toggleTodo = () => {
  if (!isEditing.value) {
    emit('toggleTodo', props.todo)
  }
}

/**
 * Hàm xóa task
 */
const deleteTodo = () => {
  emit('deleteTodo', props.todo.id)
}

/**
 * Bắt đầu chế độ edit
 */
const startEdit = () => {
  editText.value = props.todo.text
  isEditing.value = true
  nextTick(() => {
    editInput.value?.focus()
  })
}

/**
 * Lưu thay đổi sau khi edit
 */
const saveEdit = () => {
  if (editText.value.trim()) {
    emit('updateTodo', props.todo.id, editText.value.trim())
    isEditing.value = false
  }
}

/**
 * Hủy edit
 */
const cancelEdit = () => {
  isEditing.value = false
  editText.value = ''
}
</script>

<template>
  <!-- 
    CARD CONTAINER
    💡 Figma: task card với borderRadius 12px, shadow
  -->
  <li
    :class="[
      'relative flex items-center rounded-[12px] p-4 mb-4 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]',
      props.darkMode ? 'bg-[#1E2939]' : 'bg-white'
    ]"
  >
    <!-- CHECKBOX -->
    <!-- 
      v-show - toggle visibility (css display), khác v-if (remove from DOM)
      💡 Angular: *ngIf (remove DOM) vs [style.display] (CSS toggle)
    -->
    <div
      @click="toggleTodo"
      class="w-6 h-6 mr-4 cursor-pointer flex-shrink-0"
    >
      <!-- Unchecked state - hollow square -->
      <svg v-show="!props.todo.completed" class="w-6 h-6" :class="props.darkMode ? 'text-white' : 'text-[#333]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke-width="2" />
      </svg>
      <!-- Checked state - checked square -->
      <svg v-show="props.todo.completed" class="w-6 h-6" :class="props.darkMode ? 'text-white' : 'text-[#333]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke-width="2" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
      </svg>
    </div>

    <!-- TASK TEXT -->
    <span
      v-show="!isEditing"
      :class="[
        'text-[24px] flex-1',
        props.todo.completed
          ? 'line-through text-[#6A7282]'
          : props.darkMode
            ? 'text-white'
            : 'text-[#333]'
      ]"
    >
      {{ todo.text }}
    </span>

    <!-- EDIT INPUT -->
    <!-- 
      v-model - two-way binding (giống [(ngModel)] trong Angular!)
      💡 Angular: [(ngModel)]="editText"
    -->
    <input
      v-show="isEditing"
      v-model="editText"
      ref="editInput"
      @keyup.enter="saveEdit"
      @keyup.escape="cancelEdit"
      :class="[
        'text-[24px] flex-1 px-2 py-1 rounded outline-none',
        props.darkMode
          ? 'bg-[#364153] text-white'
          : 'bg-gray-100 text-[#333]'
      ]"
    />

    <!-- ACTION BUTTONS -->
    <div class="flex items-center gap-2 ml-4">
      <!-- Edit Button (Pencil Icon) -->
      <button
        @click="startEdit"
        class="p-2 hover:bg-gray-700 rounded transition"
        :class="props.darkMode ? 'text-white' : 'text-[#333]'"
        title="Edit"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      <!-- Delete Button (Trash Icon) -->
      <button
        @click="deleteTodo"
        class="p-2 hover:bg-red-600 rounded transition"
        :class="props.darkMode ? 'text-white' : 'text-[#333]'"
        title="Delete"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>

    <!-- Strikethrough line for completed tasks (Figma style) -->
    <svg
      v-if="props.todo.completed"
      class="absolute left-10 bottom-3 w-64"
      :class="props.darkMode ? 'text-white' : 'text-[#333]'"
      fill="none" stroke="currentColor" viewBox="0 0 245 2"
    >
      <line x1="0" y1="1" x2="245" y2="1" stroke-width="2" />
    </svg>
  </li>
</template>

<style scoped>
/* Tailwind handles everything - no custom CSS needed! */
</style>