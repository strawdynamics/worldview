import { imageSources, type ImageSource } from "../util/imageSources";
import { writable } from "svelte/store";

export const currentConfiguratorSource = writable<ImageSource>(Object.values(imageSources)[0])
