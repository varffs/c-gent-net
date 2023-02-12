import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Craig Gent</title>
        <meta name="description" content="...set me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={[inter.className, styles.main].join(" ")}>
        <div className={styles.description}>
          <p>
            Hi, I’m <strong>Craig Gent</strong>. I’m a writer, editor and researcher based in Leeds, Yorkshire.
          </p>
        </div>
      </main>
    </>
  )
}