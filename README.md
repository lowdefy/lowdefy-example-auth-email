# Lowdefy Email Auth Example

This example app uses the Auth.js email provider and a custom MongoDB adapter as authentication system. It has support for invite-only users - the user is only allowed to log in if an invite is created for them.

This example is configured to use Sendgrid as email provider, but any SMTP mail service can be used, it should be configured as specified here: https://authjs.dev/guides/providers/email

It is recommended to authenticate the domain with your email provider to ensure that emails get delivered successfully. You can view the Sendgrid guides on this here: https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication

## Running this example

- Create a MongoDB cluster and get a URI connection string:
  - Create a free MongoDB database cluster hosted by [MongoDB Atlas](https://www.mongodb.com/try).
  - Create a new database called `example-email`.
  - Add new collections to this database called `log-usage`, `user-invites` and `user`.
  - In the Database access section, create a database user with read access to any database (You can also specify the database as `example-email`).
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

## More Lowdefy resources

- Getting started with Lowdefy - https://docs.lowdefy.com/tutorial-start
- Lowdefy docs - https://docs.lowdefy.com
- Lowdefy website - https://lowdefy.com
- Community forum - https://github.com/lowdefy/lowdefy/discussions
- Bug reports and feature requests - https://github.com/lowdefy/lowdefy/issues

## Licence

[MIT](https://github.com/lowdefy/lowdefy-example-auth-email?tab=MIT-1-ov-file)
