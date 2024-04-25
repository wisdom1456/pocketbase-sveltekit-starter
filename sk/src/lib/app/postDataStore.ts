// postDataStore.ts
import { writable } from "svelte/store";

interface PostData {
  title: string;
  slug: string;
  body: string;
  blogSummary: string;
  featuredImage: string;
  prompt: string;
  userid: string;
  tags: string[];
}

export const postData = writable<PostData>({
  title: "",
  slug: "",
  body: "",
  blogSummary: "",
  featuredImage: "",
  prompt: "",
  userid: "",
  tags: [],
});
