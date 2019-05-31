import { firebaseAuth, googleProvider } from '../config/constants';

// methods for loging in and logging out with google 
export function loginWithGoogle() {
  return firebaseAuth().signInWithRedirect(googleProvider);

}

export function logout() {
  return firebaseAuth().signOut();   

}