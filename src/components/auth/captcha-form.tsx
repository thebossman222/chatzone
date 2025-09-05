/**
 *
 * @returns A React component representing a CAPTCHA form
 * This form includes a Google reCAPTCHA widget and a submit button
 * The site key for the reCAPTCHA is retrieved from environment variables
 * The form is designed to be submitted via POST method
 * This component can be used to enhance security by verifying that the user is human
 */
export function CaptchaForm() {
  return (
    <form action="?" method="POST">
      <div
        className="g-recaptcha"
        data-sitekey={process.env.CAPTCHA_SITE_KEY}
      ></div>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
