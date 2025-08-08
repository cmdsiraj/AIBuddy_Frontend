export function useState(initialValue) {
  let value = initialValue;
  const listeners = [];

  const get = () => value;

  const set = (newValue) => {
    if (value === newValue) return;
    value = newValue;
    listeners.forEach((cbFn) => cbFn(value));
  };

  function subscribe(cbFn) {
    listeners.push(cbFn);
  }

  return [get, set, subscribe];
}

export function bindElement(inputElement, stateGetter, stateSetter, subscribe) {
  inputElement.value = stateGetter();

  inputElement.addEventListener("input", (e) => {
    stateSetter(e.target.value);
  });

  subscribe((newValue) => {
    if (inputElement.value !== newValue) {
      inputElement.value = newValue;
    }
  });
}
