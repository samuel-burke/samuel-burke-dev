// Theme-aware screenshot: shows the dark capture in dark mode and the light one in light mode. Both are lazy, so the
// hidden one is never downloaded. Apps with a single look (`themed={false}`) ship one capture, `<name>.webp`.
// `base` is the relative path to the site root, so the same images work from nested pages.
export function Shot({
  name,
  alt,
  width,
  height,
  base = "",
  project = "shiftview",
  themed = true,
  className = "",
  bare = false,
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  base?: string;
  // Folder under public/img/.
  project?: string;
  themed?: boolean;
  className?: string;
  // Phone captures already carry their own device frame, so they skip the border.
  bare?: boolean;
}) {
  const frame = `h-auto w-full ${bare ? "" : "rounded-ui border border-border"} ${className}`;
  const src = (suffix: string) => `${base}img/${project}/${name}${suffix}.webp`;
  if (!themed) {
    return <img src={src("")} alt={alt} width={width} height={height} loading="lazy" decoding="async" className={frame} />;
  }
  return (
    <>
      <img
        src={src("-dark")}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`hidden dark:block ${frame}`}
      />
      <img
        src={src("-light")}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`block dark:hidden ${frame}`}
      />
    </>
  );
}
