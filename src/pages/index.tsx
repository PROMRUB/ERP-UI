import Head from 'next/head';
import {
  Home,
} from '@/section/home';

export default function Page() {
  return <>
    <Head>
      <title>FF Tax</title>
      <meta property="og:title" content="FF Tax" />
      <meta property="og:image" content="/logo.png" />
    </Head>

    <Home />
  </>
}