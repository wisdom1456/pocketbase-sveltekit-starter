// @ts-nocheck
import type { PageLoad } from "./$types";

export const load = async function ({ fetch }: Parameters<PageLoad>[0]) {
  const response = await fetch("/api/hello");
  const json = await response.json();
  return {
    ...json,
  };
};
