console.log('My script is loaded');
$(function() {
    $("#calendar").datepicker();
}); 

var listItemContainer = document.getElementsByClassName('list-item-container');
// console.log('listitemContainer: ', listItemContainer);
for(let item of listItemContainer){
    // console.log(true);
    // console.log(item.getElementsByTagName('div')[5]);
    let catItem = item.getElementsByTagName('div')[5];
    let catItemText = "";
    if(catItem!=undefined)
        catItemText = catItem.getElementsByTagName('span')[0].innerHTML;

    let dateItem = item.getElementsByTagName('div')[3];
    let dateString = dateItem.getElementsByTagName('span')[0].innerHTML;
    console.log(dateString);
    let dateArray = dateString.split(' ');
    let newDate = `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
    dateItem.getElementsByTagName('span')[0].innerHTML = newDate;
    console.log(newDate);

    // console.log(catItemText);
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

