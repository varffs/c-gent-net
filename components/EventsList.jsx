import styles from "@/styles/EventsList.module.css";

export default function EventsList({ eventsList }) {
  return (
    <section className={styles.eventsList}>
      {eventsList.length > 0 && (
        <>
          <div className={styles.eventsListTitle}>Upcoming events include</div>
          <div className={styles.eventsListContent}>
            <ul>
              {eventsList.map((item, index) => {
                return (
                  <li key={index} className={styles.eventsListItem}>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
