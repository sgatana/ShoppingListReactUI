import React, { Component } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';


export default class UpdateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            isModalOpen: false,
            items: []
        }
        // bind the method to super
    }


    onUpdateShoppingList = (id) => {
        let listData = new FormData();
        listData.set('name', this.state.name);
        listData.set('description', this.state.description);

        axios.put(`/Shoppinglist/${id}`, listData, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response.data.message)
                document.getElementById('closeButton' +id ).click();
                toast.success(response.data.message)
                
            })
            .catch(error => {
                console.log(error.response)
                toast.error(error.response.data.error);
            })
    }
    onShoppingListInputs = (e) => {
        const listName = e.target.name;
        const listValue = e.target.value;
        let listDetails = {}
        listDetails[listName] = listValue;
        this.setState(listDetails)
    }

    render() {
        return (
            <div className="modal fade" id={"update_list"+this.props.list.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" id={"closeButton" + this.props.list.id} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="add_list">Update Shopping list { this.props.list.name }
                            </h4>
                        </div>
                        <form method="post" >
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Name:</label>
                                    <input type="text" name='name' required onChange={this.onShoppingListInputs} className="form-control" placeholder={this.props.list.name} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Description:</label>
                                    <textarea type="text" name='description' required onChange={this.onShoppingListInputs} className="form-control" placeholder={this.props.list.description}></textarea>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="reset" className="btn btn-warning">Cancel</button>
                                <button type="button" id="#submit" onClick={() => { this.onUpdateShoppingList(this.props.list.id)}}  className="btn btn-primary">Update Shoppinglist</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}