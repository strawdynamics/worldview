<script lang="ts">
  import { fly } from 'svelte/transition'
  import {
    configuratorSelectedPoiId,
    pointsOfInterest,
  } from '../../stores/pointsOfInterest'

  export let poi

  // Without this, the range inputs don't match the initial POI values. If
  // directly set (`let initialZoom = poi.zoom`), the range inputs don't update
  // after switching POI.
  let initialZoom
  let initialDuration
  let initialAnimateX
  let initialAnimateY
  let initialAnimateZ
  $: if (poi) {
    initialZoom = poi.zoom
    initialDuration = poi.duration
    initialAnimateX = poi.animateX
    initialAnimateY = poi.animateY
    initialAnimateZ = poi.animateZ
  }

  const updateKey = (keyName: string, value: unknown) => {
    $pointsOfInterest = $pointsOfInterest.map((p) => {
      if (p.id !== $configuratorSelectedPoiId) {
        return p
      }

      return {
        ...p,
        [keyName]: value,
      }
    })
  }

  const resetAnimation = () => {
    updateKey('animateX', 0)
    updateKey('animateY', 0)
    updateKey('animateZ', 0)
  }
</script>

<div class="poi-details-editor">
  <div class="row">
    <div class="input two-up">
      <label>Zoom <span>{(poi.zoom * 100).toFixed(1)}%</span></label>
      <input
        type="range"
        on:input={(e) => {
          updateKey('zoom', parseFloat(e.target.value))
        }}
        bind:value={initialZoom}
        min="0.1"
        max="1.2"
        step="0.001"
      />
    </div>
    <div class="input two-up">
      <label>Duration <span>{(poi.duration / 1000).toFixed(1)}s</span></label>
      <input
        type="range"
        on:input={(e) => {
          updateKey('duration', parseInt(e.target.value, 10))
        }}
        bind:value={initialDuration}
        min="3000"
        max="120000"
        step="1"
      />
    </div>
  </div>

  <div class="row">
    <h3>Animation</h3>

    <button
      on:click={resetAnimation}
      class="reset-animation-button"
      disabled={!poi.animateX && !poi.animateY && !poi.animateZ}>Reset</button
    >
  </div>

  <div class="row">
    <div class="input three-up">
      <label>Left/Right <span>{(poi.animateX * 100).toFixed(1)}%</span></label>
      <input
        type="range"
        on:input={(e) => {
          updateKey('animateX', parseFloat(e.target.value))
        }}
        bind:value={initialAnimateX}
        min="-0.5"
        max="0.5"
        step="0.0001"
      />
    </div>
    <div class="input three-up">
      <label>Up/Down <span>{(poi.animateY * 100).toFixed(1)}%</span></label>
      <input
        type="range"
        on:input={(e) => {
          updateKey('animateY', parseFloat(e.target.value))
        }}
        bind:value={initialAnimateY}
        min="-0.5"
        max="0.5"
        step="0.0001"
      />
    </div>
    <div class="input three-up">
      <label>In/Out <span>{(poi.animateZ * 100).toFixed(1)}%</span></label>
      <input
        type="range"
        on:input={(e) => {
          updateKey('animateZ', parseFloat(e.target.value))
        }}
        bind:value={initialAnimateZ}
        min="-0.5"
        max="0.5"
        step="0.0001"
      />
    </div>
  </div>

  {#if poi.zoom + poi.animateZ < 0.1}
    <div class="row" transition:fly={{ y: -10, duration: 240 }}>
      <p class="zoom-warning">
        Zooming in this much will likely result in a blurry image.
      </p>
    </div>
  {/if}
</div>

<style>
  .poi-details-editor {
    background: #000;
    padding: 12px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 16px;
  }

  .reset-animation-button {
    padding: 0 6px;
  }

  .zoom-warning {
    font-size: 12px;
    color: rgb(186, 167, 41);
  }

  .input {
  }

  .two-up {
    width: 50%;
  }

  .three-up {
    width: 33.333333%;
  }

  label {
    font-size: 14px;
    line-height: 16px;
    display: flex;
    justify-content: space-between;
  }

  label span {
    color: #999;
    font-weight: 600;
  }

  input[type='range'] {
    -webkit-appearance: none;
    background-color: transparent;
    width: 100%;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    border: 0;
  }

  input[type='range']::-webkit-slider-thumb {
    margin-top: -8px;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
  }
</style>
