<script lang="ts">
  import { imageSources } from '../../util/imageSources'

  import {
    configuratorSelectedPoiId,
    pointsOfInterest,
  } from '../../stores/pointsOfInterest'
  import PointOfInterestEditorPreview from './PointOfInterestEditorPreview.svelte'
  import PointOfInterestFilmstrip from './PointOfInterestFilmstrip.svelte'
  import PointOfInterestDetailsEditor from './PointOfInterestDetailsEditor.svelte'
  import { currentConfiguratorSource } from '../../stores/currentConfiguratorSource'
  import { smallImages } from '../../stores/images'
  import PointOfInterestEditorSourceRenderer from './PointOfInterestEditorSourceRenderer.svelte'

  let poiWrapperEl: HTMLDivElement

  let editorWidth
  $: editorHeight = editorWidth / $currentConfiguratorSource.aspect

  $: selectedPoi = $pointsOfInterest.find((poi) => {
    return poi.id === $configuratorSelectedPoiId
  })

  $: if (selectedPoi) {
    $currentConfiguratorSource = imageSources[selectedPoi.sourceName]
  }
</script>

<div class="poi-editor">
  <div class="filmstrip-screen-details">
    <div class="filmstrip">
      <PointOfInterestFilmstrip />
    </div>

    <div class="screen-details">
      <div
        class="screen-wrapper"
        bind:clientWidth={editorWidth}
        style:height="{editorHeight}px"
        bind:this={poiWrapperEl}
      >
        <PointOfInterestEditorSourceRenderer
          {editorWidth}
          {editorHeight}
          image={smallImages[$currentConfiguratorSource.name]}
        />

        {#each $pointsOfInterest as poi, index (poi.id)}
          {#if poi.sourceName === $currentConfiguratorSource.name}
            <PointOfInterestEditorPreview
              {poiWrapperEl}
              {poi}
              {editorWidth}
              {editorHeight}
              index={index + 1}
            />
          {/if}
        {/each}
      </div>

      <div class="details-editor-wrapper">
        {#if selectedPoi}
          <PointOfInterestDetailsEditor poi={selectedPoi} />
        {/if}

        <!-- <p
          style="font-size: 12px;">
          {JSON.stringify($pointsOfInterest)}
        </p> -->
      </div>
    </div>
  </div>
</div>

<style>
  header {
    position: relative;
    z-index: 2;
  }

  .screen-wrapper {
    margin: 24px;
    position: relative;
    z-index: 1;
  }

  .screen-wrapper img {
    vertical-align: bottom;
    width: 100%;
  }

  .details-editor-wrapper {
    position: relative;
    z-index: 2;
  }

  .filmstrip {
    position: relative;
    z-index: 2;
  }

  .filmstrip-screen-details {
    display: flex;
    flex-direction: column;
  }

  .screen-details {
    width: 100%;
  }

  @media (min-aspect-ratio: 1/1) {
    .filmstrip-screen-details {
      flex-direction: row;
    }
  }
</style>
