<script lang="ts">
  import {
    pointsOfInterest,
    type PointOfInterest,
    configuratorSelectedPoiId,
  } from '../../stores/pointsOfInterest'
  import { fade } from 'svelte/transition'

  export let poi: PointOfInterest
  export let editorWidth: number
  export let editorHeight: number
  export let poiWrapperEl: HTMLDivElement
  export let index: number

  let windowWidth: number = 0
  let windowHeight: number = 0

  let pointerIsDown = false
  let draggerEl: HTMLButtonElement

  let lastPointerMoveScreenX = 0
  let lastPointerMoveScreenY = 0

  $: editorScale = editorWidth / windowWidth
  $: width = poi.zoom * editorScale * windowWidth
  $: height = poi.zoom * editorScale * windowHeight
  $: x = poi.x * editorWidth
  $: y = poi.y * editorHeight

  $: endZoom = poi.zoom + poi.animateZ
  $: endWidth = endZoom * editorScale * windowWidth
  $: endHeight = endZoom * editorScale * windowHeight

  $: moveX = editorWidth * poi.animateX
  $: endX = x + moveX
  $: moveY = editorHeight * poi.animateY
  $: endY = y + moveY

  $: isCurrent = $configuratorSelectedPoiId === poi.id
  $: zIndex = isCurrent ? 10 : 1
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div
  class="poi"
  style:margin-left="{Math.round(x)}px"
  style:margin-top="{Math.round(y)}px"
  style:width="{Math.round(width)}px"
  style:height="{Math.round(height)}px"
  style:z-index={zIndex}
>
  <button
    class="dragger"
    class:current={isCurrent}
    bind:this={draggerEl}
    on:touchstart|preventDefault
    on:pointerdown|preventDefault={(e) => {
      pointerIsDown = true
      $configuratorSelectedPoiId = poi.id
      e.target.setPointerCapture(e.pointerId)

      lastPointerMoveScreenX = e.screenX
      lastPointerMoveScreenY = e.screenY
    }}
    on:pointerup={(e) => {
      pointerIsDown = false
      e.target.releasePointerCapture(e.pointerId)
    }}
    on:pointermove={(e) => {
      if (!pointerIsDown) {
        return
      }

      const wrapperRect = poiWrapperEl.getBoundingClientRect()
      const draggerRect = draggerEl.getBoundingClientRect()
      const movementX = e.screenX - lastPointerMoveScreenX
      const movementY = e.screenY - lastPointerMoveScreenY

      lastPointerMoveScreenX = e.screenX
      lastPointerMoveScreenY = e.screenY

      const newX =
        Math.min(
          Math.max(
            draggerRect.x + draggerRect.width / 2 - wrapperRect.x + movementX,
            0
          ),
          editorWidth
        ) / editorWidth
      const newY =
        Math.min(
          Math.max(
            draggerRect.y + draggerRect.height / 2 - wrapperRect.y + movementY,
            0
          ),
          editorWidth
        ) / editorWidth

      poi.x = newX
      poi.y = newY
      $pointsOfInterest = $pointsOfInterest
    }}
  >
    <p class="index">{index}</p>
  </button>
</div>

{#if isCurrent && (poi.animateX || poi.animateY || poi.animateZ)}
  <div
    transition:fade|local
    class="poi-animate-preview"
    style:margin-left="{Math.round(endX)}px"
    style:margin-top="{Math.round(endY)}px"
    style:width="{Math.round(endWidth)}px"
    style:height="{Math.round(endHeight)}px"
  />
{/if}

<style>
  .poi,
  .poi-animate-preview {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 0;
    left: 0;
    color: #fff;
  }

  .poi-animate-preview {
    transition: border 0.3s linear;
  }

  .poi-animate-preview {
    border: 2px dotted #b8ff8f;
    border-radius: 3px;
  }

  .dragger {
    transition: all 0.3s linear;
    border-radius: 2px;
    background-color: transparent;
    box-shadow: 0 0 0 1px #577840;
    display: block;
    width: 100%;
    height: 100%;
    transform: scale(1);
    cursor: grab;
  }

  .dragger:active {
    cursor: grabbing;
  }

  .dragger.current {
    box-shadow: 0 0 0 2px #b8ff8f;
  }

  .index {
    font-weight: 600;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    font-size: 10px;
    height: 14px;
    min-width: 14px;
    line-height: 14px;
    padding-left: 3px;
    padding-right: 3px;
    text-align: center;
    border-radius: 0 3px 0 2px;
    color: #fff;
  }
</style>
