import { useState } from "react";

export function useFiles({ initialState = [] } = {}) {
  const [state, setstate] = useState(initialState);
  function withBlobs(files) {
    const blobs = [...files]
      .map((file) => {
        if (file.type.includes("image")) {
          file.preview = URL.createObjectURL(file);
          return file;
        }
        console.log("not image");
        return null;
      })
      .filter((elem) => elem !== null);

    setstate(blobs);
  }
  return [state, withBlobs];
}
