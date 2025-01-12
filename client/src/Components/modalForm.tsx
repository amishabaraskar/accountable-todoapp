import { Modal } from "react-bootstrap";
import Form from './addTodoForm';

function ModalForm({show,handleClose}:{show:boolean, handleClose:()=>void}) {
  
  return (
    <>
    <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton >
          {/* <Modal.Title className="mx-auto bg-center">Add todo </Modal.Title> */}
        </Modal.Header>
        <Modal.Body 
        >
          <Form closeModal={handleClose} />
          </Modal.Body>

      </Modal>
    </>
  );
}

export default ModalForm;