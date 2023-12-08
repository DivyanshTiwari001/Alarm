let clk = {}
const day = ['mon','tue','wed','thu','fri','sat','sun']
let day_selected = {};
const addAlarm = () => {
    const almlist = document.querySelector('.alarmList');
    const elem = document.createElement('li');
    elem.innerHTML = `
    <form action="" class="alarmClock"  id=${"id" + Math.random().toString(16).slice(2)}>
        <input type="number" id="hourF" max="23" min="0" value="00">
        <input type="number" id="minF" max="59" min="0" value="00">
        <audio src="./alarm.mpeg" id="audio">show Alarm</audio>
        <div class="days">
        <div class="day-info">
        <label for="sun">sun</label>
        <input type="checkbox" name="sun" id="sun" class="day">
        </div>
        <div class="day-info">
        <label for="mon">mon</label>
        <input type="checkbox" name="mon" id="mon"  class="day">
        </div>
        <div class="day-info">
        <label for="tue">tue</label>
        <input type="checkbox" name="tue" id="tue"  class="day">
        </div>
        <div class="day-info">
        <label for="wed">wed</label>
        <input type="checkbox" name="wed" id="wed"  class="day">
        </div>
        <div class="day-info">
        <label for="thu">thu</label>
        <input type="checkbox" name="thu" id="thu"  class="day">
        </div>
        <div class="day-info">
        <label for="fri">fri</label>
        <input type="checkbox" name="fri" id="fri"  class="day">
        </div>
        <div class="day-info">
        <label for="sat">sat</label>
        <input type="checkbox" name="sat" id="sat"  class="day">
        </div>
        </div>
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
    clearInterval(clk[e.parentNode.parentNode.children[0].id])
    delete(clk[e.parentNode.parentNode.children[0].id])
    delete(day_selected[e.parentNode.parentNode.children[0].id]);
    e.parentNode.parentNode.children[0].children[2].pause();
    e.parentNode.parentNode.remove();
}
const setAlarm = (e) => {
    const alarmElem = e.parentNode.parentNode.children[0];
    if (e.id == "set-alarm") {
        const day_arr = alarmElem.children[3];
        const sel_day = [];
        for(let i=0;i<7;i++){
            if(day_arr.children[i].children[1].checked){
                sel_day.push(day_arr.children[i].children[1].name);
            }
        }
        day_selected[e.parentNode.parentNode.children[0].id]=sel_day;
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
        clk[e.parentNode.parentNode.children[0].id] = setInterval(() => {
            const date = new Date();
            if (alarmElem.children[0].value == date.getHours() && alarmElem.children[1].value == date.getMinutes() && day_selected[e.parentNode.parentNode.children[0].id].includes(day[date.getDay()-1])) {
                alarmElem.children[2].play();
            }
            else{
                alarmElem.children[2].pause();
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