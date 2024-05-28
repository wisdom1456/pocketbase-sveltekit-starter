<script lang="ts">
  export let subPost: any;
  
  let subPostTitle = subPost.title;
  let subPostContent = subPost.content;
  </script>
  
  <div class="subpost-card border rounded shadow p-4 mb-4">
    <h3 class="font-semibold text-lg mb-2">{subPostTitle}</h3>
    <p>{subPostContent}</p>
  </div>
  
  <style>
  /* Add relevant styles */
  </style>
  