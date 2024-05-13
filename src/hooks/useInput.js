import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { value, onChange, reset };
};

export default useInput;
