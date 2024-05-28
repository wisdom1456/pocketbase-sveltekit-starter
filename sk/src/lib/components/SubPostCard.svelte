<script lang="ts">
    export let subPost: any; // Define the type based on your subpost structure
  </script>
  
  <article class="subpost-card border p-4 my-2 rounded shadow">
    <h4 class="subpost-title font-bold">{subPost.title}</h4>
    <a class="subpost-link text-blue-500 hover:text-blue-700" href={`/subposts/${subPost.slug}`}>
      Read more
    </a>
  </article>
  
  <style>
    /* Add your CSS for the subpost card here */
  </style>