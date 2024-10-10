import { defineQuery } from 'next-sanity';

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(index asc) {..., stack[]->{name, logo, type} }`,
);

export const PROJECT_ID_QUERY = defineQuery(
  `*[_type == "project" && _id == $id][0]{..., stack[]->{name, logo, type} }`,
);

export const AUTHOR_QUERY = defineQuery(`*[_type == "author"][0]`);

export const STACKS_QUERY = defineQuery(`{
  "frontend": *[_type == "stack" && name == "react"] | order(proficiency desc, name asc),
  "backend": *[_type == "stack" && type == "backend"] | order(proficiency desc, name asc),
  "devtools": *[_type == "stack" && type == "devtools"] | order(proficiency desc, name asc),
  "others": *[_type == "stack" && type == "others"] | order(proficiency desc, name asc)
}`);

export const FOOTER_STACKS_QUERY = defineQuery(`*[
 _type == "stack" &&
   name in ["React", "Next.js", "Typescript", "Framer", "Sass", "Sanity CMS"]
] | order(type asc){name, logo, type}`);
