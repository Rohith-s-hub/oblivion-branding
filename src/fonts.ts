// Font asset imports — Vite resolves these as asset URLs, viteSingleFile inlines them

// @ts-ignore — woff2 assets resolved by Vite
import geistRegularUrl from '../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2?url';
// @ts-ignore
import geistMediumUrl from '../node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2?url';
// @ts-ignore
import geistSemiBoldUrl from '../node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.woff2?url';
// @ts-ignore
import geistMonoRegularUrl from '../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2?url';
// @ts-ignore
import geistMonoMediumUrl from '../node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.woff2?url';
// @ts-ignore
import geistMonoSemiBoldUrl from '../node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.woff2?url';

export function injectFonts() {
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Geist';
      src: url('${geistRegularUrl}') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Geist';
      src: url('${geistMediumUrl}') format('woff2');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Geist';
      src: url('${geistSemiBoldUrl}') format('woff2');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'GeistMono';
      src: url('${geistMonoRegularUrl}') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'GeistMono';
      src: url('${geistMonoMediumUrl}') format('woff2');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'GeistMono';
      src: url('${geistMonoSemiBoldUrl}') format('woff2');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }
  `;
  document.head.insertBefore(style, document.head.firstChild);
}
