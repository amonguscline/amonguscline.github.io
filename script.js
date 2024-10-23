var currentNodeI = 0;
let currentNode= document.querySelectorAll(".node-outline")[0];
// console.log("C");
// let inAnimation=false;
let main=document.querySelector("#main");
let text;
const requestUrl="/content.json";
const response = fetch(requestUrl).then(response=> response.json()).then(json=>{
  text=json;
  populateContentDisplays();
  for(var i=0;i<text.length-1;i++){
    let node= document.createElement("div")
    node.classList.add("node");
    let node_outline = document.createElement("div")
    node_outline.classList.add("node-outline");
    node_outline.appendChild(node);
    main.appendChild(node_outline);
  }
});
main.addEventListener("wheel", (event)=> {
  event.preventDefault()
});
main.addEventListener("wheel", (event) => {
  // event.preventDefault()
  
});
// main.addEventListener("scrollend", (event)=> {
  
//   console.log(currentNodeI);
//   currentNode.removeAttribute('id');
//   currentNode.focus({preventScroll:true})
//   currentNode = document.querySelectorAll(".node")[currentNodeI];
//   console.log(currentNode);
//   currentNode.setAttribute('id',"focused");
//   //give element focused
 
//   inAnimation=false;
// });

document.querySelector("#up").onclick=()=>{
  //up
  if(document.querySelector("#down").style.display=="none"){
    document.querySelector("#down").style.display="inline";
  }
  currentNode.removeAttribute('id');
  currentNode= document.querySelectorAll(".node-outline")[--currentNodeI];
  scrollToCurrentnode();
  setTimeout(focusNode, 400);

  if(currentNodeI==0){
    document.querySelector("#up").style.display="none";
  }
};
document.querySelector("#down").onclick=()=>{
  //down
  if(currentNodeI==0){
    document.querySelector("#up").style.display="inline";
  }
  console.log(currentNodeI);
  if(!(currentNodeI==document.querySelectorAll(".node-outline").length-1)){
    
    currentNode.removeAttribute('id');
    currentNode= document.querySelectorAll(".node-outline")[++currentNodeI]; 
    scrollToCurrentnode();
    setTimeout(focusNode, 400)
  }
  if(currentNodeI==document.querySelectorAll(".node-outline").length-1){
    document.querySelector("#down").style.display="none";
  }
  
};

function scrollToCurrentnode(){
  let nodeRect = currentNode.getBoundingClientRect();
  main.scrollTo({top:(window.innerHeight/2+100)*(currentNodeI),
            left:nodeRect.left,
            behavior:"smooth"});
    document.querySelector("#cdrightcover").classList.remove("cdcoveroffscreenright");
    document.querySelector("#cdleftcover").classList.remove("cdcoveroffscreenleft");
    document.querySelector("#vert").style.display="none";
  //change content of contentdisplays
    populateContentDisplays();
    setTimeout(removeCover, 700);
}

function populateContentDisplays(){
  document.querySelector("#leftanchor").innerHTML=text[currentNodeI].left;
  document.querySelector("#cdright").innerHTML=text[currentNodeI].right;  document.querySelector("#leftanchor").setAttribute("href",text[currentNodeI].link);
}

function removeCover(){
  document.querySelector("#cdrightcover").classList.add("cdcoveroffscreenright");
  document.querySelector("#cdleftcover").classList.add("cdcoveroffscreenleft")
}

function focusNode(){
  currentNode.setAttribute('id',"focused");
  setTimeout(showHorizontal,400);
}

function showHorizontal(){
  document.querySelector("#vert").style.display="inline";
}