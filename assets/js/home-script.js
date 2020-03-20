console.log('My script is loaded');
$(function() {
    $("#calendar").datepicker();
}); 

var listItemContainer = document.getElementsByClassName('list-item-container');
// console.log('listitemContainer: ', listItemContainer);
for(let item of listItemContainer){
    // console.log(true);
    console.log(item.getElementsByTagName('div')[5]);
    let catItem = item.getElementsByTagName('div')[5];
    let catItemText = catItem.getElementsByTagName('span')[0].innerHTML;
    console.log(catItemText);
    if(catItemText=='Personal'){
        catItem.setAttribute("style", "background-color: red;");
    }
    else if(catItemText=='Work'){
        catItem.setAttribute("style", "background-color: blue;");
    }
    else if(catItemText=='Cleaning'){
        catItem.setAttribute("style", "background-color: green;");
    }
    else if(catItemText=='School'){
        catItem.setAttribute("style", "background-color: yellow;");
    }
    else{
        catItem.setAttribute("style", "background-color: violet;");
    }

}
                