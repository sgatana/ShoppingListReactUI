import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


class Items extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        }
        console.log("Constructor ",props)
        this.getItems = this.getItems.bind(this);
    }
    getItems = (id) => {
        axios.get(`/Shoppinglist/${id}/Items`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response.data)
            this.setState({items: response.data.shoppinglist_items})
        })
        .catch(error => {
            console.log(error.response)
            toast.error(error.response.data.error)

        })
    }
    componentDidMount(){
        this.getItems(this.props.match.params.id);
    }
    render(){ 
        return(
            <div>
                <Header />
                <ToastContainer hideProgressBar={true} />
                <div className="page-header">
                    <h3>
                        ShoppingList name 
                        <Link to='/dashboard' className="pull-right fa fa-long-arrow-left">Back To ShoppingList 
                        {/* <button className="btn btn-lg btn-success"><i className="fa fa-plus" />Add Item</button> */}
                        </Link>
                    </h3>
                </div>
                <div className="row">
                    <table className='table table-hover table-stripped table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>unit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.unit}</td>
                                            <td>
                                                <i className="fa fa-edit " /> |  <i className="fa fa-trash text-danger" />
                                            </td>
                                        </tr>
                                    )
                                })
                                /* <tr>
                                <td>Bread</td>
                                <td>50</td>
                                <td>2</td>
                                <td>gr</td>
                                <td>
                                    <i className="fa fa-edit " /> |  <i className="fa fa-trash text-danger" />
                                </td>
                                
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Items