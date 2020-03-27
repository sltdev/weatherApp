const form = document.querySelector('.form');
const search = document.querySelector('.search');
const p1 = document.querySelector('.p1');
const p2 = document.querySelector('.p2');

form.addEventListener('submit', (e)=>{
    p1.textContent = "Checking the weather...";
    const userInput = search.value;
    fetch(`/weather?search=${encodeURIComponent(userInput)}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return p1.textContent = data.error;
            }
            
            p1.textContent = `Today in ${data.destination}, the temperature is ${data.temp}`;
            p2.textContent = `${data.summary}`;
        });
    });
    
    e.preventDefault();
    search.value = '';
});