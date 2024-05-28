import { client } from "$lib/pocketbase";


export async function createImage(imagePrompt: string, engineId: string): Promise<string | null> {
  try {
    const response = await fetch('/api/dreamstudio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: imagePrompt,
        engineId: engineId,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error(`Failed to generate image: ${response.statusText}`, errorDetails);
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    const result = await response.json();
    return result.id; // Ensure this matches the actual API response structure
  } catch (error) {
    console.error('Error creating image:', error);
    throw error;
  }
}