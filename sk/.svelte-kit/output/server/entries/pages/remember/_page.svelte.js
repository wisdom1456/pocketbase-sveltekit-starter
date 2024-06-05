import { s as subscribe, a as set_store_value } from "../../../chunks/utils.js";
import { c as create_ssr_component, e as each, b as add_attribute, d as escape, a as createEventDispatcher, v as validate_component } from "../../../chunks/ssr.js";
import { c as client } from "../../../chunks/index2.js";
import { w as writable } from "../../../chunks/index.js";
import "../../../chunks/Alerts.js";
import { m as metadata } from "../../../chunks/metadataStore.js";
import { L as LoginGuard } from "../../../chunks/LoginGuard.js";
const TagGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  let { mode = "few" } = $$props;
  let { tags = post.tags || [] } = $$props;
  let displayedTags = [];
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  {
    if (post && post.expand && post.expand.tags) {
      tags = post.expand.tags.map((tag) => tag.title);
    }
  }
  {
    if (mode === "main" && tags.length > 0) {
      displayedTags = [tags[0]];
    } else if (mode === "few" && tags.length > 0) {
      displayedTags = tags.slice(0, 3);
    } else if (mode === "all") {
      displayedTags = tags;
    }
  }
  return `${displayedTags.length > 0 ? `<div>${each(displayedTags, (tag, i) => {
    return `<a${add_attribute("href", `/tags/${tag}`, 0)} class="cursor-pointer text-xs text-accent">${escape(tag)} </a>`;
  })}</div>` : `<div class="px-6 pb-2 pt-4 text-sm font-semibold" data-svelte-h="svelte-3rvzpf">No tags</div>`}`;
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
  createEventDispatcher();
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  return `<article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-base-100 px-8 pb-8 pt-80 shadow-lg transition-shadow hover:shadow-2xl"><img${add_attribute(
    "src",
    post.expand?.featuredImage?.file ? client.getFileUrl(post.expand.featuredImage, post.expand.featuredImage.file) : "https://via.placeholder.com/800x400.png?text=AI+Blog",
    0
  )}${add_attribute("alt", post.title, 0)} class="absolute inset-0 -z-10 h-full w-full object-cover"> <div class="absolute inset-0 -z-10 bg-gradient-to-t from-base-200 to-transparent"></div> <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div> <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300"><div class="-ml-4 flex items-center gap-x-4"><svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"><circle cx="1" cy="1" r="1"></circle></svg> <div class="flex gap-x-2.5"><time${add_attribute("datetime", post.updated, 0)} class="text-secondary">${escape(new Date(post.updated).toLocaleDateString())}</time></div> <div class="flex gap-x-2.5">${validate_component(TagGroup, "TagGroup").$$render($$result, { post, mode: "main" }, {}, {})}</div></div></div> <h3 class="mt-3 text-lg font-semibold leading-6 text-primary"><a${add_attribute("href", `/posts/${post.slug}`, 0)}><span class="absolute inset-0"></span> ${escape(post.title)}</a></h3></article>`;
});
const PostList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts } = $$props;
  createEventDispatcher();
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  return `${posts && posts.length > 0 ? `<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">${each(posts, (post) => {
    return `${validate_component(PostCard, "PostCard").$$render($$result, { post }, {}, {})}`;
  })}</div>` : `<p class="text-center" data-svelte-h="svelte-1x8h4oj">No posts available.</p>`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $metadata, $$unsubscribe_metadata;
  $$unsubscribe_metadata = subscribe(metadata, (value) => $metadata = value);
  let posts = [];
  postsStore.subscribe((value) => {
    posts = value.posts;
    console.log("Posts in Remember Page:", posts);
  });
  set_store_value(metadata, $metadata.title = "Remember", $metadata);
  set_store_value(metadata, $metadata.description = "AI powered note taking", $metadata);
  $$unsubscribe_metadata();
  return `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="container mx-auto p-6">${posts.length > 0 ? `${validate_component(PostList, "PostList").$$render($$result, { posts, tagMode: "few" }, {}, {})}` : `<p class="text-center" data-svelte-h="svelte-1x8h4oj">No posts available.</p>`}</div>`;
    }
  })}`;
});
export {
  Page as default
};
