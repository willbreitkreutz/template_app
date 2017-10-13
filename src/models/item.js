import Model from 'ampersand-model';

const Item = Model.extend({
  props:{
    id: 'number',
    name: 'string'
  },
  derived:{
    loudName: {
      deps: ['name'],
      fn: function(){
        return this.name.toUpperCase();
      }
    }
  }
})

export default Item;