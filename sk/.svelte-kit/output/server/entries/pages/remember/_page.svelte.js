import { s as subscribe, a as set_store_value } from "../../../chunks/utils.js";
import { c as create_ssr_component, b as each, a as add_attribute, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { c as client } from "../../../chunks/index2.js";
import { w as writable } from "../../../chunks/index.js";
import { m as metadata } from "../../../chunks/metadataStore.js";
import { S as SvelteMarkdown } from "../../../chunks/SvelteMarkdown.js";
/* empty css                                                      */import "../../../chunks/Alerts.js";
import { L as LoginGuard } from "../../../chunks/LoginGuard.js";
const css = {
  code: ".tag.svelte-1h6kmfq:hover{transform:translateY(-5px);transition:transform 0.3s ease}",
  map: null
};
const TagGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  let { tags = [] } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  $$result.css.add(css);
  {
    {
      if (post && post.tags) {
        tags = post.tags;
      }
    }
  }
  return `${tags.length > 0 ? `<div class="flex flex-wrap pb-2 pt-4">${each(tags, (tag, i) => {
    return `${i < 2 ? `<a${add_attribute("href", `/tags/${tag}`, 0)} class="tag hover:bg-primary-focus mb-2 mr-2 inline-block cursor-pointer bg-primary-content px-2 py-1 text-sm text-accent svelte-1h6kmfq">#${escape(tag)} </a>` : ``}`;
  })}</div>` : `<div class="px-6 pb-2 pt-4 text-sm font-semibold" data-svelte-h="svelte-fhk8h1">No tags</div>`}`;
});
function createPostsStore() {
  const { subscribe: subscribe2, set, update } = writable({
    posts: [],
    page: 1,
    perPage: 20,
    totalPages: 1
  });
  return {
    subscribe: subscribe2,
    set,
    update,
    appendPosts: (newPosts, totalPages) => update((store) => ({
      ...store,
      posts: [...store.posts, ...newPosts],
      totalPages
    })),
    reset: () => set({ posts: [], page: 1, perPage: 20, totalPages: 1 })
  };
}
const postsStore = createPostsStore();
const PostCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  return `<div class="border-3 card m-2 flex flex-1 flex-col justify-between border border-secondary bg-base-100 shadow-xl"><div><figure> ${post.expand?.featuredImage ? (() => {
    let imageRecord = post.expand.featuredImage, imageUrl = imageRecord && imageRecord.file ? client.getFileUrl(imageRecord, imageRecord.file) : "";
    return `  <img${add_attribute("src", imageUrl, 0)}${add_attribute("alt", post.title, 0)} class="aspect-[16/9] w-full rounded-t-lg object-cover sm:aspect-[2/1] lg:aspect-[3/2]">`;
  })() : `<img src="https://via.placeholder.com/800x400.png?text=AI+Blog" alt="Placeholder" class="aspect-[16/9] w-full rounded-t-lg object-cover sm:aspect-[2/1] lg:aspect-[3/2]">`}</figure> <div class=""><div class="prose items-center p-2"><time${add_attribute("datetime", post.updated, 0)} class="text-accent">${escape(new Date(post.updated).toLocaleDateString())}</time></div> <div class="group relative px-2"><a${add_attribute("href", `/posts/${post.slug}`, 0)} class="prose-lg font-bold text-primary hover:text-secondary">${escape(post.title)}</a> <div class="prose-sm mt-3 line-clamp-6 text-justify text-base-content">${validate_component(SvelteMarkdown, "Markdown").$$render($$result, { source: post.blogSummary }, {}, {})}</div></div></div></div> <div><div class="p-2">${validate_component(TagGroup, "TagGroup").$$render($$result, { post }, {}, {})} <div class="card-actions mt-4 justify-between"><a class="btn btn-outline"${add_attribute("href", `/posts/${post.slug}/edit`, 0)}>Edit</a> <a class="btn btn-outline"${add_attribute("href", `/posts/${post.slug}/inspire`, 0)}>Inspire</a> <a class="btn btn-outline btn-secondary"${add_attribute("href", `/posts/${post.slug}#delete`, 0)}>Delete</a></div></div></div></div>`;
});
const PostList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts = [] } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  return `${Array.isArray(posts) ? `${each(posts, (post) => {
    return `${validate_component(PostCard, "PostCard").$$render($$result, { post }, {}, {})}`;
  })}` : `<p data-svelte-h="svelte-gd33y5">Error: Posts data is not available.</p>`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $metadata, $$unsubscribe_metadata;
  $$unsubscribe_metadata = subscribe(metadata, (value) => $metadata = value);
  let posts = [];
  postsStore.subscribe((value) => {
    posts = value.posts;
  });
  set_store_value(metadata, $metadata.title = "", $metadata);
  set_store_value(metadata, $metadata.description = "AI powered note taking", $metadata);
  $$unsubscribe_metadata();
  return `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
    default: () => {
      return `<div><div class="mx-auto max-w-7xl px-6 lg:px-8">${Array.isArray(posts) ? `<div class="grid grid-cols-1 gap-x-2 gap-y-2 overflow-y-auto lg:grid-cols-3">${validate_component(PostList, "PostList").$$render($$result, { posts }, {}, {})}</div>` : `<p data-svelte-h="svelte-gd33y5">Error: Posts data is not available.</p>`}</div></div>`;
    }
  })}`;
});
export {
  Page as default
};
