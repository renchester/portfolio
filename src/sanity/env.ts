export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-08';

const datasetValue =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET;
export const dataset = assertValue(
  datasetValue,
  'Missing environment variable: DATASET',
);

const projectIdValue =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID;
export const projectId = assertValue(
  projectIdValue,
  'Missing environment variable: SANITY PROJECT ID',
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
