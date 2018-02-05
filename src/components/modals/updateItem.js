import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


class UpdateItem extends Component {
    constructor(props) {
        super(props);
        // initialize state
        this.state = {
            name: this.props.item.name,
            price: this.props.item.price,
            quantity: this.props.item.quantity,
            unit: this.props.item.unit
        }
        this.onInputChange = this.onInputChange.bind(this)

    }
    // implement update item functionality
    onUpdateItem = (list_id, item_id) => {
        let itemDetails = new FormData();
        itemDetails.set("name", this.state.name);
        itemDetails.set("price", this.state.price);
        itemDetails.set("quantity", this.state.quantity);
        itemDetails.set("unit", this.state.unit);

        axios.put(`/Shoppinglist/${list_id}/Items/${item_id}`, itemDetails,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': localStorage.getItem("token")
                }
            })
            .then(response => {
                document.getElementById('updateButton' + item_id).click();
                // reload items after update 
                this.props.itemReload()
                toast.success(response.data.message)

            })
            .catch(error => {
                console.log(error.response);
                toast.error(error.response.data.error)
            })
    }
    // set the state to value being entered

    onInputChange (e) {
        this.setState({[e.target.name]: e.target.value});
       
    }
    render() {
        return (
            <div className="modal fade" id={"update_item" + this.props.item.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" id={"updateButton" + this.props.item.id} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title text-center">Update Item {this.props.item.name}</h4>
                        </div>
                        <form method="post">
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Name:</label>
                                    <input type="text" id="name" name='name' required onChange={this.onInputChange} className="form-control" value={this.state.name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Price:</label>
                                    <input type="text" id="price" name='price' required onChange={this.onInputChange} className="form-control" value={this.state.price} />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Quantity:</label>
                                    <input type="text" id="quantity" name='quantity' required onChange={this.onInputChange} className="form-control" value={this.state.quantity} />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Unit of Measure:</label>
                                    <input type="text" id="unit" name='unit' required onChange={this.onInputChange} className="form-control" value={this.state.unit} />
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