// @ts-nocheck
import { client } from "$lib/pocketbase";
import type { PageLoad } from "./$types";

export const load = async function ({ params: { coll, id } }: Parameters<PageLoad>[0]) {
  const logs = await client.collection("auditlog").getFullList({
    // TODO: access control
    filter: `record="${id}" && collection="${coll}"`,
    expand: "user",
  });
  return {
    logs,
  };
};
