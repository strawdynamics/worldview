import { writable, type Writable } from "svelte/store";

export enum Screens {
  Configurator = "Configurator",
  Display = "Display",
}

export const currentScreen: Writable<Screens> = writable(Screens.Configurator)
