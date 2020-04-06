console.log('My script is loaded');

//function to load the functionality of calendar
$(function() {
    $("#calendar").datepicker();
}); 

//using jquery now
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

let dateFormattingFn = function(){
    $('.date').each(function(){
        let element = $(this);
        let unformattedDate = element.text();
        let formattedDate = moment(unformattedDate).format('MMMM DD, hh:mm A');
        element.text(formattedDate);
    })
}

let categoryColorCodeFn = function(){
    let categoryContainers = $('.category-container');
    $(categoryContainers).each(function(){
        let container = $(this);
        // console.log(container);
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
    })
    // console.log(categoryContainers);
}

let domListUpdation = function(data){

    let toDoItemList = $('#to-do-items-list');
    toDoItemList.empty();
    console.log(data.data.items);

    let dataItemArray = data.data.items;

    dataItemArray.forEach(element => {

        let str = 
        `<div class="flex row start list-item-container">
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

        toDoItemList.append(str);

    });

    dateFormattingFn();
    categoryColorCodeFn();
}

dateFormattingFn();
categoryColorCodeFn();