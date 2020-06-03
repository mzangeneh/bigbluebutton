import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import Auth from '/imports/ui/services/auth';
import UserListService from '/imports/ui/components/user-list/service';
import { makeCall } from '/imports/ui/services/api';
import lockContextContainer from '/imports/ui/components/lock-viewers/context/container';
import logger from '/imports/startup/client/logger';
import Users from '/imports/api/users';
import Service from './service';
import StatusShortcut from './component';

const StatusShortcutContainer = props => <StatusShortcut {...props} />;

const handleRaiseHandShortcut = () => {
  Service.setEmojiStatus(Auth.userID, 'raise')
  logger.info({
    logCode: 'status_user_hand_raised',
    extraInfo: { logType: 'user_action' },
  }, 'status_user_hand_raised');
};

const handleClearStatusShortcut = () => {
  logger.info({
    logCode: 'user_status',
    extraInfo: { logType: 'show' },
  }, Service.currentUser().userId);


  Service.setEmojiStatus(Auth.userID, 'none')
  logger.info({
    logCode: 'status_user_cleared',
    extraInfo: { logType: 'user_action' },
  }, 'status_user_cleared');
};

const {Service.currentUser} = Service;


export default lockContextContainer(withModalMounter(withTracker(({ mountModal, userLocks }) => ({
  isRaised: Service.currentUser().emojy !== 'none',
  disable: !Meteor.status().connected,
  handleRaiseHandShortcut,
  handleClearStatusShortcut,
  setEmojiStatus: Service.setEmojiStatus,
}))(StatusShortcutContainer)));
