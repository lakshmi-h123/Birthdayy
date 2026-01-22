const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

const countdownContainer = document.getElementById('countdown-container');
const birthdayMessage = document.getElementById('birthday-message');
const messageButton = document.getElementById('message-button');
const clickButton = document.getElementById('click-button');

const messageCard = document.getElementById('message-card');
const closeCard = document.getElementById('close-card');

const clickCard = document.getElementById('click-card');
const closeClickCard = document.getElementById('close-click-card');

const confettiContainer = document.getElementById('confetti-container');
const decorationsContainer = document.getElementById('decorations-container');
const heartsContainer = document.getElementById('hearts-container');
const birthdayText = document.getElementById('birthday-text');

const targetDate = new Date("2026-01-22T14:45:45").getTime();

/* Countdown */
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if(distance < 0){
        clearInterval(countdownInterval);
        countdownContainer.classList.add('hidden');
        birthdayMessage.classList.remove('hidden');

        createConfetti(); // first
        createConfetti(); // second
        createDecorations();
        createHearts();
        animateBirthdayText("Happy Birthday My Love ❤️🫂");
        return;
    }

    daysSpan.innerText = Math.floor(distance / (1000*60*60*24));
    hoursSpan.innerText = Math.floor((distance / (1000*60*60)) % 24);
    minutesSpan.innerText = Math.floor((distance / (1000*60)) % 60);
    secondsSpan.innerText = Math.floor((distance / 1000) % 60);
}, 1000);

/* Confetti */
function createConfetti(){
    const colors = ['#ff4d6d','#ffb84d','#4dffb8','#6d4dff','#ffd24d'];
    for(let i=0;i<50;i++){
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random()*100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        confetti.style.animationDelay = (i*0.03)+'s';
        confettiContainer.appendChild(confetti);
        confetti.addEventListener('animationend', ()=> confetti.remove());
    }
}

/* Decorations */
function createDecorations(){
    const colors = ['red','blue','yellow'];
    for(let i=0;i<10;i++){
        const balloon = document.createElement('div');
        balloon.classList.add('balloon', colors[i%3]);
        balloon.style.left = Math.random()*100 + '%';
        balloon.style.bottom = '-50px';
        balloon.style.animationDuration = (4+Math.random()*2)+'s';
        balloon.style.animationTimingFunction = 'ease-in-out';
        decorationsContainer.appendChild(balloon);
        balloon.addEventListener('animationend', ()=> balloon.remove());
    }

    for(let i=0;i<10;i++){
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random()*100 + '%';
        star.style.bottom = '-50px';
        star.style.animationDuration = (4+Math.random()*2)+'s';
        decorationsContainer.appendChild(star);
        star.addEventListener('animationend', ()=> star.remove());
    }
}

/* Hearts inside message card */
function createHearts(){
    for(let i=0;i<20;i++){
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random()*90 + '%';
        heart.style.animationDuration = (3 + Math.random()*2)+'s';
        heartsContainer.appendChild(heart);
        heart.addEventListener('animationend', ()=> heart.remove());
    }
}

/* Hearts inside click card */
function createClickHearts(){
    const clickHeartsContainer = document.getElementById('click-hearts-container');
    for(let i=0;i<15;i++){
        const heart = document.createElement('div');
        heart.classList.add('click-heart');
        heart.style.left = Math.random()*90 + '%';
        heart.style.animationDuration = (3 + Math.random()*2)+'s';
        clickHeartsContainer.appendChild(heart);
        heart.addEventListener('animationend', ()=> heart.remove());
    }
}

/* Sequential Happy Birthday text */
function animateBirthdayText(text){
    birthdayText.innerHTML = '';
    let i=0;
    const interval = setInterval(()=>{
        birthdayText.innerHTML += text[i];
        i++;
        if(i>=text.length) clearInterval(interval);
    },150);
}

/* Open message card */
messageButton.addEventListener('click', ()=>{
    messageCard.classList.remove('hidden');
    setTimeout(()=> messageCard.classList.add('show'),10);
    birthdayMessage.classList.add('blur-happy');
});

/* Close message card */
closeCard.addEventListener('click', ()=>{
    messageCard.classList.remove('show');
    setTimeout(()=> messageCard.classList.add('hidden'),800);
    birthdayMessage.classList.remove('blur-happy');
});

/* Click Here card */
clickButton.addEventListener('click', ()=>{
    clickCard.classList.remove('hidden');
    setTimeout(()=> clickCard.classList.add('show'),10);
    birthdayMessage.classList.add('blur-happy');
    createClickHearts();
});

/* Close click card */
closeClickCard.addEventListener('click', ()=>{
    clickCard.classList.remove('show');
    setTimeout(()=> clickCard.classList.add('hidden'),800);
    birthdayMessage.classList.remove('blur-happy');
});

/* Apply aesthetic & bigger styles to countdown */
document.querySelectorAll('.time-box').forEach(box => {
    box.classList.add('time-box-aesthetic');
});

countdownContainer.classList.add('countdown-big');

/* Continuous confetti while Happy Birthday text types & blur on card open */
function animateBirthdayText(text){
    birthdayText.innerHTML = '';
    let i = 0;

    // Start continuous confetti
    const confettiInterval = setInterval(() => {
        createConfetti();
    }, 500); // confetti every 0.5s

    const interval = setInterval(()=>{
        birthdayText.innerHTML += text[i];
        i++;
        if(i >= text.length){
            clearInterval(interval);
            clearInterval(confettiInterval); // stop confetti
        }
    },150);
}

/* Blur happy birthday when cards open */
messageButton.addEventListener('click', ()=>{
    birthdayMessage.classList.add('blur-background');
    messageCard.classList.remove('hidden');
    setTimeout(()=> messageCard.classList.add('show'),10);
});
clickButton.addEventListener('click', ()=>{
    birthdayMessage.classList.add('blur-background');
    clickCard.classList.remove('hidden');
    setTimeout(()=> clickCard.classList.add('show'),10);
});

/* Remove blur on close */
closeCard.addEventListener('click', ()=>{
    messageCard.classList.remove('show');
    setTimeout(()=> messageCard.classList.add('hidden'),800);
    birthdayMessage.classList.remove('blur-background');
});
closeClickCard.addEventListener('click', ()=>{
    clickCard.classList.remove('show');
    setTimeout(()=> clickCard.classList.add('hidden'),800);
    birthdayMessage.classList.remove('blur-background');
});

/* Hearts for click card */
function createHeartsClick(){
    const container = document.getElementById('click-hearts-container');
    for(let i=0;i<15;i++){
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random()*90 + '%';
        heart.style.animationDuration = (3 + Math.random()*2)+'s';
        container.appendChild(heart);
        heart.addEventListener('animationend', ()=> heart.remove());
    }
}
// call hearts for click card when opened
clickButton.addEventListener('click', ()=> createHeartsClick());


