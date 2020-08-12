export function makeClasses(...args) {
  return args.filter(Boolean).join(" ");
}

export function formEventTOJSON(e = HTMLFormElement) {
  e.preventDefault();
  const formData = new FormData(e.target);
  let obj = {};
  formData.forEach((e, i) => (obj[i] = e));
  return obj;
}

export async function delay(seconds = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}
