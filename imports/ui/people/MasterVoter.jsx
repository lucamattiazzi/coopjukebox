import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import ReactDOM from 'react-dom'

import Waiter from '../common/Waiter.jsx'
import PageNotFound from '../common/PageNotFound.jsx'
import Voter from './Voter.jsx'
import CountDown from './CountDown.jsx'

import { Polls } from '../../api/polls.js'

export default class MasterVoter extends Component {

  render(){
    if(!this.props.subscription){
      return(
        <Waiter />
      )
    }else if(!this.props.poll){
      return(
        <PageNotFound />
      )
    }else{
      return(
        <div className="voter--voter_container">
          <CountDown endingTime={this.props.poll.closesAt} />
          <Voter poll={this.props.poll} />
        </div>
      )
    }
  }

}

export default createContainer((props) => {
  const pollSubscription = Meteor.subscribe('polls.fromChosenName', props.chosenName)
  return {
    poll: Polls.findOne(),
    subscription: pollSubscription.ready()
  }
}, MasterVoter)


