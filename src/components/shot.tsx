// Theme-aware screenshot: shows the dark capture in dark mode and the light one in light mode.
// `base` is the relative path to the site root, so the same images work from nested pages.
export function Shot({
  name,
  alt,
  width,
  height,
  base = "",
  className = "",
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  base?: string;
  className?: string;
}) {
  const frame = `h-auto w-full rounded-ui border border-border ${className}`;
  return (
    <>
      <img src={`${base}img/shiftview/${name}-dark.webp`} alt={alt} width={width} height={height} className={`hidden dark:block ${frame}`} />
      <img src={`${base}img/shiftview/${name}-light.webp`} alt={alt} width={width} height={height} className={`block dark:hidden ${frame}`} />
    </>
  );
}
