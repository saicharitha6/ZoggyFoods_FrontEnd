import { useState, ChangeEvent } from "react";

type ValidationFunction = (value: string) => boolean;

interface UseInputHookProps {
  validateValue: ValidationFunction;
}

interface UseInputHookResult {
  value: string;
  isValid: boolean;
  isTouched: boolean;
  hasError: boolean;
  valueChangeHandler: (text: string) => void;
  validateValueHandler: () => void;
  focusHandler: () => void;
  isFocused: boolean;
  reset: () => void;
}

const useInput = ({ validateValue }: UseInputHookProps): UseInputHookResult => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const valueIsValid: boolean = validateValue(enteredValue);

  const hasError: boolean = !valueIsValid && isTouched;

  const valueChangeHandler = (text) => {
    setEnteredValue(text);
    setIsTouched(true);
  };

  const validateValueHandler = () => {
    setIsTouched(true);
    setIsFocused(false);
  };

  const focusHandler = () => {
    setIsFocused(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    isTouched: isTouched,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    validateValueHandler: validateValueHandler,
    focusHandler: focusHandler,
    isFocused: isFocused,
    reset: reset,
  };
};

export default useInput;
