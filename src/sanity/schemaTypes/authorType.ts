import { UserIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const timezones = Intl.supportedValuesOf('timeZone');

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'job',
      type: 'string',
      title: 'Job Title',
    }),
    defineField({
      name: 'marquee',
      type: 'array',
      title: 'Marquee Text',
      description:
        'Aside from your name, this will show in the marquee of the hero section',
      of: [{ type: 'string' }],
      validation: (rule) =>
        rule.required().error('You must provide at least one item here'),
    }),
    defineField({
      name: 'bio',
      type: 'array',
      title: 'Bio/Description',
      description:
        "Tell a short story about yourself that you'd want others to know. Keep it within two paragraphs.        \n        NOTE: For links, do select the text before clicking on the add link button.",
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description:
                      'Read https://css-tricks.com/use-target_blank/',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'seoImage',
      type: 'image',
      title: 'SEO Image',
      description: 'Image for SEO purposes',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      description:
        'Image for your Hero Section. It should have a transparent background.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'memojiImage1',
      type: 'image',
      title: 'Memoji Image - Laptop',
      description: 'Simple Memoji with Laptop.',
    }),
    defineField({
      name: 'memojiImage2',
      type: 'image',
      title: 'Memoji Image - Waving',
      description: 'Simple Memoji with Waving Gesture.',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      description: 'Format: [location], [country]',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return 'This field is required';
          const regex = /^[a-zA-Z\s]+,\s[a-zA-Z\s]+$/;
          return regex.test(value)
            ? true
            : 'Location must be in the format: [location], [country] (e.g., New York, USA)';
        }),
    }),
    defineField({
      name: 'timezone',
      type: 'string',
      title: 'Timezone',
      description: 'Your timezone',
      initialValue: 'Asia/Manila',
      options: {
        list: timezones.map((zone) => ({
          title: zone,
          value: zone,
        })),
      },
    }),
    defineField({
      name: 'linkedin',
      type: 'url',
      title: 'Your Linkedin URL',
    }),
    defineField({
      name: 'github',
      type: 'url',
      title: 'Your Github URL',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
