import styles from '@/styles/Home.module.css'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Section({ data, isActive, onClick }) {
  return (
    <div className={isActive ? [styles.sectionActive, styles.section].join(" ") : styles.section} onClick={onClick}>
      <h2>{data.title}</h2>

      {isActive === true &&
        <ReactMarkdown className={styles.sectionContent} remarkPlugins={[remarkGfm]}>
          {data.content}
        </ReactMarkdown>
      }

      {isActive === false &&
        <>
          <ReactMarkdown className={styles.sectionTeaser} remarkPlugins={[remarkGfm]}>
            {data.teaser}
          </ReactMarkdown>
          <div className={styles.sectionReadmore}>
            [Read more...]
          </div>
        </>
      }
    </div>
  )
}