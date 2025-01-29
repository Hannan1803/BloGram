var dial = document.querySelector(".dial");
var add_btn = document.querySelector(".add_btn");
var submit_btn = document.querySelector(".submit_btn")
var close_btn = document.querySelector(".close_btn");

var title_inp = document.getElementById("title");
var des_inp = document.getElementById("description");
const id = Date.now();
let views = 0;


function addToStorage(new_title , new_des) {
    const title = new_title;
    const des = new_des; 
    
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
    addToStorage(title_inp.value , des_inp.value);
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
        //viewDialog.style.border = "1px solid black";

        // "VIEW" title 
        const viewTitle = document.createElement("div");
        viewTitle.textContent = "VIEW : ";
        viewTitle.style.fontSize = "2.5rem";
        viewTitle.style.textAlign = "center";
        viewTitle.style.padding = "20px";
        viewTitle.style.marginTop = "auto";
        viewTitle.style.backgroundColor = "white";
        viewTitle.style.borderRadius = "10px";
        viewTitle.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        

        // "Title" in the dialog
        const titleLabel = document.createElement("h1");
        titleLabel.textContent = "Title :";
        titleLabel.style.fontSize = "1.5rem"; // Tailwind class: text-2xl
        titleLabel.style.display = "block"; // Tailwind class: block
        titleLabel.style.marginBottom = "0.5rem"; // Tailwind class: mb-2
        titleLabel.style.marginTop = "0.5rem"; // Tailwind class: mb-2
        titleLabel.style.textAlign = "center";

        // Create and style the title content
        const titleView = document.createElement("p");
        titleView.textContent = blog.title;
        //titleView.textContent = updatedTitle(blog.id);
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
        desView.style.width = "100%";


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
        viewDialog.appendChild(viewTitle);
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

    addButEdit.addEventListener("click" , () => {

        const editDialog = document.createElement("dialog");
        document.body.appendChild(editDialog);
        editDialog.className = "popUp";

        editDialog.style.backgroundColor = "rgb(229 231 235)"; 
        editDialog.style.paddingLeft = "25px"; 
        editDialog.style.paddingRight = "25px"; 
        editDialog.style.paddingTop = "10px"; 
        editDialog.style.paddingBottom = "10px"; 
        editDialog.style.borderRadius = "0.5rem"; 
        editDialog.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        editDialog.style.width = "60%"; 
        editDialog.style.height = "70%"; 
        editDialog.style.marginTop = "50px"; 
        editDialog.style.marginLeft = "auto"; 
        editDialog.style.marginRight = "auto"; 

        // "Edit: " title in the dialog
        const editTitle = document.createElement("div");
        editTitle.textContent = "EDIT : ";
        editTitle.style.fontSize = "2.5rem";
        editTitle.style.textAlign = "center";
        editTitle.style.padding = "20px";
        editTitle.style.marginTop = "auto";
        editTitle.style.backgroundColor = "white";
        editTitle.style.borderRadius = "10px";
        editTitle.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";

        // Title in the edit dialog
        const titleLabel = document.createElement("h1");
        titleLabel.textContent = "Title :";
        titleLabel.style.fontSize = "1.5rem"; 
        titleLabel.style.display = "block"; 
        titleLabel.style.marginBottom = "0.5rem"; 
        titleLabel.style.marginTop = "0.5rem"; 
        titleLabel.style.textAlign = "center";

        // creating enable TITLE feature
        const titleEdit = document.createElement("input");
        titleEdit.type = "text";
        titleEdit.value = blog.title;
        titleEdit.style.backgroundColor = "rgb(229 231 235)"; 
        titleEdit.className = "popTitle";
        titleEdit.style.fontSize = "1.5rem"; 
        titleEdit.style.display = "block"; 
        titleEdit.style.marginBottom = "0.5rem"; 
        titleEdit.style.margin = "auto";
        titleEdit.style.padding = "10px";
        titleEdit.style.borderRadius = "10px";
        titleEdit.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        titleEdit.style.alignItems = "center";
        titleEdit.style.width = "100%";
        titleEdit.style.border = "1px solid #ccc";

        // "Description" title in page
        const descriptionEdit = document.createElement("h1");
        descriptionEdit.textContent = "Description :";
        descriptionEdit.style.fontSize = "1.5rem"; 
        descriptionEdit.style.display = "block"; 
        descriptionEdit.style.marginBottom = "0.5rem";
        descriptionEdit.style.marginTop = "0.5rem"; 
        descriptionEdit.style.textAlign = "center";

        // Edit description
        const desEdit = document.createElement("input");
        desEdit.type = "textarea";
        desEdit.value = blog.des;
        desEdit.className = "popDes";
        desEdit.style.fontSize = "1rem"; 
        desEdit.style.display = "block"; 
        desEdit.style.marginBottom = "0.5rem"; 
        //desEdit.style.backgroundColor = "white";
        desEdit.style.padding = "10px";
        desEdit.style.borderRadius = "10px";
        desEdit.style.height = "auto";
        desEdit.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        desEdit.style.width = "100%";
        desEdit.style.border = "1px solid #ccc";

        // Close button
        const popClose = document.createElement("button");
        popClose.className = "closePop";
        popClose.textContent = "Close";
        popClose.style.backgroundColor = "#fecaca";
        popClose.style.padding = "15px";
        popClose.style.marginTop = "10px";
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
            editDialog.close();
        })

        // Edit button
        const editSub = document.createElement("button");
        editSub.className = "editPop";
        editSub.textContent = "Edit";
        editSub.style.backgroundColor = "#bbf7d0";
        editSub.style.padding = "15px";
        editSub.style.marginTop = "10px";
        editSub.style.marginLeft = "4px";
        editSub.style.borderRadius = "10px";
        editSub.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";

        editSub.addEventListener("mouseover" , () => {
            editSub.style.backgroundColor = "white";
            editSub.style.cursor = "pointer";
            
        })

        editSub.addEventListener("mouseout" , () => {
            editSub.style.backgroundColor = "#bbf7d0";
            
        })

        editSub.addEventListener("click" , () => {
                
            const resTit =  titleEdit.value;
            const resDes = desEdit.value;
            updateEdit(blog.id , titleEdit.value , desEdit.value);
            addTitle.textContent = resTit
            addDes.textContent = resDes;
            editDialog.close();


            const titleView = document.createElement("p");
            titleView.textContent = blog.title;
            //titleView.textContent = updatedTitle(blog.id);
            titleView.className = "popTitle";
            titleView.style.fontSize = "1.5rem"; 
            titleView.style.display = "block"; 
            titleView.style.marginBottom = "0.5rem"; 
            titleView.style.backgroundColor = "white";
            titleView.style.padding = "10px";
            titleView.style.borderRadius = "10px";
            titleView.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
            
            const desView = document.createElement("input");
            desView.type = "textarea";
            desView.value = blog.des;
            desView.className = "popDes";
            desView.style.fontSize = "1rem";
            desView.style.display = "block"; 
            desView.style.marginBottom = "0.5rem"; 
            desView.style.padding = "10px";
            desView.style.borderRadius = "10px";
            desView.style.height = "auto";
            desView.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
            desView.style.width = "100%";
            desView.style.border = "1px solid #ccc";
            
        })


        editDialog.appendChild(editTitle);
        editDialog.appendChild(titleLabel);
        editDialog.appendChild(titleEdit);
        editDialog.appendChild(descriptionEdit);
        editDialog.appendChild(desEdit);
        editDialog.appendChild(popClose);
        editDialog.appendChild(editSub);
        
        
        editDialog.showModal();

    })

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
    addDelEdit.addEventListener("click" , () => {
        deleteDiv(blog.id , addDiv);
    })

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

function updateEdit(blogId, newTitle, newDescription) {
    const index = storingBlogs.findIndex(blog => blog.id === blogId);
    if (index !== -1) {
        storingBlogs[index].title = newTitle;
        storingBlogs[index].des = newDescription;
        localStorage.setItem("storingBlogs", JSON.stringify(storingBlogs));
    }
}

function deleteDiv(blogId, addDiv) {
    const index = storingBlogs.findIndex(blog => blog.id === blogId);
    if (index !== -1) {
        storingBlogs.splice(index, 1);
        addDiv.remove();
        localStorage.setItem("storingBlogs", JSON.stringify(storingBlogs));
    }
}
