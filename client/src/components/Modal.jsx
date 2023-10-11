function Modal({ message, onClose }) {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <p>{message}</p>
        <button className="button-secondary thin-padding" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
}

export default Modal;
