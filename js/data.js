/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var newObject = localStorage.getItem('js-local-storage');
if (newObject !== null) {
  data = JSON.parse(newObject);
}

window.addEventListener('beforeunload', function (event) {
  var dataObj = JSON.stringify(data);
  localStorage.setItem('js-local-storage', dataObj);
});
