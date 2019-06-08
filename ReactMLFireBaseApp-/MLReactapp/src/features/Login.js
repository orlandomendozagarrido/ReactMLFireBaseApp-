
import React, { Component } from 'react';
import { loginWithGoogle } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';
import { Spinner } from 'react-bootstrap';
import CarouselPage from './Album';
import GlitchEffect from 'react-glitch-effect';



//firebase authkey for authentication
const firebaseAuthKey = 'firebaseAuthInProgress';
const appTokenKey = 'appToken';

export default class Login extends Component {

    constructor(props) {
      super(props);
      //in constructor hide splashscreen initially
      this.state = { splashScreen: false };
      //bind handdleGoogleLogin to use it in the component so i dont need to bind it within the component
      this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }
     //import login with google helper function
    handleGoogleLogin(){
      loginWithGoogle()
      //i placed no success result as it will go to the home page on sucess , so im just catching the error
      .catch(err => {
      localStorage.removeItem(firebaseAuthKey)
      });
       //set the splashscreen until its overridden by the real firebaseAuthKey
      localStorage.setItem(firebaseAuthKey, '1');
    }
       //lifecycle to get the token key
    componentWillMount() {
       // componentWillMount lifecylce method to listen to when my component is mounted , as i need to know when a user is logged in
         //check if we are logged in, if we are go to home route
        //using localstorage to check if the login is loaded in which case show the splashscreen, otherwise show the login component
      if(localStorage.getItem(appTokenKey)) {
        this.props.history.push('/app/home');
        return;

      }

      firebaseAuth().onAuthStateChanged(user => {
        if(user) {
               localStorage.removeItem(firebaseAuthKey);
               localStorage.setItem(appTokenKey, user.uid);
               this.props.history.push('/app/home')

        }

      })

    }

       render() {

            if(localStorage.getItem(firebaseAuthKey) === '1')
                   return <Splashscreen />;
            return <LoginPage handleGoogleLogin={this.handleGoogleLogin} />;

       }
}

//url from firebase storage
const loginButtonUrl = 'https://firebasestorage.googleapis.com/v0/b/mlproject-a59a6.appspot.com/o/google-icon-white.png?alt=media&token=1c6fe65d-8436-4cd3-ad7e-3f33c8794dfa';

const styles = {
        backgroundImage: `url(${loginButtonUrl})`

}
//using a functional component for the LoginPage and we are also passing in an argument to this component which is the handleGoogleLogin method for use when we click the login button so it has access to that method
const LoginPage = ({ handleGoogleLogin }) => (

                      

        <div className="login-container">
                <GlitchEffect>          
                <p>Kindred StreamVision</p>
                </GlitchEffect>
               <CarouselPage CarouselPage={CarouselPage} />
                 
               <div onClick={handleGoogleLogin} className="login-button">
                          
                        <div style={styles} className='google-logo'>
                                      
                                <span className="button-text">Sign In With Google</span>
                                       
                       </div>
                </div>
         </div>


)
 

const Splashscreen = () => (<div><Spinner animation="border" variant="warning" /><h2>PLease Wait Loading...</h2></div>)
