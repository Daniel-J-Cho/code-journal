/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var newObjEntries = localStorage.getItem('js-local-storage');
if (newObjEntries !== null) {
  data.entries = JSON.parse(newObjEntries);
}

window.addEventListener('beforeunload', function (event) {
  var dataObj = JSON.stringify(data);
  localStorage.setItem('js-local-storage', dataObj);
});
