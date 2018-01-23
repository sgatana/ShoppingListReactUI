import React, { Component } from 'react';
import AddList from './modals/addList';
import axios from 'axios';
import AddItem from './modals/addItem';
import Header from './header';
import Items from './items';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingLists: [],
            success: false,
            totalItems: '',
            itemsPerPage: '',
            activePage: '',
            nextPage: '',
            previousPage: '',
            view_item: false,
            id: false
            // current_shoppinglist: 0
        }
        this.onDeleteList = this.onDeleteList.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onItemView = this.onItemView.bind(this);


    }
    onNext() {
        axios.get('http://127.0.0.1:5000' + this.state.nextPage, {
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
                    previousPage: response.data.prev

                })
            })
    }
    onPrevious() {
        axios.get('http://127.0.0.1:5000' + this.state.previousPage, {
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
                    previousPage: response.data.prev

                })
            })
    }

    onDelete = (id, name) => {
        confirmAlert({
            title: 'Confirm to delete',                        // Title dialog
            message: 'Are you sure you want to delete ' + name,               // Message dialog
            confirmLabel: 'Delete',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => this.onDeleteList(id)   // Action after Confirm
            // onCancel: () => alert('Action after Cancel'),      // Action after Cancel
        })
    };

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
    onItemView (id) {
        // this.setState({id: id, view_item: true})
        this.props.history.push('/Shoppinglist/' +id + '/Items')
    }
    getShoppingList = () => {
        if (!window.localStorage.getItem('token')) {
            this.props.history.push('/')
        }
        axios.get('/Shoppinglist', {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("token")
            }
        })
            .then(response => {
                this.setState({

                    shoppingLists: response.data.shoppinglists,
                    success: true,
                    activePage: response.data.current,
                    totalItems: response.data.Total,
                    itemsPerPage: response.data.items,
                    nextPage: response.data.next,
                    previousPage: response.data.prev

                })
              
                toast.success(window.localStorage.getItem('message'))
                window.localStorage.removeItem('message')
                
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        success: true
                    })
                    console.log(error.response)
                }
            });
    }

    componentDidMount() {
        this.getShoppingList();

    }

    render() {
        if(this.state.view_item){
            return (
            <Items id={this.state.id}/>,
            this.props.history.push('/Items')
        );
        }
        let button
        if (this.state.nextPage && !this.state.previousPage) {
            //    button = <button onClick={() => { this.onPrevious() }} className="pull-left btn btn-primary"><span aria-hidden="true">&larr;</span> Older</button>
            button = <button onClick={() => { this.onNext() }} className="pull-right btn btn-primary">Newer <span aria-hidden="true">&rarr;</span></button>
        }
        else if (this.state.nextPage && this.state.previousPage) {
            button = <span>
                <button onClick={() => { this.onPrevious() }} className="pull-left btn btn-primary"><span aria-hidden="true">&larr;</span> Older</button>
                <button onClick={() => { this.onNext() }} className="pull-right btn btn-primary">Newer <span aria-hidden="true">&rarr;</span></button>
            </span>
        }
        else if (!this.state.nextPage && this.state.previousPage) {
            button = <button onClick={() => { this.onPrevious() }} className="pull-left btn btn-primary"><span aria-hidden="true">&larr;</span> Older</button>
            // button = <button onClick={() => { this.onNext() }} className="pull-right btn btn-primary">Newer <span aria-hidden="true">&rarr;</span></button>
        }
        let noShopp = <span></span>
        if (this.state.success && !this.state.shoppingLists[0]) {
            noShopp = <div>oops! You do not have click add button to add items</div>
        }
        else if (!this.state.success && !this.state.shoppingLists[0]) {
            noShopp = <div>loading ...</div>
        }
        return (
            <div>
                <Header />
                <div className="col-md-12 dashboard">
                    <div className="col-md-12">
                       
                        <div className="text-center">
                            <button type="button" data-toggle="modal" data-target="#add_list" className="btn-circle fa fa-plus " />
                        </div>
                        <AddList />
                        <ToastContainer hideProgressBar={true} />
                       
                    </div>
                    <br />
                    <div className="col-md-12">
                        {noShopp}
                        <div className="row">
                            <h3 className="text-center">Shopping lists details</h3>
                        
                            {
                                this.state.shoppingLists.map((list) => {
                                    return (
                                        <div key={list.id} >
                                            <div className="col-sm-6 col-md-4">
                                                <div className="thumbnail">
                                                    <AddItem listId={list.id} />
                                                    <div className="caption">
                                                        <h4 className="text-center">{list.name}</h4>
                                                        <p>{list.description}</p>
                                                        <p>
                                                            <i className="btn glyphicon glyphicon-plus text-primary"
                                                                // onClick={() => { this.setState({ current_shoppinglist: list.id }, console.log('Clickeddddd', this.state))}}
                                                                data-toggle="modal"
                                                                data-placement="top" title="add shopping list"
                                                                data-target="#add_item"
                                                                role="button">add</i>
                                                            <i className="btn glyphicon glyphicon-edit text-warning" title="update shoppinglist" role="button">edit</i>
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

                    </div>
                </div>
            </div>
        );
    }
}