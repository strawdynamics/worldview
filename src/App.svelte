<script lang="ts">
  import AboutModal from './components/AboutModal.svelte'
  import Configurator from './components/configurator/Configurator.svelte'
  import MainDisplay from './components/MainDisplay.svelte'
  import { currentScreen, Screens } from './stores/currentScreen'
  import { hash } from './stores/url'

  $: showAbout = $hash === '#about'
</script>

<main>
  {#if $currentScreen === Screens.Configurator}
    <Configurator />

    {#if showAbout}
      <AboutModal />
    {/if}
  {:else}
    <MainDisplay />
  {/if}
</main>

<style>
  main {
    height: 100%;
  }
</style>
