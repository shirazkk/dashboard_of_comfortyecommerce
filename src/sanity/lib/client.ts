import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-10-21", // Use the date of your latest schema
  useCdn: false, // `false` ensures fresh data
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN
});

export default client;

