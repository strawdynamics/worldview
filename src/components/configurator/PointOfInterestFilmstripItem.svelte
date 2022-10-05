<script lang="ts">
  import { imageSources } from '../../util/imageSources'
  import { smallImages } from '../../stores/images'
  import {
    configuratorSelectedPoiId,
    pointsOfInterest,
    type PointOfInterest,
  } from '../../stores/pointsOfInterest'
  import PointOfInterestRenderer from '../PointOfInterestRenderer.svelte'
  import { fly } from 'svelte/transition'
  import { currentConfiguratorSource } from '../../stores/currentConfiguratorSource'
  import { tick } from 'svelte'

  export let poi: PointOfInterest
  export let index: number

  let maybeDragging = false

  let img = smallImages[poi.sourceName]

  $: isCurrent = $configuratorSelectedPoiId === poi.id
  $: isCurrentSource = poi.sourceName === $currentConfiguratorSource.name

  const removeSelf = async () => {
    $configuratorSelectedPoiId = null
    await tick()
    $pointsOfInterest = $pointsOfInterest.filter((p) => {
      return p.id !== poi.id
    })
  }
</script>

<div
  on:click={() => {
    $configuratorSelectedPoiId = poi.id
  }}
  class="filmstrip-item"
  class:current={isCurrent}
  class:not-current-source={!isCurrentSource}
  on:pointerdown={() => {
    maybeDragging = true
  }}
  on:pointerup={() => {
    maybeDragging = false
  }}
>
  {#if $img}
    <div class="canvas-wrapper">
      <PointOfInterestRenderer
        {poi}
        {index}
        {isCurrent}
        fullImage={img}
        forceVisible={true}
        disableAnimation={true}
      />
    </div>
  {/if}

  <p class="index">
    {index}<span class="spacecraft"
      >: {imageSources[poi.sourceName].spacecraft}</span
    >
  </p>

  {#if isCurrent && !maybeDragging}
    <button
      transition:fly={{ duration: 120, y: 12 }}
      on:click={removeSelf}
      class="remove-button"
      aria-label="Remove POI"
    >
      <span class="remove-button-inner">×</span>
    </button>
  {/if}
</div>

<style>
  .filmstrip-item {
    height: 70px;
    border-radius: 2px;
    box-shadow: 0 0 0 1px #577840;
    position: relative;
    transition: border 0.3s linear, opacity 0.3s linear;
  }

  .filmstrip-item.current {
    box-shadow: 0 0 0 2px #b8ff8f;
  }

  .filmstrip-item.not-current-source {
    opacity: 0.5;
  }

  .canvas-wrapper {
    border-radius: 2px;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
    line-height: 16px;
    padding-left: 3px;
    padding-right: 3px;
    text-align: center;
    border-radius: 0 3px 0 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
  }

  .spacecraft {
    display: none;
  }

  .remove-button {
    position: absolute;
    top: -16px;
    right: -16px;
    padding: 9px;
    border-radius: 20px;
    background: transparent;
    cursor: pointer;
  }

  .remove-button-inner {
    display: block;
    background: #fff;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
  }

  @media (min-aspect-ratio: 1/1) {
    .spacecraft {
      display: inline;
    }
  }
</style>
