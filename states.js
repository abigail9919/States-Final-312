// CALL THE API TO GET INFORMATION ON ALL 50 STATES (provided by Tressica Mac)
const getStates = () => {
    axios
    .get("https://adv-web-us-state-final-500.uc.r.appspot.com/api/v1/states")
    .then((response) => {
    const states = response.data[0].states;
    stateView(states);
    console.log(`GET States`, states);
    })
    .catch((error) => console.error(error));
};

// FIND STATE USING THE NAME 
const findState = (states, name) => {
    // find the state requested
    count = 0;
    let foundState = "";
    states.forEach(state => {
        if(state["name"] == name) {
            foundState = state;
        } 
        count += 1;
    });
    console.log("FOUND STATE: " + foundState["name"]);
    return foundState;
};

// WRITE STATE INFO TO THE SCREEN, AND CREATE A BOOTSTRAP ACCORDIAN
const stateInfo = (states, name) => {
    // animate so that the US map disappears
    $(".map-wrapper").animate({opacity: '0'}, 'fast');
    $(".search-wrapper").animate({opacity: '0'}, 'fast');
    $(".map-wrapper").empty();
    $(".search-wrapper").empty();

    // find the state requested
    let foundState = findState(states, name);

    // this is just the bootstrap accordian
    let accordian = `<div class="accordion accordion-flush" id="accordionFlushExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          Capital City
        </button>
      </h2>
      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">The capital city of ${foundState["name"]} is ${foundState["capital"]}.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          Land Mass, Population, and Major Industry
        </button>
      </h2>
      <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">With a land mass of ${foundState["landmass"]}, the population of ${foundState["name"]} is ${foundState["population"]}, and the major industries of the state include: ${foundState["majorindustry"]}.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
          Major Tourist Attractions
        </button>
      </h2>
      <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">The major tourist attractions of ${foundState["name"]} include: ${foundState["touristattractions"]}</div>
      </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingFour">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
            Fun Fact
          </button>
        </h2>
        <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">${foundState["funfact"]}</div>
        </div>
      </div>
  </div>`;

    let flagImg = $("<img>").attr("src", foundState.image);
    $(".state-title").append(`<h4>${foundState['name']}</h4>`);
    $(".map-wrapper").append(flagImg);
    $(".search-wrapper").append(accordian);
    $(".map-wrapper").animate({opacity: '1'}, 'fast');
    $(".search-wrapper").animate({opacity: '1'}, 'fast');
};

// GETS A HANDLE FOR THE USER'S INPUT, AND PASSES IT TO stateInfo() FUNCTION
const stateView = (states) => {
    $(".view-btn").on("click", function () {
        let stateName = $("#state-name").val();
        console.log("state: " + stateName);
        stateInfo(states, stateName);
    });
    $(".state-cards").on("click", function () {
        stateCards(states);
    });
};

// creates a little card with every state's name on it
const process = (states) => {
    let allCards = "";
    states.forEach(function (state) {
      let stateCard = `<div class="state-card">${state.name}</div>`;
      allCards += stateCard;
    })
      return allCards;
    };

const stateCards = (states) => {
    // empty out the content to make room for state cards (all 50 states at a glance)
    $(".map-wrapper").animate({opacity: '0'}, 'fast');
    $(".search-wrapper").animate({opacity: '0'}, 'fast');
    $(".quiz").animate({opacity: '0'}, 'fast');
    $(".quiz").empty();
    $(".quiz-title").empty();
    $(".map-wrapper").empty();
    $(".search-wrapper").empty();

    let cards = process(states);
    $(".card-wrapper").html(cards);
};

// CALLS THE API WHEN THE DOCUMENT IS READY
$(document).ready(getStates);