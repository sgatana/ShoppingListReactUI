import React, { Component } from 'react';
import AddList from './modals/addList';
import UpdateList from './modals/updateList';
import axios from 'axios';
import AddItem from './modals/addItem';
import Header from './header';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        // initialize state
        this.state = {
            shoppingLists: [],
            success: false,
            totalItems: '',
            itemsPerPage: '',
            activePage: '',
            nextPage: '',
            previousPage: '',
            view_item: false,
            id: false,
            found: true,
            message:"",
            errmessage: "",
            limit:""
            
        }
      
    }
    // implement search
    onSearchInput = (e) => {
        e.preventDefault();
        if (this.state.found === true){
            this.setState({ q: e.target.value }, () => {
                let q = "?q=" + this.state.q;
                this.getShoppingList(q);
            })
        }
        else {
            this.setState({ q: e.target.value }, () => {
                let q = "?q=" + this.state.q;
                this.getShoppingList(q);
            })
            this.setState({
                found: true
            })
        }
        
    }
    // implement pagination
    onNext() {
        axios.get('https://shoppinglist-apis.herokuapp.com' + this.state.nextPage, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response)
                this.setState({
                    shoppingLists: response.data.shoppinglists,
                    success: true,
                    activePage: response.data.current,
                    totalItems: response.data.Total,
                    itemsPerPage: response.data.items,
                    nextPage: response.data.next,
                    previousPage: response.data.prev,

                })
            })
    }
    // implement pagination
    onPrevious() {
        axios.get('https://shoppinglist-apis.herokuapp.com' + this.state.previousPage, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response)
                this.setState({
                    shoppingLists: response.data.shoppinglists,
                    success: true,
                    activePage: response.data.current,
                    totalItems: response.data.Total,
                    itemsPerPage: response.data.items,
                    nextPage: response.data.next,
                    previousPage: response.data.prev,

                })
            })
    }
    // add confirm delete functionality
    onDelete = (id, name) => {
        confirmAlert({
            title: 'Confirm to delete',                        
            message: 'Are you sure you want to delete ' + name,              
            confirmLabel: 'Delete',                          
            cancelLabel: 'Cancel',                             
            onConfirm: () => this.onDeleteList(id)   
        })
    };
    // allow deletion of shoppinglist 
    onDeleteList(id) {
        axios.delete(`/Shoppinglist/${id}`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then(response => {
                // console.log(response.data)
                window.location.reload()
            })
            .catch(error => {
                console.log(error.response)
            })
    }
    // implement view item functionality whenever individual shopping list is clicked
    onItemView (id) {
        // this.setState({id: id, view_item: true})
        this.props.history.push('/Shoppinglist/' +id + '/Items')
    }
    // get all the shopping list
    getShoppingList = (q) => {
        if (!window.localStorage.getItem('token')) {
            this.props.history.push('/')
        }
        axios.get('/Shoppinglist' + q, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then(response => {
                this.setState({

                    shoppingLists: response.data.shoppinglists,
                    success: true,
                    found: true,
                    errmessage: "",
                    activePage: response.data.current,
                    totalItems: response.data.Total,
                    itemsPerPage: response.data.items,
                    nextPage: response.data.next,
                    previousPage: response.data.prev,
                    limit: response.data.per_page
                    

                })
              
                toast.success(window.localStorage.getItem('message'))
                window.localStorage.removeItem('message')
                window.localStorage.setItem('shoppinglist', response.data.shoppinglists.name )
                
            })
            .catch(error => {
                // verify token expiration
                if(error.response){
                    if (error.response.data.error === "your token is invalid, please log in ") {
                        window.localStorage.removeItem('token');
                        window.location.reload();
                        this.props.history.push('/');
                    }
                    else if (error.response) {
                        this.setState({
                            success: true, found: false
                        })
                        if (this.state.q) {
                            console.log(error.response.data.error)
                            this.setState({
                                shoppingLists: [],
                                errmessage: error.response.data.error
                            })
                        }
                    }
                }
                else {
                    this.props.history.push('/')
                }
               
            });
    }
    // load shopping lists to the dashboard
    componentWillMount() {
        this.getShoppingList("");
    }
    // refresh the shoppinglist dashboard after add and update
    reloadDashboard = () => {
        this.getShoppingList("");
       
    }
  
    render() {
        let pages = Math.ceil(this.state.totalItems / this.state.limit);
        let paginate = <span />;
        let button;
        let search = <div className="input-group pull-right col-md-4">
            <input type="email" onInput={this.onSearchInput} name="search" className="form-control" placeholder="search shopping list" />
            <span className="input-group-addon"><i className="glyphicon glyphicon-search" /></span>
        </div>;
        if (this.state.nextPage && !this.state.previousPage) {
            paginate = <label className="panel pull-right fa fa-angle-double-left">page {this.state.activePage} of {pages}<i className="fa fa-angle-double-right" /></label> 
            button = <button onClick={() => { this.onNext() }} className="pull-right btn btn-primary">Next <span aria-hidden="true">&rarr;</span></button>
        }
        else if (this.state.nextPage && this.state.previousPage) {
            paginate = <label className="panel pull-right fa fa-angle-double-left">page {this.state.activePage} of {pages}<i className="fa fa-angle-double-right" /></label> 
            button = <span>
                <button onClick={() => { this.onPrevious() }} className="pull-left btn btn-primary"><span aria-hidden="true">&larr;</span> Prev</button>
                <button onClick={() => { this.onNext() }} className="pull-right btn btn-primary">Next <span aria-hidden="true">&rarr;</span></button>
            </span>
        }
        else if (!this.state.nextPage && this.state.previousPage) {
            paginate = <label className="panel pull-right fa fa-angle-double-left">page {this.state.activePage} of {pages}<i className="fa fa-angle-double-right" /></label> 
            button = <button onClick={() => { this.onPrevious() }} className="pull-left btn btn-primary"><span aria-hidden="true">&larr;</span> Prev</button>
        }
        let noShopp = <span></span>
        if (this.state.success && !this.state.shoppingLists[0] && !this.state.errmessage) {
            noShopp = <div className="text-center">oops! You do not have click add button to add items</div>
        } 
        else if (this.state.errmessage === "shopping list with such name does not exist" && !this.state.found){
            noShopp = <div className="text-center">no shoppinglist with that name</div>
        }
        else if (!this.state.success && !this.state.shoppingLists[0]) {
            noShopp = 
                <div className="text-center"><i className="text-warning fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
                    <span className="sr-only">Loading...</span>
                </div>
        }
        return (
            <div>
                <Header />
                <ToastContainer hideProgressBar={true} />
                <div className="col-md-12 dashboard">
                    <div className="col-md-12">
                       
                        <div className="text-center">
                            <span className="c-add">Click here to add </span>
                            <span className="fa fa-hand-o-right"></span>
                            <button type="button" data-toggle="modal" data-target="#add_list" title="add shoppinglist" className="btn-circle fa fa-plus " />
                        </div>
                        <AddList listReload={this.reloadDashboard} />
                        {search}
                    </div>
                    <br />
                    <div className="col-md-12">
                        
                        <div className="row">
                            <h3 className="text-center">Shopping lists details</h3>
                            {noShopp}
                        
                            {
                                this.state.shoppingLists.map((list) => {
                                    return (
                                        <div key={list.id} >
                                            <div className="col-sm-6 col-md-4">
                                                <div className="thumbnail">
                                                    <AddItem listId={list.id} itemReload={this.reloadDashboard} />
                                                    <UpdateList list={list} listReload={this.reloadDashboard} />
                                                    <div className="caption">
                                                        <h4 className="text-center">{list.name}</h4>
                                                        <p>{list.description}</p>
                                                        <p>
                                                            <i className="btn glyphicon glyphicon-plus text-primary"
                                                                data-toggle="modal"
                                                                data-placement="top" title="add shopping list"
                                                                data-target={"#add_item" + list.id}
                                                                role="button">add</i>
                                                            <i className="btn glyphicon glyphicon-edit text-warning" data-toggle="modal" data-target={"#update_list" + list.id} title="update shoppinglist" role="button">edit</i>
                                                            <i className="btn glyphicon glyphicon-trash text-danger" onClick={() => { this.onDelete(list.id, list.name) }} title="delete shoppinglist" role="button" >del</i>
                                                            <i className="btn glyphicon glyphicon-file text-success" onClick={() => { this.onItemView(list.id) }} role="button" data-placement="top" title="view items">view</i>
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )

                                })

                            }

                        </div>
                        <div className="footer">
                            <nav aria-label="" className="fixed-bottom">
                                <ul className="pager text-center">
                                    {button}
                                   
                                </ul>
                            </nav>
                            
                        </div>
                        
                            {paginate}
                    </div>
                </div>
            </div>
        );
    }
}