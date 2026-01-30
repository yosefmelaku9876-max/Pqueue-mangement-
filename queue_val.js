/* File Name: queue-manager.js */

// Core Data (Stored in LocalStorage)
let patients = JSON.parse(localStorage.getItem('patientList')) || [];

const regForm = document.getElementById('regForm');
if(regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const category = document.getElementById('category').value;
        const name = document.getElementById('fname').value;
        const prefix = (category === "Emergency") ? "E-" : "N-";
        const token = prefix + Math.floor(100 + Math.random() * 900);

        patients.push({ token, name, category, status: 'Waiting', time: Date.now() });
        saveAndRender();
        
        document.getElementById('tokenOutput').innerHTML = `
            <div class="display-box" style="margin-top:20px; border-color: green;">
                <h3>Registration Successful!</h3>
                <p>Your Token is: <b>${token}</b></p>
            </div>`;
        regForm.reset();
    });
}

function saveAndRender() {
    // SORTING TRIAGE LOGIC:
    // 1. Emergency patients jump to top.
    // 2. Then sort by registration time.
    patients.sort((a, b) => {
        if (a.category === b.category) return a.time - b.time;
        return a.category === "Emergency" ? -1 : 1;
    });

    localStorage.setItem('patientList', JSON.stringify(patients));
    renderQueue();
}

function renderQueue() {
    const listBody = document.getElementById('queueListBody');
    if(!listBody) return;

    listBody.innerHTML = '';
    const waiting = patients.filter(p => p.status === 'Waiting');

    // Update Top Display
    const current = patients.find(p => p.status === 'Serving');
    document.getElementById('servingNo').innerText = current ? current.token : "---";
    document.getElementById('nextNo').innerText = waiting[0] ? waiting[0].token : "None";

    // Build Table
    patients.forEach(p => {
        const row = document.createElement('tr');
        if(p.category === 'Emergency') row.className = 'emerg-row';
        row.innerHTML = `
            <td>${p.token}</td>
            <td>${p.name}</td>
            <td><span class="badge ${p.category === 'Emergency' ? 'badge-emerg' : 'badge-normal'}">${p.category}</span></td>
            <td>${p.status}</td>`;
        listBody.appendChild(row);
    });
}

window.callNextPatient = function() {
    // Mark serving as completed
    const servingIdx = patients.findIndex(p => p.status === 'Serving');
    if(servingIdx !== -1) patients.splice(servingIdx, 1);

    // Get next waiting patient
    const nextIdx = patients.findIndex(p => p.status === 'Waiting');
    if(nextIdx !== -1) patients[nextIdx].status = 'Serving';
    
    saveAndRender();
}

renderQueue();