<div class="about-modal">
  <div class="about-modal-inner">
    <h1>
      Worldview <a href="#" class="about-button" aria-label="Close about screen"
        >×</a
      >
    </h1>

    <p>
      A world clock powered by space-age technology. View beautiful, near
      real-time satellite photographs from around the world, with locations and
      animations specified by you! Inspired by <a
        target="_blank"
        href="https://downlinkapp.com/">Downlink</a
      >.
    </p>

    <p>
      I made Worldview to replace a messy script I'd written to update the
      background of a monitor in my office. Hopefully you enjoy looking at it as
      much as I have.
    </p>

    <p><a target="_blank" href="https://paulstraw.com">-paul</a></p>
  </div>
</div>

<style>
  .about-modal {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .about-modal-inner {
    max-width: 550px;
    margin: 0 auto;
    padding: 30px 12px 60px;
    overflow: hidden;
  }

  .about-modal p {
    margin: 12px 0 0;
  }

  .about-modal p a {
    color: #bbb;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 2px dotted #bbb;
  }

  @media (min-aspect-ratio: 1/1) {
    .about-modal-inner {
      max-width: 700px;
    }
  }
</style>
