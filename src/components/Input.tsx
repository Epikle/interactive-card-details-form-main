import React, { Fragment, useEffect, useId, useState } from 'react';

import styles from './Input.module.scss';

type Props = {
  label?: string;
  type: string;
  placeholder: string;
  value: { text: string; isValid: boolean };
  maxLength: number;
  minLength: number;
  formValid: boolean;
  maxValue?: number;
  validate?: string;
  errorText?: string;
  expand?: boolean;
  onInput: ({ text, isValid }: { text: string; isValid: boolean }) => void;
};

const Input: React.FC<Props> = ({
  label,
  type,
  placeholder,
  maxLength,
  minLength,
  maxValue,
  validate,
  errorText,
  value,
  formValid,
  expand,
  onInput,
}) => {
  const id = useId();
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setInputValue(value.text);
  }, []);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue =
      validate === 'NUMBER'
        ? event.currentTarget.value.trim()
        : event.currentTarget.value;

    if (
      (validate === 'NUMBER' && isNaN(+targetValue)) ||
      (validate === 'NUMBER' && maxValue && +targetValue > maxValue)
    ) {
      return;
    }

    setInputValue(targetValue);
    onInput({ ...value, text: targetValue });
    setIsError(false);
  };

  const blurHandler = () => {
    setIsTouched(true);
    if (
      (validate === 'NUMBER' && isNaN(+inputValue)) ||
      inputValue.trim().length < minLength
    ) {
      setIsError(true);
      onInput({ ...value, isValid: false });
      return;
    }
    onInput({ ...value, isValid: true });
  };

  return (
    <Fragment>
      {expand && label && <label htmlFor={id}>{label}</label>}
      <div className={styles.container}>
        {!expand && label && <label htmlFor={id}>{label}</label>}
        <input
          className={(isTouched && isError) || !formValid ? styles.error : ''}
          type={type}
          id={id}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={inputChangeHandler}
          onBlur={blurHandler}
          value={inputValue}
        />
        {((isTouched && isError) || !formValid) && (
          <span className={styles['error-text']}>{errorText}</span>
        )}
      </div>
    </Fragment>
  );
};

export default Input;
