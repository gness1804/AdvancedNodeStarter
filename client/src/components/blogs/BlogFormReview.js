// BlogFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';
import FileUpload from './FileUpload';

class BlogFormReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  renderFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <div>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green btn-flat right white-text blog-save-button">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }

  onSubmit(event) {
    const { file } = this.state;

    event.preventDefault();

    const { submitBlog, history, formValues } = this.props;

    submitBlog(formValues, file, history);
  }

  onFileChange(file) {
    this.setState({
      file,
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h5 className="form-review-headline">Please confirm your entries</h5>
        {this.renderFields()}
       <FileUpload
        onFileChange={this.onFileChange.bind(this)}
       />
        {this.renderButtons()}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.blogForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(BlogFormReview));
