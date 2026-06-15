<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[#F3F4F6] font-['Lato'] flex flex-col items-center pt-24 px-4 pb-10">
    <div class="w-full max-w-2xl flex flex-col items-center">
      <!-- Title -->
      <h1 class="text-[#333333] text-[48px] font-bold mb-10">
        My Tasks
      </h1>

      <!-- Input Section -->
      <div class="flex w-full items-center gap-4 mb-8">
        <div class="relative flex-1">
          <input
            type="text"
            placeholder="Type your task here.."
            class="w-full bg-white rounded-[12px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] px-5 py-3 text-[24px] text-[#333333] outline-none placeholder-[#A9A9A9]"
          />
        </div>
        <button class="flex items-center justify-center bg-black rounded-[12px] px-6 py-3 text-white font-bold text-[24px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
          <span class="mr-2">+</span>
          Add
        </button>
      </div>

      <!-- Empty State -->
      <div class="mt-12 text-[#333333] text-[24px] text-center max-w-lg">
        Empty as my motivation on Monday 😅. Let’s start adding stuff!
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-auto text-[#6A7282] text-[20px]">
      © 2025
    </footer>
  </div>
</template>

<style scoped>
</style>