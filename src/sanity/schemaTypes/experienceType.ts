import { defineArrayMember, defineField, defineType } from 'sanity';

export const experienceType = defineType({
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fieldsets: [
    {
      name: 'loc',
      title: 'Work Location',
    },
    {
      name: 'date',
      title: 'Employment Dates',
    },
  ],
  fields: [
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company Name*',
      validation: (rule) =>
        rule.required().error('This field must be provided'),
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Position/Role*',
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Job responsibilities/Description about this role (optional)',
      description:
        "If you opt to include a description for one experience, you should also provide descriptions for the other experiences you've listed.",
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
      name: 'startDate',
      type: 'date',
      fieldset: 'date',
      title: 'Start Date*',
      validation: (rule) =>
        rule.required().error('You must provide a start date for this role.'),
    }),
    defineField({
      name: 'isCurrent',
      title: 'Are you still currently working in this role?',
      fieldset: 'date',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) =>
        Rule.required().error('Please specify if the role is ongoing'),
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      fieldset: 'date',
      hidden: ({ document }) => !!document?.isCurrent,
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location*',
      description: 'Format: Los Angeles, California',
      validation: (rule) =>
        rule.required().error('This field must be provided'),
      fieldset: 'loc',
    }),
    defineField({
      name: 'locationType',
      type: 'string',
      title: 'Location Type*',
      fieldset: 'loc',
      initialValue: 'onSite',
      validation: (rule) =>
        rule.required().error('This field must be provided'),
      options: {
        list: [
          {
            title: 'On-site',
            value: 'onSite',
          },
          {
            title: 'Hybrid',
            value: 'hybrid',
          },
          {
            title: 'Remote',
            value: 'remote',
          },
        ],
      },
    }),
    defineField({
      name: 'employmentType',
      type: 'string',
      title: 'Employment Type*',
      initialValue: 'fullTime',
      validation: (rule) =>
        rule.required().error('This field must be provided'),
      options: {
        list: [
          {
            title: 'Full-time',
            value: 'fullTime',
          },
          {
            title: 'Part-time',
            value: 'partTime',
          },
          {
            title: 'Self-employed',
            value: 'selfEmployed',
          },
          {
            title: 'Freelance',
            value: 'freelance',
          },
          {
            title: 'Contract',
            value: 'contract',
          },
          {
            title: 'Internship',
            value: 'internship',
          },
          {
            title: 'Apprenticeship',
            value: 'apprenticeship',
          },
          {
            title: 'Seasonal',
            value: 'seasonal',
          },
        ],
      },
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Company Logo (optional)',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Company URL (optional)',
    }),
    defineField({
      name: 'stacks',
      type: 'array',
      title: 'Technologies used in this Role (optional)',
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
    }),
  ],
  validation: (rule) =>
    // Validates whether a provided start date is less than the endDate, if also provided
    rule.custom((fields) => {
      // Check if the start date has been provided
      if (!fields?.startDate)
        return {
          message: 'Start date must be provided',
          path: ['startDate'],
        };

      // If role is still current, endDate must be a falsy value
      // Skip further checks afterward
      if (fields.isCurrent && !fields.endDate) {
        return true;
      }

      // Check validity of start date (for TypeScript)
      if (typeof fields.startDate !== 'string')
        return {
          message: 'Start date must be a valid date string',
          path: ['startDate'],
        };

      // Check validity of end date (for TypeScript)
      if (typeof fields.endDate !== 'string')
        return {
          message: 'End date must be a valid date string',
          path: ['endDate'],
        };

      if (
        fields.endDate &&
        new Date(fields?.startDate) > new Date(fields?.endDate)
      )
        return {
          message: '',
          path: 'startDate',
        };

      return true;
    }),
  preview: {
    select: {
      title: 'company',
      subtitle: 'position',
    },
  },
});
