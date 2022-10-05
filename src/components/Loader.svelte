<div class="system">
  <div class="planet" />
  <div class="satellite-orbit">
    <div class="satellite" />
  </div>
</div>

<style>
  @keyframes orbit-spin {
    from {
      transform: rotate3d(0, 1, 0, 0deg);
    }
    to {
      transform: rotate3d(0, 1, 0, 360deg);
    }
  }

  @keyframes satellite-spin {
    0% {
      transform: rotate3d(0, 1, 0, 0deg);
    }
    25% {
      transform: rotate3d(0, 1, 0, -90deg) scale(1.1);
    }
    50% {
      transform: rotate3d(0, 1, 0, -180deg);
    }
    75% {
      transform: rotate3d(0, 1, 0, -270deg) scale(0.9);
    }
    100% {
      transform: rotate3d(0, 1, 0, -360deg);
    }
  }

  .system {
    width: 80px;
    height: 80px;
    position: relative;
    transform-style: preserve-3d;
    transform-origin: center;
    transform: rotate3d(1, 0, 1, -15deg);
  }

  .satellite-orbit {
    animation: orbit-spin 2s infinite linear;
    height: 100%;
    transform-style: preserve-3d;
  }

  .satellite {
    background-color: #ddd;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    margin-top: -6px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background-clip: padding-box;
    position: absolute;
    top: 50%;
    animation: satellite-spin 2s infinite linear;
  }

  .planet {
    background-color: #248cb9;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) rotate3d(1, 0, 0, 15deg);
  }
</style>
