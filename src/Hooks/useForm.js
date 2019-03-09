import { useState } from 'react';

const useForm = () => {
  const [values, setValues] = useState({});

  const reset = () => {
    setValues({});
  };

  const handleChange = event => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return {
    handleChange,
    reset,
    values
  };
};

export default useForm;
