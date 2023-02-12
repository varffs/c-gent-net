import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import * as fs from 'node:fs/promises';
import path from 'path'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const inter = Inter({ subsets: ['latin'] })

function Home({ sections, header, contact, metadata }) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={[inter.className, styles.main].join(" ")}>
        <header className={styles.header}>
          <ReactMarkdown children={header} remarkPlugins={[remarkGfm]} />
        </header>
        <section className={styles.content}>
          {sections.map((section, index) => (
            <div key={index}>
              <h2>{section.title}</h2>
              <ReactMarkdown className={styles.sectionTeaser} children={section.teaser} remarkPlugins={[remarkGfm]} />
              <ReactMarkdown className={styles.sectionContent} children={section.content} remarkPlugins={[remarkGfm]} />
            </div>
          ))}
        </section>
        <section className={styles.contact}>
          <ReactMarkdown children={contact} remarkPlugins={[remarkGfm]} />
        </section>
      </main>
    </>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const sectionsDirectory = path.join(process.cwd(), 'content/sections')
  const sectionsDirectories = await fs.readdir(sectionsDirectory, {withFileTypes: true})

  const sections = sectionsDirectories.map(async (section) => {
    const title = section.name.substring(2)

    const copyFilePath = path.join(sectionsDirectory, section.name, 'copy.md')
    const copyFileContents = await fs.readFile(copyFilePath, 'utf8')

    const teaserFilePath = path.join(sectionsDirectory, section.name, 'teaser.md')
    const teaserFileContents = await fs.readFile(teaserFilePath, 'utf8')

    return {
      title,
      content: copyFileContents,
      teaser: teaserFileContents
    }
  })

  const headerFileContents = await fs.readFile(path.join(process.cwd(), 'content/header.md'), 'utf8')
  const contactFileContents = await fs.readFile(path.join(process.cwd(), 'content/contact.md'), 'utf8')
  const metadataFileContents = await fs.readFile(path.join(process.cwd(), 'content/metadata.json'), 'utf8')
  const metadata = JSON.parse(metadataFileContents)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      sections: await Promise.all(sections),
      header: headerFileContents,
      contact: contactFileContents,
      metadata
    },
  }
}

export default Home