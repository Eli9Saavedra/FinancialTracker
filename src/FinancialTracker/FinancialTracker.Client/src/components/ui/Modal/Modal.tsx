
interface ModalProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

function Modal({ isOpen, title, children, onClose }: ModalProps) {
    if (!isOpen) return null;
  return (
      <div>
          <div>
              <h2>{title}</h2>
              <button onClick={onClose}>X</button>
              {children}
          </div>
      </div>
  );
}

export default Modal;