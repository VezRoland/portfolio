<script lang="ts">
  import '../app.pcss'
  import { page } from '$app/stores'
</script>

<main class="h-screen flex flex-col justify-center items-center gap-4">
  <h1 class="text-7xl font-semibold">{$page.status}</h1>
  <h2 class="text-lg text-violet-500">{$page.error?.message}</h2>
</main>