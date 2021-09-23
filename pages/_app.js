//import '../styles/globals.css'
import { useContext, useEffect } from 'react';
import Head from 'next/head';
//import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import { ThemeContext, ThemeProvider } from '../src/theme';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// interface MyAppProps extends AppProps {
//  emotionCache?: EmotionCache;
// }

function ThemeConsumer({ Component, pageProps }) {
 const { theme } = useContext(ThemeContext);
 //console.log(theme);
 return (
  <MuiThemeProvider theme={theme}>
   {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
   <CssBaseline />
   <Component {...pageProps} />
  </MuiThemeProvider>
 );
}

export default function MyApp(props) {
 const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

 return (
  <CacheProvider value={emotionCache}>
   <Head>
    <title>My page</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
   </Head>
   <ThemeProvider>
    <ThemeConsumer {...props} />
   </ThemeProvider>
  </CacheProvider>
 );
}
