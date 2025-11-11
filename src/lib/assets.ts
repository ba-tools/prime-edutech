/**
 * Get the full URL for an asset, using CloudFront CDN if configured
 * @param path - The asset path (e.g., '/assets/logo.png')
 * @returns Full URL to the asset
 */
export function getAssetUrl(path: string): string {
  const cloudFrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

  // If CloudFront is configured and path is valid, use it
  if (cloudFrontUrl && path) {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${cloudFrontUrl}/${cleanPath}`;
  }

  // Fallback to local path
  return path;
}
