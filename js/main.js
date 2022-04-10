/* global data */
/* exported data */

var $container = document.getElementById('container');
var $entryFormh1 = document.querySelector('.entry-form-h1');
var $titleInput = document.querySelector('.title-input');
var $photoInput = document.querySelector('.photo-input');
var $textArea = document.querySelector('.textarea');
var $image = document.querySelector('.image');
var $form = document.querySelector('.form');
var $ul = document.querySelector('.unordered-list');
var $anchor = document.querySelector('.anchor');
var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');
var $buttonAnchor = document.querySelector('.button-anchor');
var $deleteLink = document.querySelector('.delete-link');
var $newEntryMode = document.querySelector('.new-entry-mode');
var $modal = document.querySelector('.modal');
var $cancelButton = document.querySelector('.cancel-button');

$photoInput.addEventListener('input', function (event) {
  var newInput = event.target.value;
  $image.setAttribute('src', newInput);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing === null) {
    var newObj = {};
    newObj.title = event.target.elements.title.value;
    newObj.photo = event.target.elements.photo.value;
    newObj.notes = event.target.elements.notes.value;
    newObj.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObj);
    $entries.className = 'entries';
    $entryForm.className = 'entry-form hidden';
    var listItem = domTree(newObj);
    $ul.prepend(listItem);
    $buttonAnchor.className = 'button-anchor';
    window.location.hash = '#entries';
    $image.setAttribute('src', '/images/placeholder-image-square.jpg');
    event.target.reset();
  } else {
    var editedObj = {
      title: event.target.elements.title.value,
      photo: event.target.elements.photo.value,
      notes: event.target.elements.notes.value,
      entryId: data.editing.entryId
    };
    var $liNodeList = document.querySelectorAll('.li-item');
    $entries.className = 'entries';
    $entryForm.className = 'entry-form hidden';
    var editItem = domTree(editedObj);
    var indexEntryId = editItem.getAttribute('data-entry-id');
    for (var i = 0; i < $liNodeList.length; i++) {
      if (indexEntryId === $liNodeList[i].closest('li').getAttribute('data-entry-id')) {
        $liNodeList[i].replaceWith(editItem);
        data.entries[i] = editedObj;
      }
    }
    window.location.hash = '#entries';
    $buttonAnchor.className = 'button-anchor';
    $image.setAttribute('src', '/images/placeholder-image-square.jpg');
    event.target.reset();
    data.editing = null;
  }
});

/* Structure of domTree
<li>
  <div class="row entries">
    <div class="column-half">
      <img src="some image" class="image">
    </div>
    <div class="column-half">
      <div class="inner-div">
        <h2></h2>
        <div class="second-inner-div">
        <a></a>
          <i></i>
        </div>
      </div>
      <p></p>
    </div>
  </div>
</li> */

function domTree(entry) {
  var liElem = document.createElement('li');
  var rowDiv = document.createElement('div');
  var firstColDiv = document.createElement('div');
  var imgElem = document.createElement('img');
  var secondColDiv = document.createElement('div');
  var innerDiv = document.createElement('div');
  var h2Elem = document.createElement('h2');
  var secondInnerDiv = document.createElement('div');
  var pElem = document.createElement('p');
  var editIcon = document.createElement('i');
  var editAnchor = document.createElement('a');
  liElem.appendChild(rowDiv);
  liElem.className = 'li-item';
  liElem.setAttribute('data-entry-id', entry.entryId);
  rowDiv.appendChild(firstColDiv);
  firstColDiv.appendChild(imgElem);
  rowDiv.appendChild(secondColDiv);
  editIcon.className = 'fas fa-pen';
  editIcon.setAttribute('data-entry-id', entry.entryId);
  secondColDiv.appendChild(innerDiv);
  innerDiv.className = 'inner-div';
  innerDiv.appendChild(h2Elem);
  innerDiv.appendChild(secondInnerDiv);
  secondInnerDiv.className = 'second-inner-div';
  secondInnerDiv.appendChild(editAnchor);
  editAnchor.appendChild(editIcon);
  editAnchor.setAttribute('href', '#entry-form');
  editAnchor.setAttribute('class', 'edit-icon-anchor');
  secondColDiv.appendChild(pElem);
  rowDiv.setAttribute('class', 'row entries');
  firstColDiv.setAttribute('class', 'column-half');
  imgElem.setAttribute('class', 'image');
  secondColDiv.setAttribute('class', 'column-half firstInnerColDiv');
  imgElem.setAttribute('src', entry.photo);
  h2Elem.textContent = entry.title;
  pElem.textContent = entry.notes;
  return liElem;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    var entry = domTree(data.entries[i]);
    $ul.appendChild(entry);
  }
  if (window.location.hash.slice(1) === $entries.getAttribute('data-view')) {
    $entries.className = 'entries';
    $entryForm.className = 'entry-form hidden';
    $buttonAnchor = 'button-anchor';
  } else if (window.location.hash.slice(1) === $entryForm.getAttribute('data-view')) {
    $entryForm.className = 'entry-form';
    $entries.className = 'entries hidden';
    if (data.editing !== null) {
      $titleInput.value = data.editing.title;
      $photoInput.value = data.editing.photo;
      $image.setAttribute('src', data.editing.photo);
      $textArea.value = data.editing.notes;
      $entryFormh1.textContent = 'Edit Entry';
      $deleteLink.className = 'delete-link';
      $newEntryMode.setAttribute('class', 'button-div');
    } else if (data.editing === null) {
      $entryForm.className = 'entry-form';
      $entries.className = 'entries hidden';
    }
  }
});

$anchor.addEventListener('click', function (event) {
  $entries.className = 'entries';
  $entryForm.className = 'entry-form hidden';
  $buttonAnchor = 'button-anchor';
});

$buttonAnchor.addEventListener('click', function (event) {
  data.editing = null;
  $buttonAnchor.className = 'button-anchor hidden';
  $deleteLink.className = 'delete-link hidden';
  $entryForm.className = 'entry-form';
  $entries.className = 'entries hidden';
  $entryFormh1.textContent = 'New Entry';
  $newEntryMode.setAttribute('class', 'new-entry-mode');
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  window.location.hash = '#entry-form';
  $form.reset();
});

$ul.addEventListener('click', function (event) {
  if (event.target.matches('i')) {
    $entryForm.className = 'entry-form';
    $entries.className = 'entries hidden';
    $deleteLink.className = 'delete-link';
    var nextEntryIdString = event.target.getAttribute('data-entry-id');
    var nextEntryIdNum = parseInt(nextEntryIdString, 10);
    for (var j = 0; j < data.entries.length; j++) {
      if (nextEntryIdNum === data.entries[j].entryId) {
        data.editing = data.entries[j];
      }
    }
    $entryFormh1.textContent = 'Edit Entry';
    $titleInput.value = data.editing.title;
    $photoInput.value = data.editing.photo;
    $image.setAttribute('src', data.editing.photo);
    $newEntryMode.setAttribute('class', 'button-div');
    $textArea.value = data.editing.notes;
  } else {
    $entries.className = 'entries';
    $entryForm.className = 'entry-form hidden';
  }
});

function displayModal(event) {
  if ($modal.className === 'modal hidden') {
    $modal.className = 'modal';
    $container.className = 'container-two';
  }
}

function hideModal(event) {
  if ($modal.className === 'modal') {
    $modal.className = 'modal hidden';
    $container.className = 'container';
  }
}

$deleteLink.addEventListener('click', displayModal);

$cancelButton.addEventListener('click', hideModal);
