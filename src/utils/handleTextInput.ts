export class handleTextInput {
  static handleTextEmlty = (str: string) => {
    return str === '';
  };
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  static validatePassword(password: string): boolean {
    const minLength = /.{6,}/;
    const hasNumber = /[0-9]/;
    const hasLetter = /[a-zA-Z]/;
  
    return (
      minLength.test(password) &&
      hasNumber.test(password) &&
      hasLetter.test(password)
    );
  }
}
