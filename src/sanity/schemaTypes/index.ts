import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { postType } from './postType';
import { authorType } from './authorType';
import { projectType } from './projectType';
import { greetingType } from './greetingType';
import { stackType } from './stackType';
import { experienceType } from './experienceType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    projectType,
    greetingType,
    stackType,
    experienceType,
  ],
};
