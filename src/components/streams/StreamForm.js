import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component {

    renderError = ({error, touched}) => {
        if (touched && error) {
            return (
            <div className="ui error">
                <div className="header">{error}</div>
            </div>
        )}
        
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    renderForm = () => {
        return (
                <form  onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name ="title" component={this.renderInput} label="Enter a Title"/>
                    <Field name ="description" component={this.renderInput} label="Enter a Description"/>
                    <button className="ui button primary">Submit</button>
                </form >
        )
    }

    render() {
        return (
            <div className="ui container">{this.renderForm()}</div>
        )
    }
    
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title){
        errors.title = "Please enter a title"
    }
    if (!formValues.description) {
        errors.description = "Please enter description"
    }

    return errors;
}
 
export default reduxForm({
    form : 'StreamForm',
    validate
})(StreamForm)

