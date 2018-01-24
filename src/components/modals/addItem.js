import React, { Component } from 'react';
import axios from 'axios';


class AddItem extends Component {
    constructor(props) {
        super(props);
        // initialize state
        this.state = {
            shoppingList:[],
            name: '',
            price: '',
            quantity: '',
            unit: ''
        }
        
    }
    // handle adding item functionality
    onAddItem = (list_id) => {
        let itemDetails = new FormData();
        itemDetails.set("name", this.state.name);
        itemDetails.set("price", this.state.price);
        itemDetails.set("quantity", this.state.quantity);
        itemDetails.set("unit", this.state.unit);
        this.setState({shoppingList:list_id});
        
        axios.post(`/Shoppinglist/${list_id}/Items`, itemDetails,
    {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem("token")
        }
    })
    .then(response => {
        window.location.reload();
    })
    .catch(error => {
    })
    }

    // set the state to the value being entered

    onInputChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;
        const itemData = {};
        itemData[itemName] = itemValue;
        this.setState(itemData);
    }
    render() {
        return (
            <div className="modal fade" id={"add_item" + this.props.listId} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="add_list">Add Item</h4>
                        </div>
                        <form method="post" >
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Name:</label>
                                    <input type="text" name='name' required onChange={this.onInputChange} className="form-control" placeholder="Enter shopping item name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Price:</label>
                                    <input type="text" name='price' required onChange={this.onInputChange} className="form-control" placeholder="Enter price" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Quantity:</label>
                                    <input type="text" name='quantity' required onChange={this.onInputChange} className="form-control" placeholder="Enter quantity" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Unit of Measure:</label>
                                    <input type="text" name='unit' required onChange={this.onInputChange} className="form-control" placeholder="Enter unit of measure e.g kgs" />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="reset" className="btn btn-warning">Cancel</button>
                                <button type="button" onClick={() =>{this.onAddItem(this.props.listId)}} id="#submit" className="btn btn-primary">Add Item</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
export default AddItem