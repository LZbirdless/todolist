<script setup lang="ts">
/**
 * Sidebar Component - Thanh bên trái với menu navigation và profile
 * 
 * 💡 Angular equivalent:
 * ```typescript
 * @Component({
 *   selector: 'app-sidebar',
 *   template: `...`,
 *   styles: [`...`]
 * })
 * export class SidebarComponent {
 *   @Input() darkMode = false;
 *   @Input() activeMenu: string = 'tasks';
 *   @Output() toggleSidebar = new EventEmitter();
 *   @Output() menuChange = new EventEmitter<string>();
 * }
 * ```
 * 
 * Vue Composition API dùng defineProps/defineEmits - gọn hơn nhiều!
 */
import { computed } from 'vue'

/**
 * defineProps<T>() - TypeScript generics cho props
 * 
 * 💡 Angular equivalent: @Input() decorator
 * ```typescript
 * @Input() darkMode: boolean = false
 * @Input() activeMenu: string = 'tasks'
 * ```
 */
interface Props {
  darkMode: boolean
  activeMenu: string
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  darkMode: false,
  activeMenu: 'tasks',
  collapsed: false,
})

/**
 * defineEmits<T>() - khai báo events parent nhận
 * 
 * 💡 Angular equivalent:
 * ```typescript
 * @Output() toggleSidebar = new EventEmitter<void>()
 * @Output() menuChange = new EventEmitter<string>()
 * @Output() toggleTheme = new EventEmitter<void>()
 * ```
 */
const emit = defineEmits<{
  toggleSidebar: []
  menuChange: [menu: string]
  toggleTheme: []
}>()

/**
 * computed() - giá trị tự động update khi dependency thay đổi
 * 
 * 💡 Angular equivalent:
 * ```typescript
 * // Angular 16+ với Signals
 * sidebarClass = computed(() => ({
 *   'bg-gray-800': this.darkMode,
 *   'bg-gray-100': !this.darkMode
 * }))
 * ```
 */
const sidebarClass = computed(() =>
  props.darkMode
    ? 'bg-[#1E2939] shadow-[0_4px_12px_0_rgba(0,0,0,0.25)]'
    : 'bg-white shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]'
)

const menuItems = [
  { id: 'tasks', label: 'My Tasks', icon: 'list' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]
</script>

<template>
  <!-- 
    :class - dynamic class binding
    💡 Angular equivalent: [ngClass]="sidebarClass"
  -->
  <aside
    :class="[
      sidebarClass,
      'fixed left-0 top-0 h-screen transition-all duration-300 z-50',
      props.collapsed ? 'w-16' : 'w-[359px]'
    ]"
  >
    <!-- Hamburger Toggle -->
    <button
      @click="emit('toggleSidebar')"
      :class="[
        'absolute top-5 right-5',
        props.darkMode ? 'text-white' : 'text-[#333]'
      ]"
    >
      <svg v-if="!props.collapsed" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Dark Mode Toggle -->
    <button
      @click="emit('toggleTheme')"
      :class="[
        'absolute top-5 left-5',
        props.darkMode ? 'text-white' : 'text-[#333]'
      ]"
    >
      <!-- Sun icon (khi dark mode ON → click để switch sang light) -->
      <svg v-if="props.darkMode" class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" stroke-width="2" />
        <path stroke-width="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      <!-- Moon icon (khi light mode → click để switch sang dark) -->
      <svg v-else class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.752 15.002a9.75 9.75 0 01-12.859-12.859 9.75 9.75 0 1012.859 12.859z" />
      </svg>
    </button>

    <nav v-if="!props.collapsed" class="mt-20">
      <!-- Menu Items -->
      <!-- 
        v-for - loop qua array
        💡 Angular equivalent: *ngFor="let item of menuItems"
      -->
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="emit('menuChange', item.id)"
        :class="[
          'w-[291px] mx-auto mt-4 rounded-[12px] flex items-center py-2 px-4',
          props.activeMenu === item.id
            ? props.darkMode
              ? 'bg-[#364153] text-[#333]'
              : 'bg-[#F3F4F6] text-[#333]'
            : props.darkMode
              ? 'text-white'
              : 'text-[#333]'
        ]"
      >
        <!-- My Tasks Icon -->
        <svg v-if="item.icon === 'list'" class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01" />
        </svg>
        <!-- Settings Icon -->
        <svg v-else class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <circle cx="12" cy="12" r="3" stroke-width="2" />
        </svg>
        <span class="text-[24px] font-bold">{{ item.label }}</span>
      </button>

      <!-- Divider Line -->
      <div
        :class="[
          'w-[291px] mx-auto mt-8 border-t',
          props.darkMode ? 'border-gray-600' : 'border-gray-300'
        ]"
      ></div>

      <!-- Profile Section -->
      <div class="flex flex-col items-center mt-8">
        <!-- Avatar -->
        <div
          :class="[
            'w-[89px] h-[89px] rounded-full',
            props.darkMode ? 'bg-gray-600' : 'bg-gray-400'
          ]"
        >
          <svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.25 2.354 11.996 5.993zM13 16a6 6 0 10-12 0 6 6 0 0012 0z" />
          </svg>
        </div>

        <span
          :class="[
            'text-[24px] font-bold mt-3',
            props.darkMode ? 'text-white' : 'text-[#333]'
          ]"
        >
          Jane Doe
        </span>

        <span class="text-[20px] text-[#99A1AF] mt-1">
          janedoe@gmail.com
        </span>
      </div>
    </nav>

    <!-- Collapsed menu icons -->
    <nav v-else class="mt-20 flex flex-col items-center">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="emit('menuChange', item.id)"
        :class="[
          'w-14 h-14 mt-4 rounded-[12px] flex items-center justify-center',
          props.activeMenu === item.id
            ? props.darkMode
              ? 'bg-[#364153] text-[#333]'
              : 'bg-[#F3F4F6] text-[#333]'
            : props.darkMode
              ? 'text-white'
              : 'text-[#333]'
        ]"
      >
        <svg v-if="item.icon === 'list'" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01" />
        </svg>
        <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <circle cx="12" cy="12" r="3" stroke-width="2" />
        </svg>
      </button>

      <!-- Profile in collapsed mode -->
      <div
        :class="[
          'w-[89px] h-[89px] rounded-full mt-12',
          props.darkMode ? 'bg-gray-600' : 'bg-gray-400'
        ]"
      >
        <svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.25 2.354 11.996 5.993zM13 16a6 6 0 10-12 0 6 6 0 0012 0z" />
        </svg>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
/* No scoped styles needed - all Tailwind! */
</style>