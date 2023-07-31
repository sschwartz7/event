const events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
},
];

function getEvents() {
    return events;
}

function buildDropdown() {
    let currentEvents = getEvents();

    let eventCities = currentEvents.map(event => event.city);//for each event return event.city
    let distinctCities = new Set(eventCities);//chooses unique cities
    let dropdownChoices = ['All', ...distinctCities];//spread operator takes a set and adds each item in array

    const dropdownDiv = document.getElementById('city-dropdown');
    const dropdownTemplate = document.getElementById('dropdown-template');

    dropdownChoices.forEach(choice => {
        let dropdownItemCopy = dropdownTemplate.content.cloneNode(true);
        let aTag = dropdownItemCopy.querySelector('a')
        aTag.innerText = choice;
        dropdownDiv.appendChild(dropdownItemCopy);
    });
    displayEvents(currentEvents);
    displayStats(currentEvents);
}

function displayEvents(events) {
    //find table on page
    const eventsTable = document.getElementById('events-table');
    //find table row template
    const eventTemplate = document.getElementById('table-row-template');
    //clear out table
    eventsTable.innerHTML = '';

    for (let index = 0; index < events.length; index++) {
        //get one event
        let event = events[index];
        //clone template
        let tableRow = eventTemplate.content.cloneNode(true);
        //get each property of an event and insert each property into the cloned template
        tableRow.querySelector('[data-id="event"]').innerText = event.event;
        tableRow.querySelector('[data-id="city"]').innerText = event.city;
        tableRow.querySelector('[data-id="state"]').innerText = event.state;
        tableRow.querySelector('[data-id="attendance"]').innerText = event.attendance;
        tableRow.querySelector('[data-id="date"]').innerText = event.date;
        //insert the event data into the table
        eventsTable.appendChild(tableRow);

        //Object.keys(event).forEach(key =>) ====== can turn above into a one liner
    }
}

function displayStats(events) {
    let total = 0;
    let high = 0;
    let low = events[0].attendance;
    for (let x = 0; x < events.length; x++) {
        let event = events[x];
        total += event.attendance;
        if (event.attendance < low) {
            low = event.attendance;
        }
        if (event.attendance > high) {
            high = event.attendance;
        }
    }
    document.getElementById('total').innerHTML = total.toLocaleString();
    let avg = total / events.length;
    document.getElementById('average').innerHTML = Math.round(avg).toLocaleString();
    document.getElementById('min').innerText = low.toLocaleString();
    document.getElementById('max').innerText = high.toLocaleString();
}
