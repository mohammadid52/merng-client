import { useState } from "react";

const useForm = (cb, initialValues) => {
  const [errors, setErrors] = useState("");
  const [values, setValues] = useState(initialValues);
  const onChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    cb();
  };

  return {
    values,
    errors,
    setErrors,
    setValues,
    onChange,
    onSubmit,
  };
};

export default useForm;
