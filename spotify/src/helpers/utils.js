const queryParams = (object) => new URLSearchParams(object).toString();

export const generateRandomString = () => Math.random().toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15);

// eslint-disable-next-line max-len
export const generateDropdownOptions = (data, valueParam, labelParam) => (data || []).map((item) => ({
  ...item,
  value: item[valueParam],
  label: item[labelParam],
}));

// eslint-disable-next-line max-len
export const generateDropdownOptionsFromHash = (data) => Object.keys(data || {}).map((key) => ({
  value: key,
  label: data[key],
}));

export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return (array || []).reduce((obj, item) => ({
    ...obj,
    [item[key]]: item,
  }), initialValue);
};

export function logHere() {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line prefer-rest-params, no-console
    console.log(...arguments);
  }
}

export function openInANewTab(url) {
  const win = window.open(url, '_blank');
  if (win != null) {
    win.focus();
  }
}

export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default queryParams;
