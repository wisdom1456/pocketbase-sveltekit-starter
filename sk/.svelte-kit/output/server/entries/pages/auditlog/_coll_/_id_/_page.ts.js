import { c as client } from "../../../../../chunks/index.js";
const load = async function({ params: { coll, id } }) {
  const logs = await client.collection("auditlog").getFullList({
    // TODO: access control
    filter: `record="${id}" && collection="${coll}"`,
    expand: "user"
  });
  return {
    logs
  };
};
export {
  load
};
