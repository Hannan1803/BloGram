
var dial = document.querySelector(".dial");
var add_btn = document.querySelector(".add_btn");
var submit_btn = document.querySelector(".submit_btn")
var close_btn = document.querySelector(".close_btn");

var title_inp = document.getElementById("title");
var des_inp = document.getElementById("description");
const id = Date.now();
let views = 0;


function addToStorage() {
    const title = title_inp.value;
    const des = des_inp.value; 
    
    storingBlogs.push({id,title , des,views});
    localStorage.setItem("storingBlogs" , JSON.stringify(storingBlogs));
}

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
    addToStorage();
    dial.close();
    const blog = {id : id, title : title_inp.value , des : des_inp.value , views : views};
    addToPage(blog);
    title_inp.value = "";
    des_inp.value = "";
    
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

function addToPage(blog){
    const addDiv = document.createElement("div");
    addDiv.className = "blog";
    addDiv.style.backgroundColor = "white";
    addDiv.style.padding = "16px";
    addDiv.style.margin = "32px";
    addDiv.style.borderStyle = "none";
    addDiv.style.borderRadius = "10px";
    addDiv.style.display = "flex";
    addDiv.style.justifyContent = "space-between";
    addDiv.style.gap = "10px";

    const addCont = document.createElement("div");
    addCont.className = "content";
    addCont.style.display = "flex";
    addCont.style.flexDirection = "column";
    addCont.style.width = "fit-content";

    const addOptions = document.createElement("div");
    addOptions.className = "options";
    addOptions.style.display = "flex";
    addOptions.style.flexDirection = "row";
    addOptions.style.gap = "15px";

    
    //emoji_count
    const addEye = document.createElement("p");
    addEye.className = "count_eye";
    addEye.style.marginTop=  "25px";
    addEye.textContent = "👁️" + blog.views;
   

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


    addButView.addEventListener("click" , () => {
        console.log(blog);
        blog.views += 1;
        updateViews(blog.id , blog.views);
        addEye.textContent = "👁️" + blog.views;
        
        // creating dynamic Dialog when view is clicked
        const viewDialog = document.createElement("dialog");
        document.body.appendChild(viewDialog);
        viewDialog.className = "popUp";

        viewDialog.style.backgroundColor = "rgb(229 231 235)"; 
        viewDialog.style.paddingLeft = "25px"; 
        viewDialog.style.paddingRight = "25px"; 
        viewDialog.style.paddingTop = "10px"; 
        viewDialog.style.paddingBottom = "10px"; 
        viewDialog.style.borderRadius = "0.5rem"; 
        viewDialog.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        viewDialog.style.width = "60%"; 
        viewDialog.style.height = "70%"; 
        viewDialog.style.marginTop = "50px"; 
        viewDialog.style.marginLeft = "auto"; 
        viewDialog.style.marginRight = "auto"; 
        viewDialog.style.border = "1px solid black"; 

        const titleLabel = document.createElement("h1");
        titleLabel.textContent = "Title :";
        titleLabel.style.fontSize = "1.5rem"; // Tailwind class: text-2xl
        titleLabel.style.display = "block"; // Tailwind class: block
        titleLabel.style.marginBottom = "0.5rem"; // Tailwind class: mb-2
        titleLabel.style.textAlign = "center";

        // Create and style the title content
        const titleView = document.createElement("p");
        titleView.textContent = blog.title;
        titleView.className = "popTitle";
        titleView.style.fontSize = "1.5rem"; // Tailwind class: text-2xl
        titleView.style.display = "block"; // Tailwind class: block
        titleView.style.marginBottom = "0.5rem"; // Tailwind class: mb-2
        titleView.style.backgroundColor = "white";
        titleView.style.padding = "10px";
        titleView.style.borderRadius = "10px";
        titleView.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";

        // Create and style the description label
        const descriptionLabel = document.createElement("h1");
        descriptionLabel.textContent = "Description :";
        descriptionLabel.style.fontSize = "1.5rem"; // Tailwind class: text-2xl
        descriptionLabel.style.display = "block"; // Tailwind class: block
        descriptionLabel.style.marginBottom = "0.5rem"; // Tailwind class: mb-2
        descriptionLabel.style.textAlign = "center";

        // Create and style the description content
        const desView = document.createElement("p");
        desView.textContent = blog.des;
        desView.className = "popDes";
        desView.style.fontSize = "1rem"; // Tailwind class: text-md
        desView.style.display = "block"; // Tailwind class: block
        desView.style.marginBottom = "0.5rem"; // Tailwind class: mb-2
        desView.style.backgroundColor = "white";
        desView.style.padding = "10px";
        desView.style.borderRadius = "10px";
        desView.style.height = "auto";
        desView.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        desView.style.width = "fit-content";


        // Creating a button for closing viewing option
        const popClose = document.createElement("button");
        popClose.className = "closePop";
        popClose.textContent = "Close";
        popClose.style.backgroundColor = "#fecaca";
        popClose.style.padding = "15px";
        popClose.style.marginTop = "10px";
        popClose.style.marginLeft = "50%";
        popClose.style.borderRadius = "10px";
        popClose.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";


        popClose.addEventListener("mouseover" , () => {
            popClose.style.backgroundColor = "white";
            popClose.style.cursor = "pointer";
            
        })

        popClose.addEventListener("mouseout" , () => {
            popClose.style.backgroundColor = "#fecaca";
            
        })

        popClose.addEventListener("click" , () => {
            viewDialog.close();
        })



        // Append elements to the dialog
        viewDialog.appendChild(titleLabel);
        viewDialog.appendChild(titleView);
        viewDialog.appendChild(descriptionLabel);
        viewDialog.appendChild(desView);
        viewDialog.appendChild(popClose);

        // Show the dialog
        viewDialog.showModal()
    })

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

    addOptions.appendChild(addEye);
    addOptions.appendChild(addButView);
    addOptions.appendChild(addButEdit);
    addOptions.appendChild(addDelEdit);


    const addTitle = document.createElement("h1");
    addTitle.className = "title";
    addTitle.style.fontSize = "36px";
    addTitle.style.lineHeight = "40px";
    addTitle.style.padding = "2px";

    addTitle.textContent = blog.title;

    const addDes = document.createElement("p");
    addDes.className = "des";
    addDes.style.fontSize = "16px";
    addDes.style.lineHeight = "24px";
    addDes.style.padding = "2px";
    /*addDes.style.whiteSpace = "nowrap";
    addDes.style.overflow = "hidden";
    addDes.style.textOverflow = "ellipsis";*/



    var res = truncateText(blog.des);

    addDes.textContent = res;
    console.log(res);

    parent.appendChild(addDiv);
    addCont.appendChild(addTitle);
    addCont.appendChild(addDes);

    addDiv.appendChild(addCont);
    addDiv.appendChild(addOptions)
}

function truncateText(text) {
    const words = text.split(" ");
    if (words.length > 20) {
        return words.slice(0, 20).join(" ") + "...";
    }
    return text;
}

const storingBlogs= JSON.parse(localStorage.getItem("storingBlogs")) || [];
storingBlogs.forEach(blog => {
    console.log("This is blog : " , blog);
    addToPage(blog);
});

function updateViews(blogId, newViews) {
    const index = storingBlogs.findIndex(blog => blog.id === blogId);
    if (index !== -1) {
        storingBlogs[index].views = newViews;
        const newB =  localStorage.setItem("storingBlogs", JSON.stringify(storingBlogs));
    }
    
}

