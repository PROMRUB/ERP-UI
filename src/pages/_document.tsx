import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html translate="no">
      <Head>
        <title>FF-Tax</title>
        <link rel="icon" href="/logo.png" />
        <meta property="og:title" content="FF-Tax" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="article" />
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}