import { debounce } from "../util/debounce";
import type { ImageSourceNames } from "../util/imageSources";
import { get, readable, writable, type Writable } from "svelte/store";

export interface PointOfInterest {
  id: string;
  sourceName: ImageSourceNames;
  x: number; // %, 0-1
  y: number; // %, 0-1
  zoom: number; // %, ~0.1-1.2
  duration: number; // ms
  animateX: number; // %
  animateY: number; // %
  animateZ: number; // %
}

const localStorageKey = 'worldview.pointsOfInterest'

export const pointsOfInterestStore: Writable<PointOfInterest[]> = writable([], (set) => {
  const savedValue = localStorage.getItem(localStorageKey)
  if (savedValue) {
    set(JSON.parse(savedValue))
  }
})

const debouncedUpdatePointsOfInterestLocalStorage = debounce((value) => {
  localStorage.setItem(localStorageKey, JSON.stringify(value))
}, 100)

export const pointsOfInterest = {
  subscribe: pointsOfInterestStore.subscribe,
  set: (newValue) => {
    debouncedUpdatePointsOfInterestLocalStorage(newValue)
    pointsOfInterestStore.set(newValue)
  }
}

const nextPoiIdStore = writable(0, (set) => {
  const existingPois = get(pointsOfInterestStore)

  if (!existingPois.length) {
    set(0)
    return
  }

  set(Math.max(...(existingPois.map((poi) => {
    return parseInt(poi.id)
  }))) + 1)
})

export const poiId = {
  subscribe: nextPoiIdStore.subscribe,
  getNext: () => {
    nextPoiIdStore.update((value) => value + 1)
    return get(nextPoiIdStore).toString()
  }
}

export const configuratorSelectedPoiId = writable<string>(null)
