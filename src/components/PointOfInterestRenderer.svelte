<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { Readable } from 'svelte/store'
  import { tweened } from 'svelte/motion'
  import { quadInOut } from 'svelte/easing'
  import type { PointOfInterest } from '../stores/pointsOfInterest'
  import { lerp } from '../util/math'
  import type { ImageStore } from '../stores/images'
  import { tick } from 'svelte'

  const dispatch = createEventDispatcher()

  export let poi: PointOfInterest
  export let fullImage: Readable<ImageStore>
  export let isCurrent = false
  export let forceVisible = false
  export let disableAnimation = false
  export let index = -1

  let canvas: HTMLCanvasElement

  let windowWidth = 0
  let windowHeight = 0

  let rendererWidth = 0
  let rendererHeight = 0

  let renderStartedAt = -1
  let resetRenderStartedTimer

  $: {
    if (isCurrent) {
      clearTimeout(resetRenderStartedTimer)
      renderStartedAt = Date.now()
      rrrender()
    } else {
      // FIXME: Sloppy
      // Keep playing during crossfade
      resetRenderStartedTimer = setTimeout(() => {
        renderStartedAt = -1
      }, 1000)
    }
  }

  $: {
    // FIXME: Sloppy
    // Re-render if index changes (for use within filmstrip)
    if (index > -1) {
      const indexRender = async () => {
        await tick()
        rrrender()
      }
      indexRender()
    }
  }

  $: startSWidth = poi.zoom * $fullImage.image.naturalWidth
  $: startSHeight = poi.zoom * $fullImage.image.naturalHeight
  $: startSX = $fullImage.image.naturalWidth * poi.x - startSWidth / 2
  $: startSY =
    $fullImage.image.naturalHeight * poi.y -
    (startSHeight * (windowHeight / windowWidth)) / 2

  $: endZoom = poi.zoom + poi.animateZ
  $: endSWidth = endZoom * $fullImage.image.naturalWidth
  $: endSHeight = endZoom * $fullImage.image.naturalHeight

  $: moveX = $fullImage.image.naturalWidth * poi.animateX
  $: endSX = $fullImage.image.naturalWidth * poi.x + moveX - endSWidth / 2
  $: moveY = $fullImage.image.naturalHeight * poi.animateY
  $: endSY =
    $fullImage.image.naturalHeight * poi.y +
    moveY -
    (endSHeight * (windowHeight / windowWidth)) / 2

  $: {
    if (canvas) {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = rendererWidth * dpr
      canvas.height = rendererHeight * dpr
    }
  }

  let ctx
  $: {
    if (canvas) {
      ctx = canvas.getContext('2d', { alpha: false })
    }
  }

  const rrrender = () => {
    if (!canvas || !ctx) {
      return
    }

    let t
    if (renderStartedAt === -1 || disableAnimation) {
      t = 0
    } else {
      const runningTime = Math.min(
        Date.now() - renderStartedAt,
        poi.duration + 1000
      )
      t = runningTime / poi.duration
    }

    const sWidth = lerp(startSWidth, endSWidth, t)
    const sHeight =
      lerp(startSHeight, endSHeight, t) * (windowHeight / windowWidth)
    let sx = lerp(startSX, endSX, t)
    let sy = lerp(startSY, endSY, t)

    const dWidth = canvas.width
    const dHeight = canvas.height

    // Workaround for a Safari bug with negative drawImage sx/sy
    // Corroboration: https://stackoverflow.com/questions/53470133/
    const offsetX = sx < 0 ? -sx : 0
    const offsetY = sy < 0 ? -sy : 0
    sx += offsetX
    sy += offsetY

    const dx = offsetX * (dWidth / sWidth)
    const dy = offsetY * (dHeight / sHeight)

    // Canvas only _needs_ to be cleared if outside bounds of source image, but
    // just always doing it for now
    ctx.clearRect(0, 0, dWidth, dHeight)

    // `drawImage` is faster with whole numbers, but gives a much less pleasant
    // animation. Going without for now, since animations don't run well enough
    // on the Pi 4 anyway.
    ctx.drawImage(
      $fullImage.image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    )

    if (isCurrent || t > 0) {
      requestAnimationFrame(rrrender)
    }
  }

  onMount(() => {
    // FIXME: setTimeout required to make FilmstripItem automatically render
    // without window resize?
    setTimeout(async () => {
      rrrender()
    }, 0)
  })

  let completeTimer

  const opacity = tweened(0, {
    duration: 1000,
    easing: quadInOut,
  })

  $: if (isCurrent || forceVisible) {
    opacity.set(1)
    clearTimeout(completeTimer)
    completeTimer = setTimeout(() => {
      dispatch('complete')
    }, poi.duration)
  } else {
    opacity.set(0)
  }
</script>

<svelte:window
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight}
  on:resize={() => {
    rrrender()
  }}
/>

<div
  class="poi-renderer"
  bind:clientWidth={rendererWidth}
  bind:clientHeight={rendererHeight}
  style:opacity={$opacity}
>
  <canvas bind:this={canvas} />
</div>

<style>
  .poi-renderer {
    width: 100%;
    height: 100%;
  }

  canvas {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
