<script lang="ts">
  import { imageSources } from '../util/imageSources'
  import { currentScreen, Screens } from '../stores/currentScreen'
  import { fullImages } from '../stores/images'
  import {
    pointsOfInterest,
    type PointOfInterest,
  } from '../stores/pointsOfInterest'
  import PointOfInterestRenderer from './PointOfInterestRenderer.svelte'
  import Loader from './Loader.svelte'
  import { fade, fly } from 'svelte/transition'
  import { elasticOut, quadOut } from 'svelte/easing'
  import ImageSourceLoader from './ImageSourceLoader.svelte'
  import { currentTime } from '../stores/currentTime'

  const requiredSourceNames = [
    ...new Set(
      $pointsOfInterest.map((poi) => {
        return poi.sourceName
      })
    ),
  ]
  const requiredFullImages = requiredSourceNames.map((sourceName) => {
    return fullImages[sourceName]
  })
  let loadedFullImagesCount = 0

  $: loading = loadedFullImagesCount < requiredFullImages.length

  let currentPoiId = null
  let currentPoiIndex = null
  let currentPoi = null
  let currentImage = null

  $: if (!loading) {
    setTimeout(() => {
      currentPoiId = $pointsOfInterest[0].id
    }, 300)
  }
  $: {
    currentPoiIndex = $pointsOfInterest.findIndex((p) => {
      return p.id === currentPoiId
    })
  }
  $: {
    currentPoi = $pointsOfInterest[currentPoiIndex]
  }
  $: if (currentPoi) {
    currentImage = fullImages[currentPoi.sourceName]
  }
</script>

<div class="main-display" out:fade={{ duration: 300 }}>
  {#if loading}
    <div
      class="loading"
      in:fly={{ duration: 1200, y: -20, easing: elasticOut }}
      out:fly={{ duration: 240, y: -20, easing: quadOut }}
    >
      <Loader />

      <p>Loading ({loadedFullImagesCount}/{requiredSourceNames.length})…</p>
    </div>

    {#each requiredFullImages as requiredImage}
      <ImageSourceLoader
        imageToLoad={requiredImage}
        on:loaded={() => {
          loadedFullImagesCount += 1
        }}
      />
    {/each}
  {:else}
    {#each $pointsOfInterest as poi}
      <div class="poi-canvas-wrapper">
        <PointOfInterestRenderer
          {poi}
          isCurrent={poi.id === currentPoiId}
          fullImage={fullImages[poi.sourceName]}
          on:complete={() => {
            let newPoiIndex = currentPoiIndex + 1
            if (newPoiIndex >= $pointsOfInterest.length) {
              newPoiIndex = 0
            }

            currentPoiId = $pointsOfInterest[newPoiIndex].id
          }}
        />
      </div>
    {/each}

    {#if currentPoi && $currentImage}
      <div class="metadata">
        <p class="image-info">
          {#key currentPoi.sourceName}
            <span
              style="display: inline-block"
              in:fly={{ duration: 1000, x: -12 }}
              out:fly={{ duration: 0 }}
            >
              {imageSources[currentPoi.sourceName].spacecraft}
            </span>
          {/key}
          {$currentImage.loadedAt.toLocaleTimeString(navigator.language, {
            timeStyle: 'short',
          })}
        </p>

        <p class="current-time">
          {$currentTime.toLocaleString(navigator.language, {
            timeStyle: 'short',
            dateStyle: 'medium',
          })}
        </p>
      </div>
    {/if}
  {/if}

  <button on:click={() => ($currentScreen = Screens.Configurator)}
    >Configure</button
  >
</div>

<style>
  .main-display {
    background: #000;
    width: 100vw;
    height: 100vh;
  }

  button {
    position: absolute;
    text-indent: -9999px;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: transparent;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
  }

  .poi-canvas-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .metadata {
    position: absolute;
    bottom: 6px;
    right: 12px;
    text-align: right;
  }

  .current-time {
    font-size: 24px;
    font-weight: 600;
  }

  .image-info {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-weight: 600;
  }
</style>
