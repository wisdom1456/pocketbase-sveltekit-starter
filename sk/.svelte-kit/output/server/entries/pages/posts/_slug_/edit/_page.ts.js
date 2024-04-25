import { c as client } from "../../../../../chunks/index2.js";
const load = async function({ params }) {
  const { slug } = params;
  try {
    const { items } = await client.collection("posts").getList(void 0, void 0, {
      filter: `slug='${slug}'`
    });
    if (items.length === 0) {
      throw new Error("Post not found");
    }
    const post = items[0];
    let featuredImageUrl = "";
    if (post.featuredImage) {
      const image = await client.collection("images").getOne(post.featuredImage);
      if (image && image.file) {
        featuredImageUrl = client.getFileUrl(image, image.file);
      }
    }
    return { post, featuredImageUrl };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};
export {
  load
};
