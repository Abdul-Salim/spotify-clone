const catchHandler = (error, setError, setFieldError) => {
  if (error.response && error.response.data && error.response.data.message) {
    setError('general_errors', {
      type: 'manual',
      message: error.response.data.message,
    });
  }
  if (error.response && error.response.data && error.response.data.errors) {
    Object.keys(error.response.data.errors).forEach((field) => {
      setError(setFieldError ? [field] : 'general_errors', {
        type: 'manual',
        message: error.response.data.errors[field][0],
      });
    });
  }
};
export default catchHandler;
