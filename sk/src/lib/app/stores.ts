import { goto } from "$app/navigation";
import { authModel, client, save } from "$lib/pocketbase";
import type { PostsResponse, PostsRecord } from "$lib/pocketbase/generated-types";
import { ensureTagsExist, generateImageFromDreamStudio } from "$lib/utils/api";
import { alertOnFailure } from "$lib/pocketbase/ui";
import {
  promptFormat,
  titlePrompt,
  tagPrompt,
  blogSummaryPrompt,
  imagePrompt,
} from "$lib/utils/prompts";
import { get, writable } from 'svelte/store';
import type { ServiceModelSelection } from '$lib/services/generateBlog';

export interface Metadata {
  title?: string;
  description?: string;
  headline?: string;
}

export const metadata = writable<Metadata>({});

// Define the structure of the post data
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

export const serviceModelSelectionStore = writable<ServiceModelSelection>({
  selectedService: '',
  selectedModel: '',
});


// Function to call the API
async function callAPI(selectedService: string, selectedModel: string, inputText: string): Promise<string> {
  if (!selectedService || !selectedModel) {
    throw new Error("Service or model not selected.");
  }

  const response = await fetch(`/api/${selectedService.toLowerCase()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: inputText, model: selectedModel }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.result;
}

// Main function to generate and save the blog post
export async function generateBlog(
  userInput: string,
  authModel: any
): Promise<void> {
  /* if (!authModel?.id) {
    console.error("User is not logged in.");
    alert("Please log in to save your post.");
    return;
  } */

  let post: PostData = {
    title: "",
    slug: "",
    body: "",
    blogSummary: "",
    featuredImage: "",
    prompt: "",
    userid: authModel.id,
    tags: [],
  };

  try {
    // Get the selected service and model from the store
    const { selectedService, selectedModel } = get(serviceModelSelectionStore);

    // Generate content
    post.body = await callAPI(selectedService, selectedModel, `${promptFormat}'${userInput}'`);
    post.title = await callAPI(selectedService, selectedModel, `${titlePrompt}'${post.body}'`);
    const tagString = await callAPI(selectedService, selectedModel, `${tagPrompt}'${post.body}'`);
    post.blogSummary = await callAPI(selectedService, selectedModel, `${blogSummaryPrompt}'${post.body}'`);

    // Generate slug
    post.slug = post.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").substring(0, 50);
    post.prompt = userInput;

    // Generate image
    const imageResponseText = await callAPI(selectedService, selectedModel, `${imagePrompt}'${post.body}'`);
    const base64Image = await generateImageFromDreamStudio(imageResponseText);

    // Upload image and save post
    const imageBlob = await fetch(`data:image/png;base64,${base64Image}`).then((res) => res.blob());
    if (imageBlob.size > 5242880) {
      throw new Error("Image size exceeds the maximum limit of 5MB.");
    }
    const formData = new FormData();
    formData.append("file", imageBlob, "postImage.png");
    const createdImageRecord = await client.collection("images").create(formData);
    post.featuredImage = createdImageRecord.id;

    // Save tags
    const tagsArray = tagString.split(",").map((tag) => tag.trim()).filter((tag) => tag);
    const tagIds = await ensureTagsExist(tagsArray);
    post.tags = tagIds;

    // Create the post
    const createdPost = await save("posts", post as PostsRecord, true) as unknown as PostsResponse;

    // Redirect to the newly created post
    goto(`${import.meta.env.VITE_APP_SK_URL}/posts/${createdPost.slug}`);
  } catch (error) {
    alertOnFailure(() => `Failed to generate and save post: ${error}`);
    throw error;
  }
}