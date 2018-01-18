import React, { Component } from 'react';
import AddList from './modals/addList';
import axios from 'axios';
import AddItem from './modals/addItem';


export default class DashBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            shoppingLists:[],
            success: false
            
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.onDeleteList = this.onDeleteList.bind(this);
        
    }
  
    handleLogout =()=> {
       localStorage.removeItem('token');
       this.props.history.push('/');
       

    }

    onDeleteList = (id) => {
        axios.delete(`/Shoppinglist/${id}`,{
            headers:{
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization':localStorage.getItem("token")
        }})
        .then(response => {
            // console.log(response.data)
            window.confirm('are you sure you want to detele shopping list')
            window.location.reload()
        })
        .catch(error => {
            console.log(error.response)
        })
    }
   
    componentDidMount (){
        
        if(!window.localStorage.getItem('token')){
            this.props.history.push('/')
        }
        axios.get('/Shoppinglist',{headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization':localStorage.getItem("token")
         }})
        .then( response => {
            this.setState({
                shoppingLists:response.data.shoppinglists,
                success: true
                
            })
        })
        .catch(error => {
            if (error.response){
                this.setState({
                    success: true
                    
                })
               
            }

        });
    }

    
    
    render() {
        let noShopp = <span></span>
        if (this.state.success && !this.state.shoppingLists[0]){
            noShopp = <div>you don have any</div>
        } 
        else if (!this.state.success && !this.state.shoppingLists[0]){
            noShopp = <div>loading ...</div>
        }
        return (
            <div className="col-md-12">
                <div className="col-md-12">
                    <div className="pull-right row col-md-4 panel">
                        <div className="text-primary">
                            <label className="fa fa-user-circle user pull-left" />
                            <p onClick={this.handleLogout}>Welcome Stephen,  Logout <br />Update Account</p>
                        </div>
                    </div>
                    <div className="col-md-8 panel">
                        <div className="row">
                            <h4>Manage your shopping plans with ease by using an epic shopping list App</h4>
                        </div>
                        <div className="text-center">
                            <button type="button" data-toggle="modal" data-target="#add_list" className="btn-circle fa fa-plus " />
                        </div>
                        <AddList />
                    </div>
                </div>
                <br />
                <div className="col-md-12">
                {noShopp}
                    <div className="row">
                        {
                            this.state.shoppingLists.map((list, index) => {
                                return (
                                    <div key={list.id} className="col-sm-6 col-md-4">
                                        <div className="thumbnail">
                                        <AddItem/>
                                        
                                            <div className="caption">
                                                <p>{list.id}</p>
                                                <h4 className="text-center">{list.name}</h4>
                                                <p>{list.description}</p>
                                                <p>
                                                    <i className="btn glyphicon glyphicon-plus text-primary" 
                                                    data-toggle="modal"
                                                     data-placement="top" title="add shopping list"
                                                     data-target="#add_item" 
                                                     role="button">add</i>
                                                    <i className="btn glyphicon glyphicon-edit text-warning" role="button">edit</i>
                                                    <i className="btn glyphicon glyphicon-trash text-danger" onClick={()=>{this.onDeleteList(list.id)}} role="button" >del</i>
                                                    <i className="btn glyphicon glyphicon-file text-success" role="button" >view</i>
                                                </p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                )

                            })
                            
                        }
                        
                    </div>
                       
            </div>
        </div>
        );
    }
}