import Users from '/imports/api/users';
import Auth from '/imports/ui/services/auth';
import Meetings from '/imports/api/meetings';
import logger from '/imports/startup/client/logger';

const init = (messages, intl) => {
  
};

const currentUser = () => {
  return Users.findOne({ userId: Auth.userID }, { fields: { approved: 1, emoji: 1 } });
};



export default {
  init,
  currentUser
};
