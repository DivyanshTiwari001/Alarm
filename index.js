let clk = {}
const addAlarm = () => {
    const almlist = document.querySelector('.alarmList');
    const elem = document.createElement('li');
    elem.innerHTML = `
    <form action="" class="alarmClock">
        <input type="number" id="hourF" max="23" min="0" value="00">
        <input type="number" id="minF" max="59" min="0" value="00">
        <audio src="./alarm.mpeg" id="audio">show Alarm</audio>
    </form>
    <div class='alarm-btn'>
    <button id="set-alarm" onclick="setAlarm(this)">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
    </svg>
    </button>
    <button id="remove-alarm" onclick="removeAlarm(this)">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>
  </button>
  </div>
    `
    almlist.appendChild(elem);
}
function removeAlarm(e) {
    clearInterval(clk[e.parentNode.parentNode])
    e.parentNode.parentNode.children[0].children[2].pause();
    e.parentNode.parentNode.remove();
}
const setAlarm = (e) => {
    const alarmElem = e.parentNode.parentNode.children[0];
    if (e.id == "set-alarm") {
        let hr = parseInt(alarmElem.children[0].value)
        let min = parseInt(alarmElem.children[1].value)
        if (hr > 23 || hr < 0) {
            alarmElem.children[0].value = "00";
            alert("Inappropriate Value");
            return;
        }
        if (min > 59 || min < 0) {
            alarmElem.children[1].value = "00";
            alert("Inappropriate Value");
            return;
        }
        e.id = 'unset-alarm';
        e.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bell-slash-fill" viewBox="0 0 16 16">
        <path d="M5.164 14H15c-1.5-1-2-5.902-2-7 0-.264-.02-.523-.06-.776zm6.288-10.617A4.988 4.988 0 0 0 8.995 2.1a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 7c0 .898-.335 4.342-1.278 6.113l9.73-9.73M10 15a2 2 0 1 1-4 0zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75z"/>
      </svg>`
        alarmElem.children[0].disabled = true;
        alarmElem.children[1].disabled = true;
        clk[e.parentNode.parentNode] = setInterval(() => {
            const date = new Date();
            if (alarmElem.children[0].value == date.getHours() && alarmElem.children[1].value == date.getMinutes()) {
                alarmElem.children[2].play();
            }
        }, 1000)
    }
    else if (e.id == 'unset-alarm') {
        alarmElem.children[0].disabled = false;
        alarmElem.children[1].disabled = false;
        clearInterval(clk[e.parentNode.parentNode]);
        alarmElem.children[2].pause();
        e.id = 'set-alarm';
        e.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
        </svg>`
    }
}