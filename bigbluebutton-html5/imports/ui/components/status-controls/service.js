import Users from '/imports/api/users';
import Auth from '/imports/ui/services/auth';
import Meetings from '/imports/api/meetings';
import logger from '/imports/startup/client/logger';
import { EMOJI_STATUSES } from '/imports/utils/statuses';
import { makeCall } from '/imports/ui/services/api';

const init = (messages, intl) => {
  
};

const currentUser = () => {
  return Users.findOne({ userId: Auth.userID }, { fields: { approved: 1, emoji: 1 } });
};

const setEmojiStatus = (userId, emoji) => {
  const statusAvailable = (Object.keys(EMOJI_STATUSES).includes(emoji));

  return statusAvailable
    ? makeCall('setEmojiStatus', Auth.userID, emoji)
    : makeCall('setEmojiStatus', userId, 'none');
};

export default {
  init,
  setEmojiStatus,
  currentUser
};
