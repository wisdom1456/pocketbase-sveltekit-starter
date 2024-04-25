import { s as subscribe, a as set_store_value, i as is_promise, n as noop } from "../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, b as each, a as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { m as metadata } from "../../../chunks/metadataStore.js";
import { c as client } from "../../../chunks/index2.js";
import "../../../chunks/Alerts.js";
import { S as SvelteMarkdown } from "../../../chunks/SvelteMarkdown.js";
import { w as writable } from "../../../chunks/index.js";
import { L as LoginGuard } from "../../../chunks/LoginGuard.js";
const postsStore = writable([]);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_postsStore;
  let $metadata, $$unsubscribe_metadata;
  $$unsubscribe_postsStore = subscribe(postsStore, (value) => value);
  $$unsubscribe_metadata = subscribe(metadata, (value) => $metadata = value);
  async function getFeaturedImageUrl(post) {
    if (post.featuredImage) {
      const image = await client.collection("images").getOne(post.featuredImage);
      if (image && image.file) {
        return client.getFileUrl(image, image.file);
      }
    }
    return "https://via.placeholder.com/800x400.png?text=AI+Blog";
  }
  set_store_value(metadata, $metadata.title = "AI powered note taking", $metadata);
  set_store_value(metadata, $metadata.description = "AI powered note taking", $metadata);
  let posts = [];
  $$unsubscribe_postsStore();
  $$unsubscribe_metadata();
  return `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
    default: () => {
      return `${each(posts, (post) => {
        return `<div class="card bg-base-300 flex w-full flex-col justify-between p-4 shadow-xl"><div><figure>${function(__value) {
          if (is_promise(__value)) {
            __value.then(null, noop);
            return ` <img src="https://via.placeholder.com/800x400.png?text=Loading..." alt="Loading..." class="aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]"> `;
          }
          return function(featuredImageUrl) {
            return ` <img${add_attribute("src", featuredImageUrl, 0)}${add_attribute("alt", post.title, 0)} class="aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]"> `;
          }(__value);
        }(getFeaturedImageUrl(post))}</figure> <div class="m-4 max-w-xl"><div class="prose items-center gap-x-4" data-svelte-h="svelte-189i4nw"></div> <div class="group relative mt-3"><a${add_attribute("href", `/posts/${post.slug}`, 0)} class="prose-lg text-primary line-clamp-2 font-bold">${escape(post.title)}</a> <div class="prose-sm text-base-content mt-3 line-clamp-6 text-justify">${validate_component(SvelteMarkdown, "Markdown").$$render($$result, { source: post.blogSummary || post.body }, {}, {})} </div></div> </div></div> </div>`;
      })} ${posts.length === 0 ? `<div class="card bg-base-300 flex w-full flex-col justify-between p-4 shadow-xl" data-svelte-h="svelte-1i59cfa"><div><div class="m-4 max-w-xl"><div class="prose items-center gap-x-4"><div class="text-accent">No posts found</div></div></div></div></div>` : ``}`;
    }
  })}`;
});
export {
  Page as default
};
