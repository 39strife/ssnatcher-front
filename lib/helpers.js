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

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
