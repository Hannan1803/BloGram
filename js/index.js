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

function addToPage(blog) {
    // Create the main blog container
    const addDiv = document.createElement("div");
    addDiv.className = "blog bg-white p-4 m-4 rounded-lg flex justify-between gap-2.5 " ;

    // Create the content container
    const addCont = document.createElement("div");
    addCont.className = "content flex flex-col w-fit";

    // Create the options container (for buttons and views)
    const addOptions = document.createElement("div");
    addOptions.className = "options flex flex-row gap-4";

    // Emoji count (views)
    const addEye = document.createElement("div");
    addEye.className = "count_eye";
    addEye.innerHTML = `
        <p class="mt-6">
            👁️${blog.views}
        </p>
    `;

    // View Button
    const addButView = document.createElement("button");
    addButView.className = "view bg-gray-200 px-3 py-2 rounded-lg cursor-pointer shadow-lg hover:bg-white hover:text-black transition-colors";
    addButView.textContent = "View";

    addButView.addEventListener("click", () => {
        blog.views += 1;
        updateViews(blog.id, blog.views);
        addEye.innerHTML = `
            <p class="mt-6">
                👁️${blog.views}
            </p>
        `;

        // Create the view dialog
        const viewDialog = document.createElement("dialog");
        viewDialog.className = "popUp bg-gray-200 p-6 rounded-lg shadow-lg w-3/5 h-[70%] mt-12 mx-auto";

        viewDialog.innerHTML = `
            <div class="bg-white p-5 rounded-lg shadow-lg text-center text-4xl">
                VIEW :
            </div>
            <h1 class="text-2xl block my-2 text-center">Title :</h1>
            <p class="popTitle text-2xl block mb-2 bg-white p-2.5 rounded-lg shadow-lg">
                ${showTitleOnView(blog.id)}
            </p>
            <h1 class="text-2xl block mb-2 text-center">Description :</h1>
            <p class="popDes text-base block mb-2 bg-white p-2.5 rounded-lg shadow-lg">
                ${showDesOnView(blog.id)}
            </p>
            <button class="closePop bg-red-200 px-4 py-3 rounded-lg shadow-lg mt-2.5 mx-auto block hover:bg-white transition-colors hover:cursor-pointer">
                Close
            </button>
        `;

        // Close button functionality
        const popClose = viewDialog.querySelector(".closePop");
        popClose.addEventListener("click", () => {
            viewDialog.close();
        });

        // Append the dialog to the body and show it
        document.body.appendChild(viewDialog);
        viewDialog.showModal();
    });

    // Edit Button
    const addButEdit = document.createElement("button");
    addButEdit.className = "edit bg-green-200 px-3 py-2 rounded-lg cursor-pointer shadow-lg hover:bg-white hover:text-black transition-colors";
    addButEdit.textContent = "Edit";

    addButEdit.addEventListener("click", () => {
        // Create the edit dialog
        const editDialog = document.createElement("dialog");
        editDialog.className = "popUp bg-gray-200 p-6 rounded-lg shadow-lg w-3/5 h-3/4 mt-12 mx-auto";

        editDialog.innerHTML = `
            <div class="bg-white p-5 rounded-lg shadow-lg text-center text-4xl">
                EDIT :
            </div>
            <h1 class="text-2xl block my-2 text-center">Title :</h1>
            <input class="popTitle text-2xl block mb-2 bg-gray-200 p-2.5 rounded-lg shadow-lg w-full border border-gray-300" value="${showTitleOnView(blog.id)}" />
            <h1 class="text-2xl block mb-2 text-center">Description :</h1>
            <textarea class="popDes text-base block mb-2 bg-gray-200 p-2.5 rounded-lg shadow-lg w-full border border-gray-300">${showDesOnView(blog.id)}</textarea>
            <button class="closePop bg-red-200 px-4 py-3 rounded-lg shadow-lg mt-2.5 mx-auto block hover:bg-white transition-colors hover:cursor-pointer">
                Close
            </button>
            <button class="editPop bg-green-200 px-4 py-3 rounded-lg shadow-lg mt-2.5 mx-auto block hover:bg-white transition-colors hover:cursor-pointer">
                Edit
            </button>
        `;

        // Close button functionality
        const popClose = editDialog.querySelector(".closePop");
        popClose.addEventListener("click", () => {
            editDialog.close();
        });

        // Edit button functionality
        const editSub = editDialog.querySelector(".editPop");
        editSub.addEventListener("click", () => {
            const titleEdit = editDialog.querySelector(".popTitle").value;
            const desEdit = editDialog.querySelector(".popDes").value;
            updateEdit(blog.id, titleEdit, desEdit);
            addTitle.textContent = titleEdit;
            addDes.textContent = desEdit;
            editDialog.close();
        });

        // Append the dialog to the body and show it
        document.body.appendChild(editDialog);
        editDialog.showModal();
    });

    // Delete Button
    const addDelEdit = document.createElement("button");
    addDelEdit.className = "delete bg-red-200 px-3 py-2 rounded-lg cursor-pointer shadow-lg hover:bg-white hover:text-black transition-colors";
    addDelEdit.textContent = "Delete";

    addDelEdit.addEventListener("click", () => {
        deleteDiv(blog.id, addDiv);
    });

    // Append buttons and views to options container
    addOptions.appendChild(addEye);
    addOptions.appendChild(addButView);
    addOptions.appendChild(addButEdit);
    addOptions.appendChild(addDelEdit);

    // Create title and description elements
    const addTitle = document.createElement("h1");
    addTitle.className = "title text-4xl leading-10 p-0.5";
    addTitle.textContent = blog.title;

    const addDes = document.createElement("p");
    addDes.className = "des text-base leading-6 p-0.5";
    addDes.textContent = truncateText(blog.des);

    // Append everything to the main container
    parent.appendChild(addDiv);
    addCont.appendChild(addTitle);
    addCont.appendChild(addDes);
    addDiv.appendChild(addCont);
    addDiv.appendChild(addOptions);
}

function truncateText(text) {
    const words = text.split(" ");
    if (words.length > 20) {
        return words.slice(0, 20).join(" ") + "...";
    }
    return text;
}

let storingBlogs= JSON.parse(localStorage.getItem("storingBlogs")) || [];
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
        updateBlogs(index);
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


function updateBlogs(index){
    storingBlogs = JSON.parse(localStorage.getItem("storingBlogs"));
    console.log(storingBlogs);

}

function showTitleOnView(blogId){
    const index = storingBlogs.findIndex(blog => blog.id === blogId);
    if (index !== -1) {
        console.log("Title form func : " , storingBlogs[index].title);
        return storingBlogs[index].title;
    }
}

function showDesOnView(blogId){
    const index = storingBlogs.findIndex(blog => blog.id === blogId);
    if (index !== -1) {
        console.log("Des form func : " , storingBlogs[index].des);
        return storingBlogs[index].des;
    }
}