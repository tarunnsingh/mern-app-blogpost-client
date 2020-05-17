import React, { Component } from 'react';
import axios from 'axios'


class Search extends Component {
    constructor (props) {
        super( props );
        this.state = {
            query: '',
            loading: false,
        }
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.cancel = ''
    }
    
    handleOnInputChange = (event) => {
        const query = event.target.value
        this.setState({ query: query, loading: true})
        if(this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source()

        axios.get(`/api/search?q=${query}`, {
            cancelToken: this.cancel.token
        })
        .then((response)=>{
            console.log('data recieved on search', response.data )
            this.props.searchBlogsUpdate(response.data)
        })
        .catch((error )=>{
            if( axios.isCancel(error) || error ){
                this.setState({loading: false })
            }
            console.log('data not recieved on search', error)
        })  
    }

    render() { 
        const  { query } = this.state
        return ( 
        <div>
            <label className='search-label' htmlFor='search-input'>
                <input className='search-input'
                    value={query}
                    type='text'
                    placeholder="Search..."
                    id='search-input'
                    onChange={this.handleOnInputChange}
                />
            </label>
        </div>
        
            );
    }
}
 
export default Search;