import React from 'react';
import Table from './table'
import { Link } from "react-router-dom";

class Issues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

      columns = [
        {
          Header: 'React Issues',
          accessor: 'title'
        }, 
        {
          Header: 'Url',
          accessor: 'url',
          Cell: ({ row }) => (<a href={`${row.values['url']}`} >{row.values['url']}</a>),
        }, 
      ]
    
      componentDidMount() {
        fetch("https://api.github.com/repos/facebook/react/issues")
          .then(res => res.json())
          .then(
            result => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
      render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Table data={items} columns={this.columns}/>
          );
        }
      }
    }
    export default Issues;