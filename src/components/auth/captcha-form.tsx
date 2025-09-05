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
