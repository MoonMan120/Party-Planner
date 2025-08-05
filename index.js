const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2507-Andre"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// STATE
let party = [];
let selectedParty;

async function getAllParties() {
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2507-Andre/events`
    );
    const result = await response.json();
    party = result.data;
  } catch (error) {
    console.error(error);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

function partyListItem(parties) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected">${party.name}</a>
  `;
  $li.addEventListener("click", () => getParty(party.id));
  return $li;
}

function partyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const partyItem = party.map(partyListItem);
  $ul.replaceChildren(...partyItem);
  return $ul;
}

function partyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Select a party to learn more.";
    return $p;
  }
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
    <section>
    <h2>Upcoming Parties</h2>
    <partyList></partyList>
    </section>
    <section id="selected">
    <h2>Party Details</h2>
        <partyDetails"></partyDetails>
    </section>
    </main> 
  `;
  $app.querySelector("partyList").replaceWith(partyList());
  $app.querySelector("partyDetails").replaceWith(partyDetails());
}

async function init() {
  await getAllParties();
  render();
}

init();
