import { goto } from "$app/navigation";
import { authModel, client, save } from "$lib/pocketbase";
import { metadata } from "$lib/app/stores";
import type {
  PostsResponse,
  SubpostRecord,
} from "$lib/pocketbase/generated-types";
import { ensureTagsExist, generateImageFromDreamStudio } from "$lib/utils/api";
import { alertOnFailure } from "$lib/pocketbase/ui";
import { callAPI } from "$lib/utils/apiUtils";
import {
  promptFormat,
  titlePrompt,
  tagPrompt,
  blogSummaryPrompt,
  imagePrompt,
  blogResponsePrompt,
  tagTreePrompt,
} from "$lib/utils/prompts";
import { serviceModelSelectionStore } from "$lib/app/stores";
import { get } from "svelte/store";
import { availableServices } from "$lib/utils/api";
import { createPost } from "$lib/services/postService";

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

// Define the structure for the service and model selection
export interface ServiceModelSelection {
  selectedService: string;
  selectedModel: string;
}

// Main function to generate and save the blog post
export async function generateBlog(
  userInput: string,
  engineId: string,
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
    const { selectedService, selectedModel } = get(serviceModelSelectionStore);

    // Generate content
    post.body = await callAPI(
      `${promptFormat}'${userInput}'`
    );
    post.title = await callAPI(
      `${titlePrompt}'${post.body}'`
    );
    const tagString = await callAPI(
      `${tagPrompt}'${post.body}'`
    );
    post.blogSummary = await callAPI(
      `${blogSummaryPrompt}'${post.body}'`
    );

    // Generate slug
    post.slug = post.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .substring(0, 50);
    post.prompt = userInput;

    // Save tags
    const tagsArray = tagString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    const tagIds = await ensureTagsExist(tagsArray);
    post.tags = tagIds;

    // Generate image
    const imageResponseText = await callAPI(
      `${imagePrompt}'${post.body}'`
    );

    // Create the post using the createPost function from postsService
    const createdPost = await createPost(
      post as Partial<PostsResponse>,
      imageResponseText,
      engineId
    );

    if (createdPost !== undefined) {
      // Redirect to the newly created post
      goto(
        `${import.meta.env.VITE_APP_SK_URL}posts/${
          (createdPost as PostsResponse).slug
        }`
      );
    } else {
      throw new Error("Failed to create the post.");
    }
  } catch (error) {
    alertOnFailure(() => `Failed to generate and save post: ${error}`);
    throw error;
  }
}

function isBase64Image(str: string) {
  const base64ImagePattern =
    /^data:image\/(?:png|jpeg|gif);base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64ImagePattern.test(str);
}

// Main function to generate and save the blog response (subpost)
export async function generateBlogResponse(
  userInput: string,
  parentPostId: string,
  authModel: any
): Promise<void> {
  /* if (!authModel?.id) {
    console.error("User is not logged in.");
    alert("Please log in to save your subpost.");
    return;
  } */

  let subpost: SubpostRecord = {
    title: "",
    content: "",
    post: parentPostId,
    slug: "",
  };

  try {
    const { selectedService, selectedModel } = get(serviceModelSelectionStore);

    // Generate content and title concurrently
    const [content, title] = await Promise.all([
      callAPI(
        `${blogResponsePrompt} + "  " + '${userInput}'`
      ),
      callAPI(`${titlePrompt}'${userInput}'`),
    ]);
    // Generate slug
    subpost.slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .substring(0, 50);

    subpost.content = content;
    subpost.title = title;
    // Create the subpost
    await save("subpost", subpost as SubpostRecord, true);

    // Redirect to the parent post
    const parentPost = await client.collection("posts").getOne(parentPostId);
    goto(`${import.meta.env.VITE_APP_SK_URL}/posts/${parentPost.slug}`);
  } catch (error) {
    alertOnFailure(() => `Failed to generate and save subpost: ${error}`);
    throw error;
  }
}

export async function generateTagTree(
  tags: string,
  authModel: any
): Promise<string> {
  try {
    let tempName = availableServices[1].name;
    let tempMode = availableServices[1].models[1];

    const {} = get(serviceModelSelectionStore);

    // Generate content
    const [rawTagTree] = await Promise.all([
      await callAPI(`${tagTreePrompt}'${tags}'`),
    ]);

    // Clean the generated tagTree
    //const cleanedTagTree = cleanTagTree(rawTagTree);

    // Parse the cleaned tagTree as JSON
    //const parsedTagTree = JSON.parse(cleanedTagTree);
    return rawTagTree;
  } catch (error) {
    alertOnFailure(() => `Failed to generate and save post: ${error}`);
    throw error;
  }
}

function cleanTagTree(rawTagTree: string): string {
  // Remove intro and exit text
  const cleanedTagTree = rawTagTree
    .replace(/^[\s\S]*?{/, "{")
    .replace(/}[\s\S]*?$/, "}");

  // Validate and format the JSON
  try {
    console.log("cleanedTagTree: ", cleanedTagTree);
    const parsedTagTree = JSON.parse(cleanedTagTree);
    console.log("parsedTagTree: ", parsedTagTree);
    const formattedTagTree = JSON.stringify(parsedTagTree, null, 2);
    return formattedTagTree;
  } catch (error: any) {
    throw new Error(`Invalid JSON: ${error.message}`);
  }
}
