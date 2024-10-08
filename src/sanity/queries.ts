import { defineQuery } from 'next-sanity';

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"]{..., stack[]->{name, logo, type} }`,
);

export const PROJECT_ID_QUERY = defineQuery(
  `*[_type == "project" && _id == $id][0]{..., stack[]->{name, logo, type} }`,
);

export const AUTHOR_QUERY = defineQuery(`*[_type == "author"][0]`);

export const STACKS_QUERY = defineQuery(`{
  "frontend": *[_type == "stack" && type == "frontend"],
  "backend": *[_type == "stack" && type == "backend"],
  "devtools": *[_type == "stack" && type == "devtools"]
}`);

export const FOOTER_STACKS_QUERY = defineQuery(`*[
    _type == "project" && name in ["react", "next", "typescript", "framer", "sass", "sanity"]
]{name, logo, type}`);
