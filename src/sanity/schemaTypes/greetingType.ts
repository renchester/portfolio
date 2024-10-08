import { SunIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const greetingType = defineType({
  name: 'greeting',
  title: 'Welcome Greetings',
  type: 'document',
  icon: SunIcon,
  fields: [
    defineField({
      name: 'content',
      type: 'string',
    }),
    defineField({
      name: 'language',
      type: 'string',
    }),
    defineField({
      name: 'is_main',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'language',
    },
  },
});
