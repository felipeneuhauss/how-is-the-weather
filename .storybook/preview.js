import * as NextImage from "next/image";
import { toTheme } from '@theme-ui/typography';
import grandViewTheme from 'typography-theme-grand-view';
import {colors} from "../shared/consts";
import {ThemeProvider} from "theme-ui";
const theme = toTheme(grandViewTheme);

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={{ ...theme, colors }}>
      <Story />
    </ThemeProvider>
  ),
];
