import app from 'ampersand-app';
import Reflux from 'reflux';
import Item from '../models/item';
import _ from 'lodash';

class ItemStore extends Reflux.Store {
  constructor(){
    super();
    this._items = [];
    this._lastLoaded = 0;
    this.listenTo(app.actions.loadItems, this._loadItems);
  }

  _loadItems = (cnt) => {
    this._items = [];
    window.setTimeout(() => {
      for(var i = 0; i < cnt; i++){
        this._items.push(new Item({
            id: i,
            name: 'thing ' + i
          })
        )
      }
      this._lastLoaded = new Date();
      this.trigger();
    }, 500);
  }

  getItems = () => {
    if(this._items.length === 0){
      this._loadItems(Math.random() * 25);
      return [];
    }else if(new Date() - this._lastLoaded > 60000){
      this._loadItems(Math.random() * 25);
      return this._items;
    }else{
      return this._items;
    }
  }

  getItemsForChart = () => {
    return _.filter(this._items.map((item, i) => {
      return {
        id: item.id,
        name: item.name,
        loudName: item.loudName
      }
    }), function(item){ 
      return item.id > 5 || item.id === 1;
    })
  }

  getLastLoaded = () => {
    return this._lastLoaded;
  }
}

export default ItemStore;