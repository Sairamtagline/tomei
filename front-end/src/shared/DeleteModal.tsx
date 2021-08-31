import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

const DeleteModal = (props: any) => {
    return (
        <div>
            <Modal isOpen={props?.isOpen}  >
                <ModalBody>
                    Are you sure want to delete?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.handleDelete} >Yes</Button>
                    <Button color="secondary" onClick={props.cancelClick}>No</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default DeleteModal
