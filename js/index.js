var dial = document.querySelector(".dial");
var add_btn = document.querySelector(".add_btn");
var submit_btn = document.querySelector(".submit_btn")
var close_btn = document.querySelector(".close_btn");

var title_inp = document.getElementById("title");
var des_inp = document.getElementById("description");


add_btn.addEventListener("click" , () => {
    console.log("Add btn is clicked");
    dial.showModal();
})

close_btn.addEventListener("click" , () => {
    console.log("Close Btn is clicked");
    dial.close();
})

submit_btn.addEventListener("click" , () => {
    console.log(title_inp.value , "   Len is : " , title_inp.value.length);
    console.log("Submit Btn is clicked");
    addToPage();
    title_inp.value = "";
    des_inp.value = "";
    dial.close();
    
    
})

title_inp.addEventListener("input", () => {
    if (title_inp.value.trim().length === 0) {
        submit_btn.style.backgroundColor = "#fecaca";
        submit_btn.disabled = true;
    } else {
        submit_btn.disabled = false;
        submit_btn.style.backgroundColor = "#bbf7d0";
        submit_btn.addEventListener("mouseover" , () =>{
            submit_btn.style.backgroundColor = "white";
        })
        submit_btn.addEventListener("mouseout" , () =>{
            submit_btn.style.backgroundColor = "#bbf7d0";
        })
    }
});

const parent = document.querySelector(".parent");

function addToPage(){
    const addDiv = document.createElement("div");
    addDiv.className = "blog";
    addDiv.style.backgroundColor = "white";
    addDiv.style.padding = "16px";
    addDiv.style.margin = "32px";
    addDiv.style.borderStyle = "none";
    addDiv.style.borderRadius = "10px";
    addDiv.style.display = "flex";
    addDiv.style.justifyContent = "space-between";

    const addCont = document.createElement("div");
    addCont.className = "content";
    addCont.style.display = "flex";
    addCont.style.flexDirection = "column";

    const addOptions = document.createElement("div");
    addOptions.className = "options";
    addOptions.style.display = "flex";
    addOptions.style.flexDirection = "row";
    addOptions.style.gap = "15px";

    //View Button
    const addButView = document.createElement("button");
    addButView.className = "view";
    addButView.style.backgroundColor = "#e5e7eb"; 
    addButView.style.padding = "0.75rem"; 
    addButView.style.borderRadius = "0.5rem"; 
    addButView.style.cursor = "pointer"; 
    addButView.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"; 

    addButView.addEventListener("mouseover", () => {
        addButView.style.backgroundColor = "white"; 
        addButView.style.color = "black"; 
    });
    addButView.addEventListener("mouseout", () => {
        addButView.style.backgroundColor = "#e5e7eb"; 
        addButView.style.color = ""; 
    });

    addButView.textContent = "View";

    //Edit button
    const addButEdit = document.createElement("button");
    addButEdit.className = "edit";
    addButEdit.style.backgroundColor = "#bbf7d0"; 
    addButEdit.style.padding = "0.75rem"; 
    addButEdit.style.borderRadius = "0.5rem"; 
    addButEdit.style.cursor = "pointer"; 
    addButEdit.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"; 

    addButEdit.addEventListener("mouseover", () => {
        addButEdit.style.backgroundColor = "white"; 
        addButEdit.style.color = "black"; 
    });
    addButEdit.addEventListener("mouseout", () => {
        addButEdit.style.backgroundColor = "#bbf7d0"; 
        addButEdit.style.color = ""; 
    });

    addButEdit.textContent = "Edit";

    //Delete Button
    const addDelEdit = document.createElement("button");
    addDelEdit.className = "delete";
    addDelEdit.style.backgroundColor = "#fecaca"; 
    addDelEdit.style.padding = "0.75rem"; 
    addDelEdit.style.borderRadius = "0.5rem"; 
    addDelEdit.style.cursor = "pointer"; 
    addDelEdit.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"; 

    addDelEdit.addEventListener("mouseover", () => {
        addDelEdit.style.backgroundColor = "white"; 
        addDelEdit.style.color = "black"; 
    });
    addDelEdit.addEventListener("mouseout", () => {
        addDelEdit.style.backgroundColor = "#fecaca"; 
        addDelEdit.style.color = ""; 
    });

    addDelEdit.textContent = "Delete";

    addOptions.appendChild(addButView);
    addOptions.appendChild(addButEdit);
    addOptions.appendChild(addDelEdit);

    addDiv.appendChild(addCont);
    addDiv.appendChild(addOptions)

    const addTitle = document.createElement("h1");
    addTitle.className = "title";
    addTitle.style.fontSize = "36px";
    addTitle.style.lineHeight = "40px";
    addTitle.style.padding = "2px";

    addTitle.textContent = title_inp.value;

    const addDes = document.createElement("p");
    addDes.className = "des";
    addDes.style.fontSize = "16px";
    addDes.style.lineHeight = "24px";
    addDes.style.padding = "2px";
    addDes.style.whiteSpace = "nowrap";
    addDes.style.overflow = "hidden";
    addDes.style.textOverflow = "ellipsis";

    var res = truncateText(des_inp.value);

    addDes.textContent = res;
    console.log(res);




    parent.appendChild(addDiv);
    addCont.appendChild(addTitle);
    addCont.appendChild(addDes);
}

function truncateText(text) {
    const words = text.split(" ");
    if (words.length > 20) {
        return words.slice(0, 20).join(" ") + "...";
    }
    return text;
}



