<script lang="ts">
  import PointOfInterestEditor from './PointOfInterestEditor.svelte'
  import Header from './Header.svelte'
</script>

<div class="configurator-scroll">
  <div class="configurator">
    <Header />

    <PointOfInterestEditor />
  </div>
</div>

<style>
  .configurator-scroll {
    overflow: auto;
    height: 100%;
  }

  .configurator {
    max-width: 550px;
    margin: 0 auto;
    min-height: 100%;
    padding: 0 0 60px;
  }
  @media (min-aspect-ratio: 1/1) {
    .configurator {
      max-width: 700px;
    }
  }
</style>
