import React, {Component} from 'react';

import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'

class Splash extends Component {

    constructor(props) {
        super(props)
        console.log("Splash constructed, props", this.props)
    }
    drawsignin(){
      // draw signin button if not logged in
      // this is handle by google code that replaces our div
      // with their own HTML/CSS.
      console.log("trying to draw login button.");
      window.gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.props.onLogin,
        'onfailure': (error) => console.log(error)
      })
    }
    componentWillMount(){
      if (this.props.show){
        this.drawsignin()
      }
    }
		componentDidUpdate(prevProps, prevState){
      console.log("splash component update", this.props, prevProps)
			if ((!prevProps.show) && (this.props.show)){
        this.drawsignin()
			}
		}

    render() {
          return (
              <Modal isOpen={this.props.show}>
                <ModalHeader>Please Signin</ModalHeader>
                <ModalBody center="true">
                  <div className="my-signin2-body">
                    <div id="my-signin2"/>
                  </div>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
          )
    }
}

export default Splash;
