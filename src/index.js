import './styles.css';

const body = document.getElementById('item-list')

const arrayObj = [
 {description: "Feed my dog",
 completed: false,
 index: 0,
 },
 {
  description: "Feed my cat",
 completed: false,
 index: 1,
 },
 {
  description: "Feed my frog",
 completed: false,
 index: 2,
 },
]

const fillList = () => {
 arrayObj.forEach((x)=>{
 let content = `<li>
 <button class="${x.completed}"> 
  <i class="fa-regular fa-square"></i>
 </button>
 <div class="view">
  <label class="label">${x.description}</label>
 </div>
 <button class="${x.index}"> <i class="fa-solid fa-ellipsis-vertical"></i></button>
</li>`;
 body.insertAdjacentHTML("beforeend", content);
})
}

window.addEventListener('DOMContentLoaded', fillList);

