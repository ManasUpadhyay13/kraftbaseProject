import UserAuthForm from '../components/UserAuthForm'

const SignUp = () => {
 
  return (
    <UserAuthForm
    heading="KraftFlow - WorkFlow Made Easy"
      subHeading='Make your KraftFlow account'
      type="signup"
      message="Already have an account. Login ?"
      messageUrl="/login"
      buttonText="SignUp"
    />
  )
}

export default SignUp
