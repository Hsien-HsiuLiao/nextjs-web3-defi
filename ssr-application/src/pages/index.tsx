import React from "react";

// Simulate fetching data from the server
async function fetchServerData() {
  return "Hi, my name is Mercy Tanga, I'm a software developer and a technical writer. This data is fetched on the server side.";
}

const About = ({ serverData }) => (
  <div>
    <h1>About Page</h1>
    <p>{serverData}</p>
  </div>
);

export default About;

// Fetch server-side data
export async function getServerSideProps() {
  const serverData = await fetchServerData();
  return {
    props: {
      serverData,
    },
  };
}