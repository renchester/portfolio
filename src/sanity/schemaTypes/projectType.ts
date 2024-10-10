import { ProjectsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  // icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Project Title',
      validation: (rule) =>
        rule.required().error('You must provide a title to this project'),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Project Type',
      description:
        'Indicate here the nature of this project (e.g. Full-stack E-commerce Web App)',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Project Description',
      validation: (rule) =>
        rule.custom((value, { document }) => {
          if (document?.isFeatured && !value) {
            return 'A description is required if the item is featured.';
          }

          return true; // No validation error
        }),
    }),
    defineField({
      name: 'disclaimer',
      type: 'text',
      title: 'Project Disclaimer',
      description:
        "Is there something else that you'd like your audience to know more about this project?",
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Is this a featured project?',
      description:
        'Featured projects will be shown in large view, complete with a desktop and mobile view',
    }),
    defineField({
      name: 'index',
      type: 'number',
      title: 'Project Index',
      description:
        'Indicate here the order in which you want this project to be shown',
      initialValue: 1,
      validation: (rule) =>
        rule.custom((value, { document }) => {
          if (document?.isFeatured && !value) {
            return 'An index is required if the item is featured.';
          }

          return true; // No validation error
        }),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      description:
        'Use the favicon for your site if there is no dedicated logo',
      validation: (rule) =>
        rule.custom((value, { document }) => {
          if (document?.isFeatured && !value) {
            return 'Logo is required if the item is featured.';
          }
          return true; // No validation error
        }),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Main Image',
      description:
        'Main image or screengrab to be used for your application. If this project is a featured project, use a screengrab with a laptop view.',
      validation: (rule) =>
        rule.required().error('You must provide an image for this project'),
    }),
    defineField({
      name: 'mobileImage',
      type: 'image',
      title: 'Mobile Image',
      description:
        'Mobile view of the project. Required for featured projects.',
      validation: (rule) =>
        rule.custom((value, { document }) => {
          if (document?.isFeatured && !value) {
            return 'A mobile image is required if the item is featured.';
          }
          return true; // No validation error
        }),
    }),
    defineField({
      name: 'liveLink',
      type: 'url',
      title: 'Link',
      description: 'URL for the live deployment of the app',
    }),
    defineField({
      name: 'repoLink',
      type: 'url',
      title: 'Github Link',
      description: 'URL for the Github repository of the app',
    }),
    defineField({
      name: 'stack',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'stack',
              options: {
                filter: '_id in path("drafts.**") == false', // Exclude drafts
              },
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('You must select at least one stack'),
    }),
    defineField({
      name: 'background',
      type: 'string',
      title: 'Color Background',
      description: 'Use hex color codes',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;

          const regex = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
          return regex.test(value)
            ? true
            : 'Please enter a valid hex color value (e.g., #FFF or #FFFFFF)';
        }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'logo',
    },
  },
});
