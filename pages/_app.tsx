import { PageContainer } from '@/components/PageContainer'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import createEmotionCache from '../theme/createEmotionCache'
import theme from '../theme/theme'

const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Beyond Ripped</title>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <link rel='icon' type='image/x-icon' href='/favicon.ico'></link>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <PageContainer>
              <Component {...pageProps} />
            </PageContainer>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}
