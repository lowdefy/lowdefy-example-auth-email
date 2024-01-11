# Lowdefy Email Auth Example

This example app uses the Auth.js email provider and a custom MongoDB adapter as authentication system. It has support for invite-only users - the user is only allowed to log in if an invite is created for them.

This example is configured to use Sendgrid as email provider, but any SMTP mail service can be used, it should be configured as specified here: https://authjs.dev/guides/providers/email

It is recommended to authenticate the domain with your email provider to ensure that emails get delivered successfully. You can view the Sendgrid guides on this here: https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication

## Running this example

- Create a MongoDB cluster and get a URI connection string:
  - Create a free MongoDB database cluster hosted by [MongoDB Atlas](https://www.mongodb.com/try).
  - In the main cluster view, click "connect", then "Connect you application". This will give a MongoDB URI connection string. Use the credentials you just created.
  - You can read more about the [Lowdefy MongoDB connector](https://docs.lowdefy.com/MongoDB).
- Set up your SMTP mail service
- Clone this repository.
- Create a `.env` file in your project folder and set the following environment variables:

  ```.env
  LOWDEFY_SECRET_MONGODB_URI = <MongoDB URI>
  LOWDEFY_SECRET_SENDGRID_API_KEY = <Sendgrid API Key>
  LOWDEFY_SECRET_AUTH_FROM_EMAIL_ADDRESS = auth@example.com # Address to send emails from

  NEXTAUTH_SECRET = <Random auth signing secret>
  NEXTAUTH_URL = http://localhost:3000
  ```

- In the command console, navigate to your project folder and run the Lowdefy CLI: `pnpx lowdefy@4 dev`.
- Once an email is sent and a profile is created, you will notice that you now have access to the "Protected Page"

## More Lowdefy resources

- Getting started with Lowdefy - https://docs.lowdefy.com/tutorial-start
- Lowdefy docs - https://docs.lowdefy.com
- Lowdefy website - https://lowdefy.com
- Community forum - https://github.com/lowdefy/lowdefy/discussions
- Bug reports and feature requests - https://github.com/lowdefy/lowdefy/issues

## Licence

[MIT](https://github.com/lowdefy/lowdefy-example-auth-email?tab=MIT-1-ov-file)
