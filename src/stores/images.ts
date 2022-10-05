import { ImageSourceNames, imageSources, type ImageSource } from "../util/imageSources";
import { readable, type Readable } from "svelte/store";
import { tick } from "svelte";

export interface ImageStore {
  image: HTMLImageElement;
  loadedAt: Date;
}

const createImageStore = ({name, url, interval}: {name: string, url: string, interval: number}) => {
  return readable<ImageStore>(null, (set) => {
    const updateImage = () => {
      const newImg = new Image()
      newImg.onload = async () => {
        const loadedAt = new Date()
        console.log(`Loaded image ${name} (${loadedAt.toLocaleString('en-US', {timeStyle: 'short', dateStyle: 'short'})})`, newImg.src)
        await tick()
        set({image: newImg, loadedAt})
      }
      newImg.src = `${url}?${Date.now()}`
    }

    updateImage()
    const updateImageInterval = setInterval(
      updateImage,
      interval * 1000
    )

    return () => {
      clearInterval(updateImageInterval)
    }
  })
}

export const fullImages = Object.values(imageSources).reduce<Partial<Record<ImageSourceNames, Readable<ImageStore>>>>((acc, imageSource) => {
  acc[imageSource.name] = createImageStore({
    name: imageSource.name,
    url: imageSource.url.full,
    interval: imageSource.interval,
  })

  return acc
}, {})

export const largeImages = Object.values(imageSources).reduce<Partial<Record<ImageSourceNames, Readable<ImageStore>>>>((acc, imageSource) => {
  acc[imageSource.name] = createImageStore({
    name: imageSource.name,
    url: imageSource.url.large,
    interval: imageSource.interval,
  })

  return acc
}, {})

export const smallImages = Object.values(imageSources).reduce<Partial<Record<ImageSourceNames, Readable<ImageStore>>>>((acc, imageSource) => {
  acc[imageSource.name] = createImageStore({
    name: imageSource.name,
    url: imageSource.url.small,
    interval: imageSource.interval,
  })

  return acc
}, {})

export const tinyImages = Object.values(imageSources).reduce<Partial<Record<ImageSourceNames, Readable<ImageStore>>>>((acc, imageSource) => {
  acc[imageSource.name] = createImageStore({
    name: imageSource.name,
    url: imageSource.url.tiny,
    interval: imageSource.interval,
  })

  return acc
}, {})
