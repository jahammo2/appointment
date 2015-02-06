function ObjectStore() {
  var collection = [];

  var self = {
    exists: function (obj) {
      return collection.some(function (item) {
        return obj.equal(item);
      });
    },

    add: function (obj) {
      if (!self.exists(obj)) {
        collection.push(obj);
        return true;
      }
      alert('ben sucks at making unique ids. what a dick');
      return false;
    },

    query: function (obj) {
      return collection;
    },

    remove: function (obj) {
      collection = collection.filter(function (item) {
        return !obj.equal(item);
      });
    },

    removeById: function (id) {
      for (var i = 0; i < collection.length; ++i) {
        if (collection[i].getId() === id) {
          this.remove(collection[i]);
          return true;
        }
      }
      return false;
    },

    replace: function (originalObj, newObj) {
      self.remove(originalObj);
      self.add(newObj);
    }
  }

  return self;

}
