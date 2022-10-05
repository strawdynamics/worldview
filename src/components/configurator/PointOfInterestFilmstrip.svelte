<script lang="ts">
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'
  import {
    configuratorSelectedPoiId,
    poiId,
    pointsOfInterest,
  } from '../../stores/pointsOfInterest'
  import PointOfInterestFilmstripItem from './PointOfInterestFilmstripItem.svelte'
  import satelliteSvg from '../../assets/satellite.svg'
  import { currentConfiguratorSource } from '../../stores/currentConfiguratorSource'

  const flipDuration = 240

  const addPoi = () => {
    const newId = poiId.getNext()

    const newPoi = {
      id: newId,
      sourceName: $currentConfiguratorSource.name,
      x: 0.5,
      y: 0.5,
      zoom: 0.25,
      duration: 30000,
      animateX: 0,
      animateY: 0,
      animateZ: 0,
    }

    if ($configuratorSelectedPoiId) {
      const selectedPoiIndex = $pointsOfInterest.findIndex((p) => {
        return p.id === $configuratorSelectedPoiId
      })

      $pointsOfInterest.splice(selectedPoiIndex + 1, 0, newPoi)
      $pointsOfInterest = $pointsOfInterest
    } else {
      $pointsOfInterest = [...$pointsOfInterest, newPoi]
    }

    $configuratorSelectedPoiId = newId
  }

  const handleDndConsider = (e) => {
    $pointsOfInterest = e.detail.items
  }

  const handleDndFinalize = (e) => {
    $pointsOfInterest = e.detail.items
  }

  let windowWidth = 0
  let windowHeight = 0
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div class="poi-filmstrip">
  <button
    on:click={addPoi}
    style:width="{(70 / windowHeight) * windowWidth}px"
    class="add-button"
  >
    <img src={satelliteSvg} alt="" />
    <span>Add POI</span>
  </button>

  <ol
    use:dndzone={{
      items: $pointsOfInterest,
      flipDurationMs: flipDuration,
      centreDraggedOnCursor: false,
      morphDisabled: true,
    }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each $pointsOfInterest as poi, index (poi.id)}
      <li
        animate:flip={{ duration: flipDuration }}
        style:width="{(70 / windowHeight) * windowWidth}px"
      >
        <PointOfInterestFilmstripItem {poi} index={index + 1} />
      </li>
    {/each}
  </ol>
</div>

<style>
  .poi-filmstrip {
    display: flex;
    background: #000;
  }

  .add-button {
    height: 70px;
    min-width: 50px;
    background: #fff;
    flex-shrink: 0;
    margin-top: 12px;
    margin-left: 12px;
    margin-bottom: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .add-button span {
    display: block;
  }

  ol {
    list-style: none;
    display: flex;
    overflow: auto;
    padding-left: 12px;
    padding-top: 12px;
    max-height: 620px;
  }

  li {
    flex-shrink: 0;
    margin-bottom: 12px;
    margin-right: 12px;
  }

  @media (min-aspect-ratio: 1/1) {
    .poi-filmstrip {
      flex-direction: column;
    }

    .add-button {
      margin-bottom: 0;
      margin-right: 12px;
    }

    ol {
      flex-direction: column;
    }
  }
</style>
