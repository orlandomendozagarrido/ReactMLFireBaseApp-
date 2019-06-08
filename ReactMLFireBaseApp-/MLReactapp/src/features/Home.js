import React, { Component } from 'react';
import { Image, Container, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import { ScaleLoader } from 'react-spinners';
import  Cam  from './Camera.js';
import GlitchEffect from 'react-glitch-effect';

const appTokenKey = "appToken";
export default class Home extends Component {

    constructor(props) {
        super(props);

        // check if we are on a mobile device
        this.isMobile = () => {
          var check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
        };

        this.state = {
          allPhotos: [],
          showModal: false,
          currentPhoto: '',
          isMobile: this.isMobile(),
          imageRef: ''
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.getInitial = this.getInitial.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    }

    handleClose() {
      this.setState({
        showModal: false,
        currentPhoto: ''
      });
    }

    async handleRemove(id) {
      console.log('photo id', id)
      await firebase.firestore().collection('photos').doc(id).delete();
      this.getInitial();
    }


    componentDidMount() {
        this.getInitial();
    }


    getInitial() {
        firebase.auth().onAuthStateChanged(user => {

            let userId = user.uid;
            let imageRef = `images/${userId}`;

            this.setState({ imageRef });

            if (user) {

                firebase.firestore().collection('photos').where('userId', '==', user.uid).onSnapshot(snapshot => {
                    let allPhotos = [];
                    snapshot.forEach(doc => {
                      var newItem = doc.data();
                      newItem.id = doc.id;
                      allPhotos.push(newItem);
                    });

                    console.log('allPhotos', allPhotos);

                    this.setState({ allPhotos });
                });

            }

        });

    }


    handleLogout() {
        logout()
        .then(() => {
            localStorage.removeItem(appTokenKey);
            this.props.history.push("/login");
            console.log("user signed out from firebase");
        });
    }

    async handleUploadSuccess (filename) {

        try {
            let { bucket, fullPath } = await firebase.storage().ref(this.state.imageRef).child(filename).getMetadata();
            console.log('bucket', bucket)
            console.log('fullPath', fullPath)
            let downloadURL = await firebase.storage().ref(this.state.imageRef).child(filename).getDownloadURL();
            console.log('downloadURL', downloadURL)

            let { uid, email, displayName } = await firebase.auth().currentUser;

            let newPhoto = {
                url: downloadURL,
                userName: displayName,
                userId: uid,
                email,
                bucket,
                fullPath
            }
            console.log('newPhoto', newPhoto);

            let photoAdded = await firebase.firestore().collection('photos').add(newPhoto);
            console.log('photoAdded', photoAdded);
        }

        catch(err) {
            console.error(err);
        }

    }



	render() {

        const allImages = this.state.allPhotos.map(photo => {

          if (photo.similarImages) {
            this.dopples = photo.similarImages.map(similarPhoto => {

              const styles = {
                backgroundImage: "url(" + similarPhoto.url + ")",
              }

              return (
                <div
                  onClick={() => this.setState({ showModal: true, currentPhoto: similarPhoto.url })}
                  style={styles}
                  className="main-photo card-1 card"
                  key={similarPhoto.url}
                  xs={4} >
                </div>

              );
            });
          } else {

            this.dopples =
              <div className="scrolling-wrapper">
                <div className="main-photo card-1 card loading-card" xs={4}>
                  <ScaleLoader
                    color={'#00C851'}
                    loading={true}
                  />
                </div>
                <div className="main-photo card-1 card loading-card" xs={4}>
                  <ScaleLoader
                    color={'#00C851'}
                    loading={true}
                  />
                </div>
                <div className="main-photo card-1 card loading-card" xs={4}>
                  <ScaleLoader
                    color={'#00C851'}
                    loading={true}
                  />
                </div>
                <div className="main-photo card-1 card loading-card" xs={4}>
                  <ScaleLoader
                    color={'#00C851'}
                    loading={true}
                  />
                </div>
              </div>
          }


          return (
            <div key={photo.id}>
                <div style={{minHeight: '215px'}}>
                    <i onClick={() => this.handleRemove(photo.id)} className="bottom-icon material-icons main-close">close</i>
                    <Image style={{ width: '100%' }} src={photo.url} responsive />
                </div>

                <div className="scrolling-wrapper">
                  {this.dopples}
                </div>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                  
                    <Modal.Header closeButton>
                      <Modal.Title>Cloud Vision Results-Facial Detection of Similar Images...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Image style={{ width: '100%' }} src={this.state.currentPhoto} responsive />

                    </Modal.Body>
                    <Modal.Footer>
                      <div onClick={this.handleClose}>Close</div>
                    </Modal.Footer>
                </Modal>


            </div>
          );
        })

		return (
			<div>
                 
                <h1>Photos Feed</h1>
                <GlitchEffect> 
                <h3> Upload a photo by clicking the middle button...</h3>
                </GlitchEffect>   
                {this.state.isMobile ? <h3>For selfies - rotate to landscape</h3>: ""}

				{allImages}

				<Container className="bottom-nav">
				  <Row className="show-grid">
				    <Col xs={4} className="col-bottom">
        
				        <Link to="/app/Album"><i className="bottom-icon material-icons">collections</i></Link>
				    </Col>
				    <Col xs={4} className="col-bottom">

                        <label>
                           <i className="bottom-icon material-icons">camera_alt</i>

                           <FileUploader
                             hidden
                             accept="image/*"
                             storageRef={firebase.storage().ref(this.state.imageRef)}
                             onUploadStart={this.handleUploadStart}
                             onUploadError={this.handleUploadError}
                             onUploadSuccess={this.handleUploadSuccess}
                             onProgress={this.handleProgress}
                           />
                         </label>


				    </Col>
				    <Col onClick={this.handleLogout} xs={4} className="col-bottom">
				      <i className="bottom-icon material-icons">assignment_return</i>
				    </Col>
				  </Row>
				</Container>

			</div>
		);
	}
}
