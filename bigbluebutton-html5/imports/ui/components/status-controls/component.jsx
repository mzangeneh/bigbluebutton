import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import Button from '/imports/ui/components/button/component';
import getFromUserSettings from '/imports/ui/services/users-settings';
import withShortcutHelper from '/imports/ui/components/shortcut-help/service';
import { styles } from './styles';

const intlMessages = defineMessages({
  shortcutRaiseHand: {
    id: 'app.shortcut.raiseHand',
    description: 'Raise Hand Shortcut',
  },
  shortcutClearStatus: {
    id: 'app.shortcut.clearStatus',
    description: 'Clear User Status',
  },
});

const propTypes = {
  handleToggleStatus: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  talking: PropTypes.bool.isRequired,
};

class StatusShortcut extends PureComponent {
  componentDidMount() {
   
  }

  render() {
    const {
      handleRaiseHandShortcut,
      handleClearStatusShortcut,
      disable,
      intl,
      shortcuts,
    } = this.props;

    return (
      <span className={styles.container}>
        <Button
          className={cx(styles.button, styles.btn)}
          onClick={isRaised ? handleClearStatusShortcut : handleRaiseHandShortcut}
          disabled={disable}
          hideLabel
          aria-label={isRaised ? intl.formatMessage(intlMessages.clearStatus)
            : intl.formatMessage(intlMessages.raiseHand)}
          label={isRaised ? intl.formatMessage(intlMessages.clearStatus)
            : intl.formatMessage(intlMessages.raiseHand)}
          color={isRaised ? 'primary' : 'default'}
          ghost={!isRaised}
          icon={raiseHand}
          size="lg"
          circle
          accessKey={isRaised ? shortcuts.raisehandshortcut : shortcuts.clearstatusshortcut}
        />
      </span>);
  }
}

StatusShortcut.propTypes = propTypes;

export default withShortcutHelper(injectIntl(StatusShortcut), ['shortcutRaiseHand', 'shortcutClearStatus']);
