const load = async function({ fetch }) {
  const response = await fetch("/api/hello");
  const json = await response.json();
  return {
    ...json
  };
};
export {
  load
};
