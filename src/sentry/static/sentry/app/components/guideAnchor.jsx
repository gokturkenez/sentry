import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import Reflux from 'reflux';
import GuideStore from '../stores/guideStore';

const GuideAnchor = React.createClass({
  propTypes: {
    target: PropTypes.string.isRequired,
  },

  mixins: [
    Reflux.listenTo(GuideStore, 'onGuideChange'),
  ],

  getInitialState() {
    return {active: false};
  },

  onGuideChange(guideState) {
    if (guideState.step >= 0 && guideState.guide.steps[guideState.step].target == this.props.target) {
        this.setState({active: true});
    } else {
        this.setState({active: false});
    }
  },

  handlePingClick(e) {
  },

  handleClick(e) {
    GuideStore.completeStep();
  },

  render() {
    return (
      <div className={classNames("guide-anchor", this.props.type)} onClick={this.handleClick}>
          {this.props.children}
          <span className={classNames(this.props.target, 'guide-anchor-ping', {'active': this.state.active})} onClick={this.handlePingClick} />
      </div>
    );
  },


});

export default GuideAnchor;