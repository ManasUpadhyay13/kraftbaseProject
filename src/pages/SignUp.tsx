import UserAuthForm from '../components/UserAuthForm'

const SignUp = () => {

  return (
    <UserAuthForm
      heading="KraftFlow"
      welcomeMessage='Welcome KraftFlow, your all in one solution to project management! 😉'
      subHeading='Make your KraftFlow account to begin your joureny! 😎'
      type="signup"
      message="Already have an account?"
      redirectText='Login into you account'
      messageUrl="/login"
      buttonText="SignUp"
    />
  )
}

export default SignUp
