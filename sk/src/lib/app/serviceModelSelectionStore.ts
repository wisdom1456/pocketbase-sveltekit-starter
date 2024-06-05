// serviceModelSelectionStore.ts
import { writable } from 'svelte/store';

export interface ServiceModelSelection {
  selectedService: string;
  selectedModel: string;
}

export const serviceModelSelectionStore = writable<ServiceModelSelection>({
  selectedService: '',
  selectedModel: '',
});
