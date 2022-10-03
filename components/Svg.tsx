/* eslint-disable no-console */
import React, { FC, useCallback, useState } from 'react';
import { Box, BoxProps } from 'theme-ui';

type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'auto';

export type SVGProps = {
  color?: string;
  getter?: (path: string) => Promise<string | null>;
  isBackground?: boolean;
  path: string;
  size?: Size;
} & BoxProps;

export const sizeMap: { [key in Size]: number | string } = {
  auto: 'auto',
  large: 18,
  medium: 16,
  small: 14,
  xlarge: 24,
  xsmall: 12,
};

const headers = { 'Content-Type': 'image/svg+xml' };

const fetchSvg = (path: string): Promise<string | null> => fetch(
  `${path}`,
  { cache: 'force-cache', headers },
)
  .then((r) => r.text())
  .catch((e) => {
    console.warn(e);

    return null;
  });

const getSvgCache = async (path: string): Promise<string | null> => {
  if (typeof window === 'undefined') return null;
  if (typeof caches === 'undefined') return fetchSvg(path);

  const cache = await caches.open('svg-fetch');
  const hit = await cache.match(path);
  if (hit) return hit.text().catch(() => null);

  const svg = await fetchSvg(path);

  if (svg) cache.put(path, new Response(svg, { headers }));

  return svg;
};

// this is to avoid 2 requests for the same svg while they are not ready
const importCache = {} as Record<string, Promise<string | null>>;
const getterCache = {} as Record<string, string | null>;

// eslint-disable-next-line no-return-assign
const handleCache = async (
  path: string,
  getter: NonNullable<SVGProps['getter']>,
): Promise<string | null> => getterCache[path]
  || (getterCache[path] = await (importCache[path]
    || (importCache[path] = getter(path))));

const SVG: FC<SVGProps> = ({
  getter = getSvgCache,
  color,
  path,
  size = 'medium',
  ...props
}) => {
  const [__html, setHtml] = useState<string | null>(getterCache[path] || null);

  useCallback(handleCache, [])(path, getter).then(setHtml);

  const html = __html
    ? { dangerouslySetInnerHTML: { __html }, 'data-svg-loaded': true }
    : undefined;

  return (
    <Box
      as="span"
      {...html}
      data-svg={path}
      sx={{
        '& svg': {
          '&, *': {
            fill: color,
          },
          height: '100%',
          width: '100%',
        },
        display: 'inline-block',
        height: sizeMap[size],
        position: 'relative',
        width: sizeMap[size],
      }}
      {...(props as any)}
    />
  );
};

export default React.memo(SVG);
