<script lang="ts">
  import '../../app.pcss'
  import { page } from '$app/stores'
  import { onNavigate } from '$app/navigation'
  import type { HomeContent } from '$lib/content.types'
  import { navbarOpen } from '$lib'
  import Icon from '@iconify/svelte'
  export let data

  $: currPage = data.page
  $: content = Object(currPage?.content) as HomeContent
  let pages = data.pages
  let language = data.language

  onNavigate((navigation) => {
	if (!document.startViewTransition) return

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve()
			await navigation.complete
		})
	})
})
</script>

<svelte:head>
  <title>{content.title}</title>
</svelte:head>

<nav class="navbar group" data-open={$navbarOpen}>
  <div class="navbar__content">
    <button class="navbar__switch" type="button" on:click={() => $navbarOpen = !$navbarOpen}>
      <Icon icon="material-symbols:menu-rounded" />
    </button>
    <ul class="navbar__items">
      {#each pages as { name, content }}
      <li class="navbar__item" class:navbar__item__active={currPage?.name === name}>
        <a href={`${$page.url.origin}/${language.code}/${name}`}>{Object(content).title}</a>
      </li>
      {/each}
    </ul>
  </div>
</nav>

<slot/>