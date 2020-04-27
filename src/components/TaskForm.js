import React from "react";

class TaskForm extends React.Component {
    onCloseForm = () => {
        this.props.onCloseForm();
    };

    render() {
        return (
            <div className="w-100">
                <div className="header">
                    <h3>Add new work</h3>
                    <span
                        className="flaticon-cancel"
                        onClick={this.onCloseForm}
                    ></span>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="Input">Example label</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Input"
                            placeholder="Example input"
                        />
                    </div>
                    <label htmlFor="formGroupExampleInput">Example label</label>
                    <select className="form-control">
                        <option>Default select</option>
                    </select>
                    <div className="btn-save">
                        <button type="button" className="btn btn-info">
                            <span className="flaticon-add-1 flaticon" />
                            <span>Save</span>
                        </button>
                        <button type="button" className="btn btn-danger">
                            <span className="flaticon-cancel flaticon" />
                            <span>Remove</span>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default TaskForm;
