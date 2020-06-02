import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import Auth from '/imports/ui/services/auth';
import UserListService from '/imports/ui/components/user-list/service';
import { makeCall } from '/imports/ui/services/api';
import lockContextContainer from '/imports/ui/components/lock-viewers/context/container';
import logger from '/imports/startup/client/logger';
import Service from '../service';

const StatusShortcutContainer = props => <StatusShortcut {...props} />;

const handleRaiseHandShortcut = () => {
  setEmojiStatus(user.userId, 'raise')
  logger.info({
    logCode: 'status_user_hand_raised',
    extraInfo: { logType: 'user_action' },
  }, 'status_user_hand_raised');
};

const handleClearStatusShortcut = () => {
  setEmojiStatus(user.userId, 'none')
  logger.info({
    logCode: 'status_user_cleared',
    extraInfo: { logType: 'user_action' },
  }, 'status_user_cleared');
};

const {
  isVoiceUser,
  isConnected,
  isListenOnly,
  isEchoTest,
  isMuted,
  isConnecting,
  isHangingUp,
  isTalking,
  toggleMuteMicrophone,
  joinListenOnly,
} = Service;

export default lockContextContainer(withModalMounter(withTracker(({ mountModal, userLocks }) => ({
  isRaised: currentUserEmoji.status() !== 'none',
  disable: isConnecting() || isHangingUp() || !Meteor.status().connected,
  handleJoinAudio,
  handleLeaveAudio,
}))(StatusShortcutContainer)));
