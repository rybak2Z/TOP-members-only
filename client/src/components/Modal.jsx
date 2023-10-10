function Modal({ message, onClose }) {
  return (
    <div class="modal-wrapper">
      <div class="modal">
        <p>{message}</p>
        <button class="button-secondary thin-padding" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
}

export default Modal;
