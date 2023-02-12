import styles from '@/styles/Home.module.css'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Section({ data, isActive, onClick }) {
  return (
    <>
      <div className={styles.section} onClick={onClick}>
        <h2>{data.title}</h2>

        {isActive === true &&
          <ReactMarkdown className={styles.sectionContent} children={data.content} remarkPlugins={[remarkGfm]} />
        }

        {isActive === false &&
          <>
            <ReactMarkdown className={styles.sectionTeaser} children={data.teaser} remarkPlugins={[remarkGfm]} />
            <div className={styles.sectionReadmore}>
              [Read more...]
            </div>
          </>
        }
      </div>
    </>
  )
}