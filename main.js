

const input = document.querySelector(".inputItem");
const submitBtn = document.querySelector(".submit");
const itemBody = document.querySelector(".itemBody");

const itemList = getDataTostorage()

submitBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    getInputFromUser(e)
    itemBody.innerHTML = ''
    showDataToUi(itemList)
})

function getInputFromUser(e){
    if(input.value === ""){
        alert("Please fill the necessary input")
    }else{
        if(e.target.classList.contains("submit")){
            const items = {
                id: Date.now(),
                item: input.value,
                time: itemCreatedTime()
            }
            itemList.push(items)
            saveDataToStorage(items)
        }else{
            editedItem(e)
        }
    }
    input.value = ""
}

function editedItem(e){
    const id = Number(e.target.id)
    const item = input.value
    const time = itemCreatedTime()
    const updatedItem = {
        id,
        item,
        time
    }
    submitBtn.innerHTML = "Submit"
    updateToStorage(updatedItem)
    displayData(updatedItem)
    showDataToUi(itemList)
}

function itemCreatedTime(){
    const dateTime = new Date()
    let hour = dateTime.getHours()
    let minutes = dateTime.getMinutes()
    hour = (hour < 10) ? "0" + hour : hour
    minutes = (minutes < 10) ? "0" + minutes : minutes
    formatedHour = (hour > 12) ? hour - 12 : hour
    formatedMinutes = (hour < 12) ? minutes + " AM" : minutes + " PM"
    const formattedTime = `${formatedHour}:${formatedMinutes}`
    return formattedTime
}

function showDataToUi(data){
    if(data.length > 0){
        for(let i = 0; i < data.length; i++){
            displayData(data[i])
        }
    }
}
showDataToUi(itemList)

function displayData(data){
        itemBody.innerHTML += `
        <div id=${data.id} class="displayItems">
            <p class="items">${data.item}</p>
            <div class="createdTiem">
                <p class="time">${data.time}</p>
            </div>
            <div class="actions">
                <button id=${data.id} class="edit">Edit</button>
                <button id=${data.id} class="delete">Delete</button>
            </div>
        </div>`
}

function saveDataToStorage(profile){
    let data;
    if(localStorage.getItem("data")){
        data = JSON.parse(localStorage.getItem("data"))
    }else{
        data = []
    }
    data.push(profile)
    localStorage.setItem("data", JSON.stringify(data))
}

itemBody.addEventListener("click", (e)=>{
    const id = Number(e.target.id)
    if(e.target.className === "delete"){
        e.target.parentElement.parentElement.remove()
        removeItemFromStrorage(id)
    }
})

function removeItemFromStrorage(id){
    const items = JSON.parse(localStorage.getItem("data"))
    let result = items.filter(item => {
        return item.id !== id
    })
    localStorage.setItem("data", JSON.stringify(result))
}

function getDataTostorage(){
    let data;
    if(localStorage.getItem("data")){
        data = JSON.parse(localStorage.getItem("data"))
    }else{
        data = []
    }
    return data
}

itemBody.addEventListener("click", (e)=>{
    if(e.target.classList.contains("edit")){
        submitBtn.className = "editItem"
        submitBtn.textContent = "Update"
        submitBtn.id = Number(e.target.id)
        input.value = e.target.parentElement.parentElement.children[0].innerHTML
    }
})

function updateToStorage(data){
    let arr = JSON.parse(localStorage.getItem("data"))
    let index = arr.findIndex(object => object.id == data.id)
    arr[index].id = Number(data.id);
    arr[index].item = data.item;
    arr[index].time = data.time;
    localStorage.setItem("data", JSON.stringify(arr))
}

