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
        }
        // bind the method to super
        this.onAddShoppingList = this.onAddShoppingList.bind(this);
    }
    
    // handle add shoppinglist functionality
    onAddShoppingList = (e)=> {
        const { name, description}=this.state;

        e.preventDefault();
        let listData = new FormData();
        listData.set('name', name);
        listData.set('description',description);
        axios.post('/Shoppinglist', listData, {
            headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization':localStorage.getItem("token")
            }
        })
        .then(response => {
           document.getElementById('close_list').click();
            // window.location.reload()
            this.props.listReload();
            toast.success(response.data.message)
            this.setState({ name: '', description: '',})
            
        })
        .catch(error => {
            console.log(error.response)
            toast.error(error.response.data.error);
        })
    }
    // set state to value being entered
    onShoppingListInputs =(e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <div className="modal fade" id="add_list" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" id="close_list" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="add_list">Add Shoppinglist</h4>
                        </div>
                        <form method="post" onSubmit={this.onAddShoppingList}>
                        <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Name:</label>
                                    <input type="text" id="listName" name='name' value={this.state.name} required onChange={this.onShoppingListInputs} className="form-control" placeholder="Enter shopping list name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Description:</label>
                                    <textarea type="text" id="desc" name='description' value={this.state.description} required onChange={this.onShoppingListInputs} className="form-control" placeholder="Enter the description"></textarea>
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