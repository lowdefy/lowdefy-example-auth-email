import { v4 as uuid } from 'uuid';
import { MongoClient } from 'mongodb';

function from({ _id, ...data }) {
  return { id: _id, ...data };
}

function to({ id, ...data }) {
  return { _id: id, ...data };
}

function id(data) {
  if (!data || !data.id) return uuid();
  return data.id;
}

function MongoDBAdapter({ properties }) {
  const { databaseUri, mongoDBClientOptions } = properties;
  const db = (async () => {
    const _db = (await new MongoClient(databaseUri, mongoDBClientOptions).connect()).db();
    return {
      accounts: _db.collection('user_accounts'),
      invites: _db.collection('user_invites'),
      sessions: _db.collection('user_sessions'),
      users: _db.collection('users'),
      verificationTokens: _db.collection('user_verification_tokens'),
    };
  })();

  return {
    async createUser(data) {
      const user = { ...data, _id: id(data) };
      user.created = { timestamp: new Date(), user: { id: user._id } };
      user.updated = { timestamp: new Date(), user: { id: user._id } };

      const invite = await (
        await db
      ).invites.findOne({
        inviteEmail: user.email.toLowerCase(),
        open: true,
        expires: { $gt: new Date() },
      });
      if (properties.invite?.required === true && !invite) {
        throw new Error('Access denied.');
      }
      if (invite) {
        user.inviteId = invite._id;
        user.app_attributes = invite.app_attributes;
        user.roles = invite.roles;
        user.profile = { ...(user.image ? { picture: user.image } : {}), ...invite.profile };
        await (
          await db
        ).invites.findOneAndUpdate(
          { _id: invite._id },
          {
            $set: {
              open: false,
              accepted: true,
              updated: {
                timestamp: new Date(),
                user: {
                  id: user._id,
                },
              },
            },
          }
        );
      } else {
        user.app_attributes = {};
        user.roles = [];
        user.profile = { ...(user.image ? { picture: user.image } : {}) };
      }
      await (await db).users.insertOne(user);
      return from(user);
    },

    async getUser(_id) {
      const user = await (await db).users.findOne({ _id });
      if (!user) return null;
      return from(user);
    },

    async getUserByEmail(email) {
      const user = await (await db).users.findOne({ email });
      if (!user) return null;
      return from(user);
    },

    async getUserByAccount(provider_providerAccountId) {
      const account = await (await db).accounts.findOne(provider_providerAccountId);
      if (!account) return null;

      const user = await (await db).users.findOne({ _id: account.userId });
      if (!user) return null;

      return from(user);
    },

    async updateUser(data) {
      const { _id, inviteId, roles, attributes, ...user } = to(data);
      user.updated = { timestamp: new Date(), user: { id: _id } };
      const result = await (
        await db
      ).users.findOneAndUpdate({ _id }, { $set: user }, { returnDocument: 'after' });
      return from(result.value);
    },

    async deleteUser(userId) {
      const m = await db;
      await Promise.all([
        m.accounts.deleteMany({ userId }),
        m.sessions.deleteMany({ userId }),
        m.users.deleteOne({ _id: userId }),
      ]);
    },

    linkAccount: async (account) => {
      await (await db).accounts.insertOne(to(account));
      return from(account);
    },

    async unlinkAccount(provider_providerAccountId) {
      const { value: account } = await (
        await db
      ).accounts.findOneAndDelete(provider_providerAccountId);
      return from(account);
    },

    async getSessionAndUser(sessionToken) {
      const session = await (await db).sessions.findOne({ sessionToken });
      if (!session) return null;

      const user = await (await db).users.findOne({ _id: session.userId });
      if (!user) return null;
      return {
        user: from(user),
        session: from(session),
      };
    },

    async createSession(session) {
      await (await db).sessions.insertOne(to(session));
      return session;
    },

    async updateSession(data) {
      const { _id, ...session } = to(data);

      const result = await (
        await db
      ).sessions.findOneAndUpdate(
        { sessionToken: session.sessionToken },
        { $set: session },
        { returnDocument: 'after' }
      );
      return from(result.value);
    },

    async deleteSession(sessionToken) {
      const { value: session } = await (
        await db
      ).sessions.findOneAndDelete({
        sessionToken,
      });
      return from(session);
    },

    async createVerificationToken(data) {
      await (await db).verificationTokens.insertOne(to(data));
      return data;
    },

    async useVerificationToken(identifier_token) {
      const { value: verificationToken } = await (
        await db
      ).verificationTokens.findOneAndDelete(identifier_token);

      if (!verificationToken) return null;
      delete verificationToken._id;
      return verificationToken;
    },
  };
}

export default MongoDBAdapter;
