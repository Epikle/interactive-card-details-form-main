import React, { Fragment, useState } from 'react';

import Footer from './components/Footer';
import Input from './components/Input';
import Card from './components/Card';

import thanks from './assets/icon-complete.svg';
import './App.scss';

const App: React.FC = () => {
  const [cardName, setCardName] = useState({ text: '', isValid: false });
  const [cardNumber, setCardNumber] = useState({ text: '', isValid: false });
  const [expMonth, setExpMonth] = useState({ text: '', isValid: false });
  const [expYear, setExpYear] = useState({ text: '', isValid: false });
  const [cvc, setCvc] = useState({ text: '', isValid: false });
  const [formValid, setFormValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !cardName.isValid ||
      !cardNumber.isValid ||
      !expMonth.isValid ||
      !expYear.isValid ||
      !cvc.isValid
    ) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    setSubmitted(true);
  };

  const continueBtnHandler = () => {
    setSubmitted(false);
  };

  return (
    <Fragment>
      <main>
        <div className="cards">
          <Card
            cardName={cardName.text || 'Jane Appleseed'}
            cardNumber={cardNumber.text || '0000 0000 0000 0000'}
            expMonth={expMonth.text || '00'}
            expYear={expYear.text || '00'}
            front
          />
          <Card cvc={cvc.text || '000'} />
        </div>
        {submitted && (
          <div className="submitted">
            <img src={thanks} alt="" />
            <span className="thanks">Thank You!</span>
            <span>We've added your card details</span>
            <button onClick={continueBtnHandler} className="btn">
              Continue
            </button>
          </div>
        )}
        {!submitted && (
          <form onSubmit={formSubmitHandler}>
            <Input
              label="Cardholder Name"
              type="text"
              placeholder={'e.g. Jane Appleseed'}
              errorText="Can't be blank"
              maxLength={30}
              minLength={1}
              value={cardName}
              formValid={formValid}
              onInput={setCardName}
            />
            <Input
              label="Card Number"
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
              errorText="Minimum length 16 numbers"
              maxLength={16}
              minLength={16}
              value={cardNumber}
              formValid={formValid}
              validate="NUMBER"
              onInput={setCardNumber}
            />
            <div className="exp-cvc">
              <div className="exp">
                <Input
                  label="Exp. Date (MM/YY)"
                  expand
                  type="text"
                  placeholder="MM"
                  errorText="Minimum length 2 numbers"
                  maxLength={2}
                  minLength={2}
                  value={expMonth}
                  formValid={formValid}
                  maxValue={12}
                  validate="NUMBER"
                  onInput={setExpMonth}
                />
                <Input
                  type="text"
                  placeholder="YY"
                  errorText="Minimum length 2 numbers"
                  maxLength={2}
                  minLength={2}
                  value={expYear}
                  formValid={formValid}
                  validate="NUMBER"
                  onInput={setExpYear}
                />
              </div>
              <Input
                label="CVC"
                type="text"
                placeholder="e.g. 123"
                errorText="Minimum length 3 numbers"
                maxLength={3}
                minLength={3}
                value={cvc}
                formValid={formValid}
                validate="NUMBER"
                onInput={setCvc}
              />
            </div>
            <button className="btn">Confirm</button>
          </form>
        )}
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
