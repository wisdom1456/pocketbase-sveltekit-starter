// lib/utils/apiUtils.ts
import { availableServices } from '$lib/utils/api';
import { serviceModelSelectionStore } from '$lib/app/stores';
import { get } from 'svelte/store';

export async function callAPI(inputText: string): Promise<string> {
  try {
    console.log('Calling API...');
    //const { selectedService, selectedModel } = get(serviceModelSelectionStore);

    let selectedService = get(serviceModelSelectionStore).selectedService;
    let selectedModel = get(serviceModelSelectionStore).selectedModel;
    if (!selectedService || !selectedModel) {
      console.log('Selected service: ', selectedService);
      console.log('Selected model: ', selectedModel);
      // Select the first service and first model as default
      const defaultService = availableServices[0];
      selectedService = defaultService.name;
      selectedModel = defaultService.models[0];
      console.log('Default service selected: ', selectedService);
      console.log('Default model selected: ', selectedModel);
    }

    const response = await fetch(`/api/${selectedService.toLowerCase()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText, model: selectedModel }),
    });
    console.log('Response:', response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Data:', data);
    return data.result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
