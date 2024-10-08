import { FolderIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const stackType = defineType({
  name: 'stack',
  title: 'Tech Stack',
  type: 'document',
  // icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) =>
        rule.required().error('You must provide a name for this stack'),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      description: 'Must be in SVG format',
      validation: (rule) =>
        rule.required().error('You must provide a logo for this stack'),
    }),
    defineField({
      name: 'type',
      type: 'string',
      initialValue: 'frontend',
      options: {
        list: [
          { value: 'devtools', title: 'Developer Tools' },
          { value: 'frontend', title: 'Front End' },
          { value: 'backend', title: 'Back End' },
          { value: 'others', title: 'Others' },
        ],
      },
      validation: (rule) =>
        rule.required().error('You must provide a type for this stack'),
    }),
  ],
});
