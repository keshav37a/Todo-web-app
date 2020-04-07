console.log('My script is loaded');

//function to load the functionality of calendar
$(function() {
    $("#calendar").datepicker();
}); 

//Format the date from the db in other format
let dateFormattingFn = function(){
    $('.date').each(function(){
        let element = $(this);
        let unformattedDate = element.text();
        let formattedDate = moment(unformattedDate).format('MMMM DD, hh:mm A');
        element.text(formattedDate);
    })
}

let addOneItemToList = function(element){
    let str = 
        `<div id="container-${element._id}" class="flex row start list-item-container">
            <div class="checkbox-container">
                <input type="checkbox" class="item-input-box" name = "${element._id}">
            </div>
            <div class="flex col start description-container">
                <div class="description">${element.description}</div>
                <div class="date-container">
                    <i class="fas fa-calendar-alt mr1"></i>
                    <span>Due Date:</span>
                    <span class="date">${element.date}</span>
                </div>
                <div class="date-container">
                    <i class="fas fa-calendar-alt mr1"></i>
                    <span>Date Added:</span>
                    <span class="date">${element.createdAt}</span>
                </div>
            </div>
            <div>
                <div id="cat" class="category category-container">
                    <span class="category-text">${element.category}</span>
                </div>
            </div>
        </div>`

        return str;
}

let addOneItemToColorCode = function(container){
        let spanElement = $('.category-text', container);
        let categoryText = spanElement.text();
        if(categoryText=='none'){
            container.remove();
        }
        if(categoryText=='Personal'){
           container.css("background-color", "#3C6CB8");
        }
        else if(categoryText=='Work'){
            container.css("background-color", "#9C00AF");
        }
        else if(categoryText=='Cleaning'){
            container.css("background-color", "green");
        }
        else if(categoryText=='School'){
            container.css("background-color", "#F2A700");
        }
        else if(categoryText=='Others'){
            container.css("background-color", "violet");
        }
}

//A function to color code all notes according to category
let categoryColorCodeFn = function(){
    let categoryContainers = $('.category-container');
    $(categoryContainers).each(function(){
        let container = $(this);
        addOneItemToColorCode(container);
    })
}

//Add new dom to html after getting new data from the database for filter and sorting
let domListUpdation = function(data){

    let toDoItemList = $('#to-do-items-list');
    toDoItemList.empty();
    console.log(data.data.items);

    let dataItemArray = data.data.items;

    dataItemArray.forEach(element => {

        let str = addOneItemToList(element);
        toDoItemList.append(str);

    });

    dateFormattingFn();
    categoryColorCodeFn();
}

let deleteOneItem = function(element){
    $(element).remove();
}

//ajax for add new note
$('#add-note-form').submit(function(e){
    console.log('On Submission');
    let addNoteForm = $('#add-note-form');
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/create-item',
        data: addNoteForm.serialize(),
        success: function(data){
            console.log(data);
            let str = addOneItemToList(data.data.items);
            console.log(str);
            let toDoItemList = $('#to-do-items-list');
            toDoItemList.append($(str));
            categoryColorCodeFn();
            dateFormattingFn();
            // addOneItemToColorCode($(str));
            $('#add-note-form')[0].reset();
            console.log(toDoItemList);
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
})

$('#delete-notes-form').submit(function(e){
    let deleteForm = $('#delete-notes-form');
    let obj = deleteForm.serialize();
    console.log('after serialize');
    console.log(obj);
    console.log(deleteForm);
    e.preventDefault();
    $.ajax({
        type: "get",
        data: deleteForm.serialize(),
        url: '/delete-item',
        success: function(data){
            console.log(data);
            data.data.deletedItems.forEach(function(i){
                let element = $(`#container-${i._id}`);
                deleteOneItem(element);
            })
        }
    })
})


//using jquery now
//A change function for an ajax call to get the elements from the db in a sorted order
$('#dropdown-sort').change(function(){
    let selectedOption = $(this).children("option:selected").val();
    console.log('selected-option ');
    console.log(selectedOption);
    $.ajax({
        type: 'get',
        url: `/sort-item?sby=${selectedOption}`,
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log('Inside success function');
            console.log(data);  
            domListUpdation(data);
        }
    })
    // alert(selectedOption);
})

//A change function for an ajax call to get the elements from the db of a particular filter
$('#dropdown-filter').change(function(){
    let selectedOption = $(this).children("option:selected").val();
    console.log('selected-option ');
    console.log(selectedOption);
    $.ajax({
        type: 'get',
        url: `/filter-item?fby=${selectedOption}`,
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log('Inside success function');
            console.log(data);  
            domListUpdation(data);
        }
    })
});

//Search function for searching notes
let searchNotes = function(){
    let text = $('#search-field').val();
    console.log(`searchnotes called: ${text}`);
    $.ajax({
        type: 'get',
        url: `/search?query=${text}`,
        success: function(data){
            console.log(data);
            let listContainer = $('#to-do-items-list');
            listContainer.empty();
            data.data.itemsFound.forEach(element => {
                let str = addOneItemToList(element);
                console.log(str);
                listContainer.append(str);
            })
            dateFormattingFn();
            categoryColorCodeFn();
        }
    })
}



dateFormattingFn();
categoryColorCodeFn();