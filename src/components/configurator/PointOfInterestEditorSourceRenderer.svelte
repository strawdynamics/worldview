<script lang="ts">
  import type { ImageStore } from 'src/stores/images'
  import type { Readable } from 'svelte/store'

  export let editorWidth = 0
  export let editorHeight = 0
  export let image: Readable<ImageStore>

  let canvas: HTMLCanvasElement

  $: if (canvas) {
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = editorWidth * dpr
    canvas.height = editorHeight * dpr
  }

  $: if ($image && canvas) {
    const ctx = canvas.getContext('2d', { alpha: false })

    const sx = 0
    const sy = 0
    const sWidth = $image.image.naturalWidth
    const sHeight = $image.image.naturalHeight

    const dx = 0
    const dy = 0
    const dWidth = canvas.width
    const dHeight = canvas.height

    ctx.drawImage(
      $image.image,
      Math.round(sx),
      Math.round(sy),
      Math.round(sWidth),
      Math.round(sHeight),
      Math.round(dx),
      Math.round(dy),
      Math.round(dWidth),
      Math.round(dHeight)
    )
  }
</script>

<canvas bind:this={canvas} />

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
