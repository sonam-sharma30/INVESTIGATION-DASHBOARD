let board = document.getElementById("board")
let svg = document.getElementById("connections")

let selected=null
let connectStart=null
let zoom=1

function createTextNode(){

let text=prompt("Enter text")

if(!text) return

let node=document.createElement("div")

node.className="node"
node.innerText=text
node.style.left="400px"
node.style.top="400px"
node.dataset.id=Math.random()

board.appendChild(node)

enableDrag(node)

}

function createImageNode(){

let url=prompt("Image URL")

if(!url) return

let node=document.createElement("div")

node.className="node"

let img=document.createElement("img")
img.src=url

node.appendChild(img)

node.style.left="400px"
node.style.top="400px"

node.dataset.id=Math.random()

board.appendChild(node)

enableDrag(node)

}

function enableDrag(el){

let offsetX,offsetY

el.onmousedown=function(e){

selected=el

offsetX=e.offsetX
offsetY=e.offsetY

document.onmousemove=function(e){

el.style.left=(e.pageX-offsetX)+"px"
el.style.top=(e.pageY-offsetY)+"px"

updateLines()

}

document.onmouseup=function(){

document.onmousemove=null

}

}

el.onclick=function(e){

e.stopPropagation()

if(connectStart==null){

connectStart=el

}else{

createLine(connectStart,el)
connectStart=null

}

}

}

function createLine(a,b){

let line=document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("stroke","red")
line.setAttribute("stroke-width","3")

svg.appendChild(line)

line.dataset.a=a.dataset.id
line.dataset.b=b.dataset.id

animateLine(line)

updateLines()

}

function animateLine(line){

let dash=0

setInterval(()=>{

dash+=2
line.style.strokeDasharray="6"
line.style.strokeDashoffset=dash

},40)

}

function updateLines(){

let all=svg.querySelectorAll("line")

all.forEach(line=>{

let a=document.querySelector(`[data-id="${line.dataset.a}"]`)
let b=document.querySelector(`[data-id="${line.dataset.b}"]`)

if(!a||!b) return

let ax=a.offsetLeft+a.offsetWidth/2
let ay=a.offsetTop+a.offsetHeight/2

let bx=b.offsetLeft+b.offsetWidth/2
let by=b.offsetTop+b.offsetHeight/2

line.setAttribute("x1",ax)
line.setAttribute("y1",ay)

line.setAttribute("x2",bx)
line.setAttribute("y2",by)

})

}

function connectMode(){

alert("Click node A then node B")

connectStart=null

}

function deleteNode(){

if(selected){

selected.remove()

updateLines()

}

}

function duplicateNode(){

if(!selected) return

let clone=selected.cloneNode(true)

clone.style.left=parseInt(selected.style.left)+50+"px"
clone.style.top=parseInt(selected.style.top)+50+"px"

board.appendChild(clone)

enableDrag(clone)

}

function toggleGrid(){

if(board.style.backgroundImage){

board.style.backgroundImage=""

}else{

board.style.backgroundImage=
"linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg,#ccc 1px, transparent 1px)"

board.style.backgroundSize="40px 40px"

}

}

function zoomIn(){

zoom+=0.1
board.style.transform="scale("+zoom+")"

}

function zoomOut(){

zoom-=0.1
board.style.transform="scale("+zoom+")"

}

function changeBoardColor(){

let c=prompt("Board color")

board.style.background=c

}

function saveBoard(){

localStorage.setItem("board",board.innerHTML)

alert("Saved")

}

window.onload=function(){

let saved=localStorage.getItem("board")

if(saved) board.innerHTML=saved

}

function exportBoard(){

html2canvas(board).then(canvas=>{

let link=document.createElement("a")

link.download="board.png"
link.href=canvas.toDataURL()

link.click()

})

}
