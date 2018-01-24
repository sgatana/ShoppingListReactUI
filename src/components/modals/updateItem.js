import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


class UpdateItem extends Component {
    constructor(props) {
        super(props);
        // initialize state
        this.state = {
            name: '',
            price: '',
            quantity: '',
            unit: ''
        }

    }
    // implement update item functionality
    onUpdateItem = (list_id, item_id) => {
        let itemDetails = new FormData();
        itemDetails.set("name", this.state.name);
        itemDetails.set("price", this.state.price);
        itemDetails.set("quantity", this.state.quantity);
        itemDetails.set("unit", this.state.unit);
        // this.setState({ shoppingList: list_id });

        axios.put(`/Shoppinglist/${list_id}/Items/${item_id}`, itemDetails,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log(response.data);
                document.getElementById('updateButton' + item_id).click();
                toast.success(response.data.message)

            })
            .catch(error => {
                console.log(error.response);
            })
    }
    // set the state to value being entered

    onInputChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;
        const itemData = {};
        itemData[itemName] = itemValue;
        this.setState(itemData);
    }
    render() {
        return (
            <div className="modal fade" id={"update_item" + this.props.item.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" id={"updateButton" + this.props.item.id} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="add_list">Update Item {this.props.item.name}</h4>
                        </div>
                        <form method="post" >
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Name:</label>
                                    <input type="text" name='name' required onChange={this.onInputChange} className="form-control" placeholder={this.props.item.name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Price:</label>
                                    <input type="text" name='price' required onChange={this.onInputChange} className="form-control" placeholder={this.props.item.price} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Quantity:</label>
                                    <input type="text" name='quantity' required onChange={this.onInputChange} className="form-control" placeholder={this.props.item.quantity} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Unit of Measure:</label>
                                    <input type="text" name='unit' required onChange={this.onInputChange} className="form-control" placeholder={this.props.item.unit} />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="reset" className="btn btn-warning">Cancel</button>
                                <button type="button" onClick={() => { this.onUpdateItem(this.props.item.shoppinglist_id, this.props.item.id) }} id="#submit" className="btn btn-primary">Update Item</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
export default UpdateItem