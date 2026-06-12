import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { dataset, projectId } from '../env';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

// auto('format') lets the Sanity CDN serve WebP/AVIF to browsers that
// support it. Callers should chain .width(n) to avoid shipping originals.
export const urlFor = (source?: SanityImageSource | null) => {
  return builder.image(source!).auto('format');
};
