let search = document.getElementById("midsearch")
search.addEventListener('keydown',(e)=>{
    if(e.key==="Enter"){
        e.preventDefault() 
        const value = e.target.value;
        window.location.href = `/search/${value}`
    }
})