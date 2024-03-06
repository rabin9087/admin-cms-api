import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { closeModal } from "../../store/modal.slice";
import { useDispatch, useSelector } from "react-redux";
import { updateDeliveryStatus } from "../../helpers/axiosHelper/order/OrderAxios";
import { SetAOrder } from "../../pages/order/orderSlice";

function CustomModal() {
  const dispatch = useDispatch();
  const { show, heading, content, data, id } = useSelector(
    (store) => store.modal
  );
  const handleClose = async () => {
    const response = await updateDeliveryStatus(id, {
      items: data,
    });
    if (response.status === "success") {
      dispatch(SetAOrder(response.data));
    }
    dispatch(closeModal());
  };

  return (
    <>
      <Modal show={show} onHide={() => dispatch(closeModal())} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
