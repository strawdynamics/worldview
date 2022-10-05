<script lang="ts">
  // This component is a workaround for Svelte's lack of support for
  // initializing stores below the main function (e.g. in a `map`)
  import type { Readable } from 'svelte/store'
  import { createEventDispatcher } from 'svelte'
  import type { ImageStore } from 'src/stores/images'

  export let imageToLoad: Readable<ImageStore>

  const dispatch = createEventDispatcher()

  $: if ($imageToLoad) {
    dispatch('loaded')
  }
</script>
