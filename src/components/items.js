import React, { Component } from 'react';
import Header from './header';
import AddItem from '../components/modals/addItem';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import UpdateItem from './modals/updateItem';
import { confirmAlert } from 'react-confirm-alert'; 
import DataTable, { destroyDataTable} from './searchItems';



class Items extends Component {
    constructor(props){
        super(props);
        // initialize state
        this.state = {
            items: [],
            listId: '',
            search: '',
            shoppinglist:'',
            list_id:''
        }
        this.getItems = this.getItems.bind(this)
    }
    // search items
   onUpdateSearch = (event) => {
        this.setState({search: event.target.value})
   }
   // confirm delete 
    onConfirmDelete = (itemId, name) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete ' +name,
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            onConfirm: () => this.onItemDelete(itemId)
        })
    };
    // allow item deletion 
    onItemDelete = (itemId) => {
        axios.delete(`/Shoppinglist/${this.props.match.params.id}/Items/${itemId}`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(response => {
            toast.success(response.data.message)
            // reload items state after delete
            this.reload()
        })
        .catch(error => {
        })
    }
    // add back to shoppinglist button
    onBackToDashboard = () => {
        this.props.history.push('/dashboard');
    }
    // get all the items
    getItems (id) {
        axios.get(`/Shoppinglist/${id}/Items`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response.data)
            // set the state to all items
            this.setState({items: response.data.shoppinglist_items});

        })
        .catch(error => {
            if(error.response){
                if (error.response.data.error === "Your token is invalid, please log in") {
                    window.localStorage.removeItem('token')
                    this.props.history.push('/dashboard');
                }
                else{
                    toast.error(error.response.data.error)
                    console.log(error.response)
                }
                
            }
            else{
                this.props.history.push('/');

            }
            

        })
    }
    // load item
    getShoppinglist = (id) => {
        axios.get('/Shoppinglist/'+ id , { 
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response.data.Shoppinglist.id)
            this.setState(
                { 
                    shoppinglist: response.data.Shoppinglist.name,
                    list_id: response.data.Shoppinglist.id
                }
            )
        })
        .catch(error => {
            console.log(error.response)
        })
    }
    // load items
    componentDidMount(){
        if (!window.localStorage.getItem('token')) {
            this.props.history.push('/')
        }
        else{
            this.getItems(this.props.match.params.id);
            this.getShoppinglist(this.props.match.params.id);
            
        }
    }
    componentWillUpdate() {
        destroyDataTable("#shoppinglist_items_table");
    }
    componentDidUpdate() {
        DataTable("#shoppinglist_items_table");
    }
    reload = () =>{
        // e.preventDefault();
        this.getItems(this.props.match.params.id);
    }
    render(){ 
       
        return(
            <div>
                <Header />
                <AddItem listId={this.state.list_id} itemReload={this.reload} />
                <ToastContainer hideProgressBar={true} />
                <div className="page-header">
                    <h4>
                        Shoppinglist Name: {this.state.shoppinglist}
                        <button className="pull-right btn btn-success fa fa-long-arrow-left" onClick={this.onBackToDashboard}>Back To ShoppingList 
                        </button>
                      
                        <button className="pull-right btn btn-primary fa fa-plus" data-toggle="modal"
                            data-placement="top" title="add shopping list"
                            data-target={"#add_item"  + this.state.list_id}> add item </button>
                    </h4>
                </div>
                <div className="row">
                    <table className='table table-hover table-stripped table-bordered' id="shoppinglist_items_table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>unit</th>
                                <th >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <UpdateItem itemReload={this.reload} item={item} />
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.unit}</td>
                                            <td >
                                                <i className="fa fa-edit" data-target={"#update_item" + item.id } data-toggle="modal" /> | 
                                                <i className="fa fa-trash text-danger" onClick={() => { this.onConfirmDelete(item.id, item.name)}} />
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