import frontBg from '../assets/bg-card-front.png';
import backBg from '../assets/bg-card-back.png';

import styles from './Card.module.scss';

type Props =
  | {
      front: true;
      cardNumber: string;
      cardName: string;
      expMonth: string;
      expYear: string;
      cvc?: never;
    }
  | {
      cvc: string;
      front?: never;
      cardNumber?: never;
      cardName?: never;
      expMonth?: never;
      expYear?: never;
    };

const Card: React.FC<Props> = ({
  cvc,
  front,
  cardNumber,
  cardName,
  expMonth,
  expYear,
}) => {
  const trimmedNumber = cardNumber ? cardNumber.replace(/\s/g, '') : '';
  const spacedNumber =
    cardNumber &&
    trimmedNumber.slice(0, 4) +
      ' ' +
      trimmedNumber.slice(4, 8) +
      ' ' +
      trimmedNumber.slice(8, 12) +
      ' ' +
      trimmedNumber.slice(12, 16);

  if (front) {
    return (
      <div className={[styles.card, styles.front].join(' ')}>
        <img src={frontBg} alt="" />
        <div className={styles['card-info']}>
          <span>{spacedNumber}</span>
          <div className={styles['card-name-container']}>
            <span>{cardName}</span>{' '}
            <span>
              {expMonth}/{expYear}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={[styles.card, styles.back].join(' ')}>
      <img src={backBg} alt="" />
      <div className={styles['card-info']}>
        <span>{cvc}</span>
      </div>
    </div>
  );
};

export default Card;
