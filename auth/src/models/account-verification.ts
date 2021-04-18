import mongoose from 'mongoose';

import User from './User';

export type AccountVerificationDocument = mongoose.Document & {
  userId: mongoose.Types.ObjectId;
  emailVerificationToken: string;
};

export type AccountVerificationModel = mongoose.Model<AccountVerificationDocument>;

const accountVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  emailVerificationToken: {
    type: String,
    required: true,
    validate: (value: string): boolean => {
      if (!value || value.length !== 64) {
        throw new Error('Invalid email verification token');
      }

      return true;
    }
  }
});

accountVerificationSchema.pre(
  'save',
  async function verifyUserExists(this: AccountVerificationDocument) {
    const user = await User.findById(this.userId);

    if (!user) {
      throw new Error('User could not be found');
    }
  }
);

const AccountVerification = mongoose.model<AccountVerificationDocument, AccountVerificationModel>(
  'AccountVerification',
  accountVerificationSchema
);

export default AccountVerification;
