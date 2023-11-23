import styles from "@/styles/WorksList.module.css";

import { useState } from "react";

export default function WorksList({ worksList }) {
  const [isFull, setFullList] = useState(false);

  return (
    <section className={styles.worksList}>
      <div className={styles.worksListTitle}>
        <h2>Recent work</h2>
      </div>
      <div
        className={
          isFull
            ? styles.worksListContent
            : [styles.worksListContent, styles.worksListContentShort].join(" ")
        }
      >
        <ul>
          {worksList.map((item, index) => {
            return (
              <li key={index} className={styles.worksListItem}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        {worksList.length > 3 && isFull === false && (
          <div
            className={styles.worksListSeeMore}
            onClick={() => {
              setFullList(true);
            }}
          >
            [View more...]
          </div>
        )}
      </div>
    </section>
  );
}
