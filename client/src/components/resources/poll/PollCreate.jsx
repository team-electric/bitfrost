import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import { postPoll } from '../../../services/polls';

@withRouter
export default class PollCreate extends PureComponent {
  constructor(props) {
    super(props);
    this.candidates = React.createRef();
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  addChoice = () => {
    const input = document.createElement('input');
    input.setAttribute('name', 'choice');
    this.choices.current.appendChild(input);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { target } = event;

    const poll = [...target.querySelectorAll('input')]
      .reduce((acc, input) => {
        if(input.getAttribute('name') === 'title') acc.title = input.value;
        if(input.getAttribute('name') === 'description') acc.description = input.value;
        if(input.getAttribute('name') === 'choice') acc.choices.push({ description: input.value });

        return acc;
      }, { choices: [] });

    postPoll(poll)
      .then(() => this.props.history.push(ROUTES.POLLS.linkTo()));
  };

  render() {
    return (
      <>
        <h2>Create a Poll</h2>
        <form ref={this.form} onSubmit={this.handleSubmit}>
          <input name="title" />
          <input name="description" />
          <div ref={this.choices}>

          </div>
          <button type="button" onClick={this.addChoice}>Add Choice</button>
          <button>Submit</button>
        </form>
      </>
    );
  }
}
