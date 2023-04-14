# Lowdefy Email Auth Example

This example app uses the Next-Auth email provider and a custom MongoDB adapter as authentication system. It has support for invite-only users - the user is only allowed to log in if an invite is created for them.

This example is configured to use Sendgrid as email provider, but any SMTP mail service can be used, it should be configured as specified here: https://next-auth.js.org/providers/email

To run the app the following environment variables are needed:

```.env
LOWDEFY_SECRET_MONGODB_URI = <MongoDB URI>
LOWDEFY_SECRET_SENDGRID_API_KEY = <Sendgrid API Key>
LOWDEFY_SECRET_AUTH_FROM_EMAIL_ADDRESS = auth@example.com # Address to send emails from

NEXTAUTH_SECRET = <Random auth signing secret>
NEXTAUTH_URL = http://localhost:3000
```
