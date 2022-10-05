import { readable } from 'svelte/store'

// https://bjornlu.com/blog/simple-svelte-routing-with-reactive-urls
export const hash = readable(window.location.hash, set => {
  const update = () => {
    set(window.location.hash)
  }

  window.addEventListener('hashchange', update)

  return () => {
    window.removeEventListener('hashchange', update)
  }
})
