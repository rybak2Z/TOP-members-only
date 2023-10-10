/** Hook that returns a function that can be passed to a form element
 * to serve as a submit handler.
 * @param {function} responseHandler - Gets called with the fetch's awaited response object.
 * @param {function} [errorHandler] - Gets called in the catch block with the error object.
 * @returns {function} submitHandler - Function to be passed to a form's onSubmit attribute. Takes the event object as an argument.
 * */
export default function useForm(responseHandler, errorHandler) {
  async function handleSubmit(event) {
    event.preventDefault(event);

    const url = event.target.action;
    const method = event.target.method;

    fetch(url, {
      method: method,
      body: new URLSearchParams(new FormData(event.target)),
    })
      .then((response) => {
        responseHandler(response);
      })
      .catch((error) => {
        if (errorHandler) {
          errorHandler(error);
        } else {
          console.log(error);
        }
      });
  }

  return handleSubmit;
}
