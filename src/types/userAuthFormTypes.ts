export type UserAuthFormProps = {
    heading: string;
    welcomeMessage?: string;
    subHeading?: string;
    type: 'login' | 'signup';
    message: string;
    messageUrl: string;
    redirectText: string,
    buttonText: string;
}