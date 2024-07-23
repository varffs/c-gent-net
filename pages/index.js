import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import { useState } from 'react';

import * as fs from 'node:fs/promises';
import path from 'path'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const inter = Inter({ subsets: ['latin'] })

import Section from '../components/Section'
import WorksList from "../components/WorksList";
import EventsList from "../components/EventsList";

function Home({ sections, header, contact, metadata, worksList, eventsList }) {
  const [activeIndex, setActiveIndex] = useState(false);

  function handleActiveTrigger(index) {
    setActiveIndex(index);

    const selector = `.${styles.section}:nth-child(${index + 1})`;

    window.setTimeout(() => {
      const scrollPosition =
        window.pageYOffset +
        document.querySelector(selector).getBoundingClientRect().top -
        parseFloat(getComputedStyle(document.documentElement).fontSize);

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }, 250);
  }

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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{header}</ReactMarkdown>
        </header>
        <section className={styles.content}>
          {sections.map((section, index) => (
            <Section
              data={section}
              isActive={activeIndex === index ? true : false}
              key={index}
              onClick={() => {
                handleActiveTrigger(index);
              }}
            />
          ))}
        </section>
        <section className={styles.contact}>
          <h2>Events and keeping in touch</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{contact}</ReactMarkdown>
          <iframe
            src="https://cgent.substack.com/embed"
            width="100%"
            height="320"
            style={{ border: "1px", solid: "#EEE", background: "white" }}
            frameborder="0"
          ></iframe>
          <EventsList eventsList={eventsList} />
        </section>
        <WorksList worksList={worksList} />
      </main>
    </>
  );
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

  const worksListFileContents = await fs.readFile(
    path.join(process.cwd(), "content/works-list.json"),
    "utf8"
  );
  const worksList = JSON.parse(worksListFileContents);  

  const eventsListFileContents = await fs.readFile(
    path.join(process.cwd(), "content/events-list.json"),
    "utf8"
  );
  const eventsList = JSON.parse(eventsListFileContents);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      sections: await Promise.all(sections),
      header: headerFileContents,
      contact: contactFileContents,
      metadata,
      worksList,
      eventsList,
    },
  };
}

export default Home