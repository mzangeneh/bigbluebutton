import Presentations from '/imports/api/presentations';
import Users from '/imports/api/users';
import Auth from '/imports/ui/services/auth';
import Settings from '/imports/ui/services/settings';
import { notify } from '/imports/ui/services/notification';

const getUserRoles = () => {
  const user = Users.findOne({
    userId: Auth.userID,
  });

  return user.role;
};

const getPresentations = () => Presentations
  .find({
    'conversion.error': false,
  })
  .fetch()
  .map((presentation) => {
    const {
      conversion,
      current,
      downloadable,
      id,
      name,
    } = presentation;

    const uploadTimestamp = id.split('-').pop();

    return {
      id,
      filename: name,
      isCurrent: current || false,
      upload: { done: true, error: false },
      isDownloadable: downloadable,
      conversion: conversion || { done: true, error: false },
      uploadTimestamp,
    };
  });

const updateSettings = (obj, msg) => {
  Object.keys(obj).forEach(k => (Settings[k] = obj[k]));
  Settings.save();

  if (msg) {
    // prevents React state update on unmounted component
    setTimeout(() => {
      notify(
        msg,
        'info',
        'settings',
      );
    }, 0);
  }
};

const getAvailableLocales = () => fetch('/html5client/locales').then(locales => locales.json());

export {
  getPresentations,
  getUserRoles,
  updateSettings,
  getAvailableLocales,
};
