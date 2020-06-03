import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import Button from '/imports/ui/components/button/component';
import getFromUserSettings from '/imports/ui/services/users-settings';
import withShortcutHelper from '/imports/ui/components/shortcut-help/service';
import { styles } from './styles';



const propTypes = {
  handleRaiseHandShortcut: PropTypes.func.isRequired,
  handleClearStatusShortcut: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  isRaised: PropTypes.bool.isRequired,
};

class StatusShortcut extends PureComponent {
  componentDidMount() {
   
  }

  render() {
    const {
      handleRaiseHandShortcut,
      handleClearStatusShortcut,
      disable,
      isRaised,
    } = this.props;

    return (
      <span className={styles.container}>
        <Button
          className={cx(styles.button, styles.btn)}
          onClick={isRaised ? handleClearStatusShortcut : handleRaiseHandShortcut}
          disabled={disable}
          hideLabel
          aria-label={isRaised ? 'is Raised'
            : 'not Raised'}
          label={isRaised ? 'is Raised'
            : 'not Raised'}
          color={isRaised ? 'primary' : 'default'}
          ghost={!isRaised}
          icon={raiseHand}
          size="lg"
          circle
        />
      </span>);
  }
}

StatusShortcut.propTypes = propTypes;

export default withShortcutHelper(injectIntl(StatusShortcut), ['shortcutRaiseHand', 'shortcutClearStatus']);
