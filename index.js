import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://addcartapp-40e10-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList");




// Fetching the HTML element by using DOM methods..
const inputEL = document.getElementById("input-field");
const btnEL = document.getElementById("add-button");
const itemLists = document.getElementById("item-list");



/// Adding eventlistener to button...

btnEL.addEventListener("click", () => {
    let inputValue = inputEL.value;
    try {
        push(shoppingListDB, inputValue);
    } catch (err) {
        console.log(err);
    } finally {
        console.log(`${inputValue} added to database..`);
    }
});


/// fetching all data from db...

onValue(shoppingListDB, function (snapshot) {
    if (snapshot.exists()) {
        const items = Object.entries(snapshot.val());
        itemLists.innerHTML = "";
        items.forEach((item) => {
            displayListOnBrowser(item);
        });
    }else{
        noDataMessage();
    }
});


// displaying the data on screen/Browser...

function displayListOnBrowser(inputValue) {
    const inputvalueKey = inputValue[0];
    const inputvalueVal = inputValue[1];
    const newList = document.createElement("li");
    newList.textContent = inputvalueVal;
    itemLists.appendChild(newList);


    /// adding the event listner for removing the item...

    newList.addEventListener("click", () => {
        let exactLocation = ref(database, `shoppingList/${inputvalueKey}`);
        remove(exactLocation);
    });

    makeInputFieldEmpty();
};




//function to make input null...
function makeInputFieldEmpty() {
    inputEL.value = null;
}

// No element message element...
function noDataMessage(){
    itemLists.innerHTML = `<h3>Add Some produts into the cart...</h3>`
}




