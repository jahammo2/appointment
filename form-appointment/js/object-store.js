// ObjectStore is a generic class used to uniquely store objects
//
// See the assignment for details:
// https://github.com/tiy-durham-fe-2015/curriculum/tree/master/assignments/user_mgmt
//
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

    replace: function (originalObj, newObj) {
      if (originalObj.equal(newObj)) {
        collection[collection.indexOf(originalObj)] = newObj;
        return true;
      } else if (self.exists(newObj)) {
        return false;
      } else {
        collection[collection.indexOf(originalObj)] = newObj;
        return true;
      }
    }

  };

  return self;

}
