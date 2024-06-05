import { alerts } from '$lib/components/Alerts.svelte';

// Wrapper to execute a PocketBase client request and generate alerts on failure
export async function alertOnFailure<T>(
  request: () => Promise<T>
): Promise<T | null> {
  try {
    return await request();
  } catch (e: any) {
    const { message, data: { data = {} } = {} } = e;
    if (message) alerts.error(message);
    for (const key in data) {
      const { message } = data[key];
      if (message) alerts.error(`${key}: ${message}`);
    }
    return null;
  }
}
