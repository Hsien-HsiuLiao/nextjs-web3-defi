import React from "react";

// Function to fetch posts from the API
async function fetchPosts() {
  const response = await fetch("https://dev.to/api/articles");

  // Check if the response is successful
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  // Parse the JSON data from the response
  const data = await response.json();
  return data;
}

// Main Posts component to display the fetched posts
const Posts = ({ posts }) => (
  <div>
    <h1>Blog Posts</h1>
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li> // Display each post title
      ))}
    </ul>
  </div>
);

export default Posts;

// Fetch the posts at build time
export async function getStaticProps() {
  const posts = await fetchPosts();
  return {
    props: {
      posts,
    },
  };
}