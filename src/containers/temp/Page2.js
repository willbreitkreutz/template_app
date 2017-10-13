import app from 'ampersand-app';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Other extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: app.itemStore.getItemsForChart(),
      lastLoaded: moment(app.itemStore.getLastLoaded()).fromNow()
    }
  }

  componentDidMount(){
    this.itemsUnlistener = app.itemStore.listen(this.getItemsFromStore);
  }

  componentWillUnmount(){
    this.itemsUnlistener();
  }

  getItemsFromStore = () => {
    this.setState({
      items: app.itemStore.getItemsForChart(),
      lastLoaded: moment(app.itemStore.getLastLoaded()).fromNow()
    })
  }

  reload = () => {
    const cnt = Math.random() * 25;
    app.actions.loadItems(cnt);
  }

  render(){
    const match = this.props.match;
    const variable = match.params.variable;
    const { items, lastLoaded } = this.state;
    return (
      <div className="container">
        <Link to="/">Back Home</Link>
        <br/>
        <h1>{variable}</h1>
        <h3>Last Loaded {lastLoaded}</h3>
        <button onClick={this.reload} className="btn btn-default">Force Reload</button>
        <ul>
          {
            items.map( (item, i) => {
              return <li key={i}>{item.name + ', now louder -> ' + item.loudName}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default Other;