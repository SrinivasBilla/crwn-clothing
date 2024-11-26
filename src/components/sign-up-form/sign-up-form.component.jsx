import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}




const  SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formFields;
  console.log(formFields);


  const resetFormFeilds = () => {
    setFormFields(defaultFormFields)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      console.log("Password do not match");
      return;
    }
    try{
      const {user} = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFeilds();

    } catch(error) {
      if(error.code === 'Error (auth/email-already-in-use)') {
        alert('Can not create user already used')
      }else {
        console.log('User creation encounted an error', error);
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-up-conatiner">
      <h2>Don't have Account</h2>

      <span>Sign up witn your email and password</span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput label='displayName' type="text" onChange={handleChange} name="displayName" value={displayName} required/>
        <FormInput label='Email' type="email" onChange={handleChange} name="email" value={email} required/>
        <FormInput label='Password' type="password" onChange={handleChange} name="password" value={password} required/>
        <FormInput label='Confirm Password' type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required/>
        <Button  type="submit" >Signup</Button>
      </form>
    </div>
  )
}

export default SignUpForm;