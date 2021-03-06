
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SelectedItems from '../../components/SelectedItems/SelectedItems';

class ClosetModal extends React.Component {

  render() {
      return (
        <Modal 
          size="lg" 
          centered
          isOpen={this.props.modal} 
          toggle={this.props.modalToggle} >
          {/* returnFocusAfterClose={false}> */}
          <ModalHeader> New Outfit </ModalHeader>
          <ModalBody>
                <SelectedItems     
                  isModal= "true"
                  itemsSelected={this.props.itemsSelected}
                  itemsSelectedClicked={this.props.itemsSelectedClicked}
                />
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.props.outfitSaveClicked}>Save Outfit</Button>{' '}
              <Button color="secondary" onClick={this.props.modalToggle}>Cancel</Button>
          </ModalFooter>
      </Modal>
    );
  }
}

export default ClosetModal;