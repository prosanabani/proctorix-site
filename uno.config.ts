import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  transformerVariantGroup,
} from 'unocss';

// import presetTheme from 'unocss-preset-theme';

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }),
    presetUno(), // by default follow existinse of `.dark` class, to follow system only set ({ dark: 'media' })
    // presetTheme({
    //   theme: {
    //     dark: {
    //       // put your theme here
    //     },
    //   },
    // }),
    presetTypography(),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'Lato',
    //   },
    //   provider: 'bunny',
    // }),
  ],
  safelist: ['dark'], // Ensure the dark mode class is always available
  transformers: [transformerVariantGroup()],
  shortcuts: [],
  theme: {
    // fontFamily: {
    //   sans: ['Lato', 'sans-serif'],
    //   serif: ['Lato', 'serif'],
    // },
  },
});
