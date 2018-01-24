import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import UpdateItem from './modals/updateItem';


class Items extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            listId: ''
        }
    }
    
    onItemDelete = (itemId) => {
        axios.delete(`/Shoppinglist/${this.props.match.params.id}/Items/${itemId}`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response.data.message)
            toast.success(response.data.message)
            this.setState({items: []})
            // this.getItems(this.props.match.params.id);
        })
        .catch(error => {
            console.log(error.response)
        })
    }
    onItemEdit = () => {

    }
    onBackToDashboard = () => {
        this.props.history.push('/dashboard');
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
            if (error.response.data.error === "your token is invalid, please log in ") {
                window.localStorage.clear('token');
                window.location.reload();
                this.props.history.push('/');
            }
            console.log(error.response)
            toast.error(error.response.data.error)

        })
    }
    componentWillMount(){
        if (!window.localStorage.getItem('token')) {
            this.props.history.push('/')
        }
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
                        <button className="pull-right btn btn-success fa fa-long-arrow-left" onClick={this.onBackToDashboard}>Back To ShoppingList 
                        </button>
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
                                            <UpdateItem item={item} />
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.unit}</td>
                                            <td>
                                                <i className="fa fa-edit" data-target={"#update_item" + item.id } data-toggle="modal" /> | 
                                                <i className="fa fa-trash text-danger" onClick={() => { this.onItemDelete(item.id)}} />
                                            </td>
                                        </tr>
                                    )
                                })
                               
                           }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Items