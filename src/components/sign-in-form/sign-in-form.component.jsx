import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
const defaultFormFields = {
  email: '',
  password: ''
}




const  SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  const resetFormFeilds = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const {user} = await signInAuthUserWithEmailAndPassword(email, password)
      
      resetFormFeilds();

    } catch(error) {
      if(error.code === 'auth/invalid-credential') {
        alert("Incorrect password and username");
      }
      console.log(error);
      
      
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-up-conatiner">
      <h2>Already have Account</h2>

      <span>Sign up witn your email and password</span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput label='Email' type="email" onChange={handleChange} name="email" value={email} required/>
        <FormInput label='Password' type="password" onChange={handleChange} name="password" value={password} required/>
        <div className="buttons-container">
        <Button  type="submit" >Sign In</Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.google}
            type='button' onClick={signInWithGoogle} >Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm;