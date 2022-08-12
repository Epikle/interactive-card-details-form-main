import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.attribution}>
      Challenge by{' '}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="https://github.com/Epikle">Epikle</a>.
    </footer>
  );
};

export default Footer;
