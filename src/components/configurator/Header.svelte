<script>
  import { currentConfiguratorSource } from '../../stores/currentConfiguratorSource'
  import { currentScreen, Screens } from '../../stores/currentScreen'
  import { pointsOfInterest } from '../../stores/pointsOfInterest'
  import { imageSources } from '../../util/imageSources'
</script>

<header>
  <h1>
    Worldview
    <a href="#about" class="about-button" aria-label="Open about screen">?</a>
  </h1>

  <div class="header-controls">
    <select
      bind:value={$currentConfiguratorSource}
      class="current-source-select"
    >
      {#each Object.values(imageSources) as imageSource}
        <option value={imageSource}>{imageSource.name}</option>
      {/each}
    </select>
    <button
      on:click={() => ($currentScreen = Screens.Display)}
      class="play-button"
      disabled={!$pointsOfInterest.length}>Play</button
    >
  </div>
</header>

<style>
  header {
    background: #000;
    padding: 30px 12px 12px;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  h1 {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
  }

  .header-controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 12px;
  }

  .play-button {
    font-size: 16px;
    padding: 3px 12px;
  }
  @media (min-aspect-ratio: 1/1) {
    header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .header-controls {
      justify-content: space-between;
    }
  }
</style>
