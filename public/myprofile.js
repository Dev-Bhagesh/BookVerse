const editBtn = document.getElementById("editProfileBtn");
const editModal = document.getElementById("editProfileModal");
const closeBtn = document.getElementById("closeEditModal");
const submitbtn = document.getElementById("biosubmitbtn");
const username = document.getElementById("editUsername").value;
const bioinput = document.getElementById("editBio").value;
// Open modal
editBtn.addEventListener("click", () => {
  editModal.style.display = "block";
});

// Close modal
closeBtn.addEventListener("click", () => {
  editModal.style.display = "none";
});

// Close if clicked outside modal content
window.addEventListener("click", (e) => {
  if (e.target === editModal) {
    editModal.style.display = "none";
  }
});

submitbtn.addEventListener("click",()=>{
    fetch('/editbio',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:"include",
      body:JSON.stringify({username,bioinput})
    }).then(res=>res.json()).then(res=>{
      alert(res.message)
    }).catch(err=>{
      console.log(err)
    })
})