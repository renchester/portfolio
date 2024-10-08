import { UserIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const timezones = Intl.supportedValuesOf('timeZone');

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  // icon: UserIcon,
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO Data',
      description: 'Fill this out for SEO purposes',
    },
    {
      name: 'contact',
      title: 'Contact Details',
    },
  ],
  fields: [
    defineField({
      name: 'firstName',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
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
      fieldset: 'contact',
    }),
    defineField({
      name: 'github',
      type: 'url',
      title: 'Your Github URL',
      fieldset: 'contact',
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Your email',
      fieldset: 'contact',
    }),
    defineField({
      name: 'customLink',
      type: 'object',
      title: 'Custom Link',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Label',
        },
        {
          name: 'value',
          type: 'url',
          title: 'Value',
        },
      ],
    }),
    defineField({
      name: 'seoImage',
      type: 'image',
      title: 'SEO Image',
      description: 'Image for SEO purposes',
      fieldset: 'seo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'seoDescription',
      type: 'string',
      title: 'Portfolio Description',
      description: 'A short description for your portfolio',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoAlternateNames',
      type: 'array',
      title: 'Alternate Names',
      of: [{ type: 'string' }],
      description: 'What other names could this portfolio have?',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoUrl',
      type: 'url',
      description: 'URL of your portfolio',
      title: 'Site URL',
      fieldset: 'seo',
    }),
    defineField({
      name: 'logo',
      type: 'image',
      description: 'Best with 1:1 aspect ratio',
      fieldset: 'seo',
      validation: (rule) =>
        rule.required().error('You must provide a logo for your site'),
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      media: 'seoImage',
    },
  },
});
