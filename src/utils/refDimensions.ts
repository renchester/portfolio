// Sanity asset refs encode intrinsic size, e.g. "image-abc123-1216x735-png".
// Width/height attributes let the browser reserve space before the image loads.
export default function refDimensions(
  image?: { asset?: { _ref: string } | null } | null,
) {
  const match = image?.asset?._ref.match(/-(\d+)x(\d+)-/);
  if (!match) return undefined;
  return { width: Number(match[1]), height: Number(match[2]) };
}
