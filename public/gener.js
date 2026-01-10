document.querySelector('.middlebody').addEventListener('click',(e)=>{
    const generdivs = e.target.closest('.generdivs');
    if(!generdivs) return;
    const gener = generdivs.dataset.gener;
    window.location.href = `/gener/${gener}`
})