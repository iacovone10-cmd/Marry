const seal = document.getElementById("seal");
const envelope = document.getElementById("envelope");
const openDetails = document.getElementById("openDetails");

let opened = false;

seal.addEventListener("click", () => {
  if(opened) return;
  opened = true;
  envelope.classList.add("open");

  setTimeout(()=>{
    document.body.classList.remove("locked");
  },1200);
});

openDetails.addEventListener("click", ()=>{
  document.querySelector(".details").scrollIntoView({behavior:"smooth"});
}); 


