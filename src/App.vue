<template>
  <article
    class="container px-5 mx-auto h-screen flex flex-col items-center justify-center"
  >
    <div class="mb-12 text-center">
      <figure class="text-4xl">🚀</figure>
      <h1 class="text-4xl font-bold">Vue Advance Tooltips</h1>
    </div>

    <el-alert title="Success alert" type="success" effect="dark" />

    <div id="links" class="inline-flex gap-4">
      <!-- LINK TO STORY BOOK -->
      <!-- LINK TO TEST COVERAGE -->
      <!-- GITHUB -->
    </div>

    <p
      class="block text-xs font-medium text-neutral-500 uppercase tracking-widest mt-12"
    >
      Built with
    </p>
    <ul class="inline-flex flex-wrap gap-4 mt-4 text-xs justify-center">
      <li
        class="font-medium font-mono bg-amber-100 text-amber-900 py-1 px-4 rounded-full"
      >
        Vite
      </li>
      <li
        class="font-medium font-mono bg-amber-100 text-amber-900 py-1 px-4 rounded-full"
      >
        Vue3
      </li>
      <li
        class="font-medium font-mono bg-amber-100 text-amber-900 py-1 px-4 rounded-full"
      >
        Typescript
      </li>
      <li
        class="font-medium font-mono bg-amber-100 text-amber-900 py-1 px-4 rounded-full"
      >
        Tailwind
      </li>
      <li
        class="font-medium font-mono bg-amber-100 text-amber-900 py-1 px-4 rounded-full"
      >
        Storybook
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts"></script>

<style scoped></style>
