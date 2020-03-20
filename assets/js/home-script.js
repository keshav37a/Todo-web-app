console.log('My script is loaded');

//function to load the functionality of calendar
$(function() {
    $("#calendar").datepicker();
}); 


// List item container consists of all the to do items which are added in the list
var listItemContainer = document.getElementsByClassName('list-item-container');

for(let item of listItemContainer){
    let catItem = item.getElementsByTagName('div')[5];
    let catItemText = "";

    //Getting the category text for each list item to determin the color coding
    if(catItem!=undefined)
        catItemText = catItem.getElementsByTagName('span')[0].innerHTML;

    //Getting the date item to properly format it because the format in which it is stored in the database is quite long and non user friendly
    let dateItem = item.getElementsByTagName('div')[3];
    let dateString = dateItem.getElementsByTagName('span')[0].innerHTML;
    console.log(dateString);
    let dateArray = dateString.split(' ');
    let newDate = `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
    dateItem.getElementsByTagName('span')[0].innerHTML = newDate;
    console.log(newDate);

    if(catItemText=='Personal'){
        catItem.setAttribute("style", "background-color: #3C6CB8;");
    }
    else if(catItemText=='Work'){
        catItem.setAttribute("style", "background-color: #9C00AF;");
    }
    else if(catItemText=='Cleaning'){
        catItem.setAttribute("style", "background-color: green;");
    }
    else if(catItemText=='School'){
        catItem.setAttribute("style", "background-color: #F2A700;");
    }
    else if(catItemText=='Others'){
        catItem.setAttribute("style", "background-color: violet;");
    }
}

