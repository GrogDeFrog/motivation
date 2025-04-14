document.addEventListener('DOMContentLoaded', function () {
    let localStorageData, parsingData;

    localStorageData = localStorage.getItem('birthdayDate');
    if (localStorageData) {
        renderAgeLoop();
    } else {
        document.getElementById('date-template').style.display = 'block';
    }

    document.getElementById('date-form').addEventListener('submit', function(e) {
        e.preventDefault();
        let dateInput = document.getElementById('date').value;

        if (dateInput) {
            birthDateStr = dateInput;

            document.getElementById('date-template').classList.add('hide');
            document.getElementById('date-template').style.display = 'none';
            document.getElementById('time-template').classList.remove('hide');
            document.getElementById('time-template').style.display = 'block';
        } else {
            alert('Please select a valid date.');
        }
    });
    document.getElementById('time-form').addEventListener('submit', function(e) {
        e.preventDefault();
        let timeInput = document.getElementById('time').value;
        if (timeInput) {
            let birthDateTime = new Date(birthDateStr + 'T' + timeInput);

            localStorage.setItem('birthdayDate', birthDateTime.getTime());
            document.getElementById('time-template').classList.add('hide');
            document.getElementById('time-template').style.display = 'none';

            renderAgeLoop();
        } else {
            alert('Please enter a valid time.');
        }
    });

    function renderAgeLoop() {
        localStorageData = localStorage.getItem('birthdayDate');
        setInterval(function () {
            parsingData = new Date(parseInt(localStorageData));
            let now = new Date();
            let duration = now - parsingData;
            let years = duration / 31556900000; // 1 year in milliseconds

            let majorMinor = years.toFixed(9).toString().split('.');
            document.getElementById('year').textContent = majorMinor[0];
            document.getElementById('milliseconds').textContent = majorMinor[1];
        }, 100);
        document.getElementById('age-template').style.display = 'block';
    }
});
