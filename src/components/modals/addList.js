import React, { Component } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';


export default class AddList extends Component {
    constructor(props){
        super(props);
        // initialize state
        this.state = {
            name:'',
            description:'',
            isModalOpen: false
        }
        // bind the method to super
        this.onAddShoppingList = this.onAddShoppingList.bind(this);
    }
    
    // handle add shoppinglist functionality
    onAddShoppingList = (e)=> {
        e.preventDefault();
        let listData = new FormData();
        listData.set('name', this.state.name);
        listData.set('description', this.state.description);
        axios.post('/Shoppinglist', listData, {
            headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization':localStorage.getItem("token")
            }
        })
        .then(response => {
           
            window.location.reload()
            
        })
        .catch(error => {
            console.log(error.response)
            toast.error(error.response.data.error);
        })
    }
    // set state to value being entered
    onShoppingListInputs =(e) =>{
        const listName = e.target.name;
        const listValue = e.target.value;
        let listDetails = {}
        listDetails[listName] = listValue;
        this.setState(listDetails)
    }

    render() {
        return (
            <div className="modal fade" id="add_list" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="add_list">Add Shopping list
                            </h4>
                        </div>
                        <form method="post" onSubmit={this.onAddShoppingList}>
                        <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Name:</label>
                                    <input type="text" name='name' required onChange={this.onShoppingListInputs} className="form-control" placeholder="Enter shopping list name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Description:</label>
                                    <textarea type="text" name='description' required onChange={this.onShoppingListInputs} className="form-control" placeholder="Enter the description"></textarea>
                                </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="reset" className="btn btn-warning">Cancel</button>
                            <button type="submit" id="#submit" data-target="" className="btn btn-primary">Add Shoppinglist</button>
                        </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        );
    }
}