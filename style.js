document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.container');
  const seats = document.querySelectorAll('.row .seat');
  const count = document.getElementById('count');
  const total = document.getElementById('total');
  const movieSelect = document.getElementById('floor');

  populateUI();
  document.querySelectorAll("*").forEach(e => { e.style["touch-action"] = "manipulation" });

  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      for (let node of mutation.addedNodes) {
        if (node.style) {
          node.style["touch-action"] = "manipulation";
        }
      }
    });
  }).observe(document.body, { childList: true, subtree: true });

  function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
  }

  function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const occupiedSeats = document.querySelectorAll('.row .seat.occupied');

    const selectedSeatsIndex = Array.from(selectedSeats, seat => Array.from(seats).indexOf(seat));
    const occupiedSeatsIndex = Array.from(occupiedSeats, seat => Array.from(seats).indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
    localStorage.setItem('occupiedSeats', JSON.stringify(occupiedSeatsIndex));

    // const selectedSeatsCount = selectedSeats.length;

    // count.innerText = selectedSeatsCount;
    // total.innerText = selectedSeatsCount * ticketPrice;
  }

  function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats'));

    if (selectedSeats) {
      selectedSeats.forEach(index => {
        if (seats[index]) seats[index].classList.add('selected');
      });
    }

    if (occupiedSeats) {
      occupiedSeats.forEach(index => {
        if (seats[index]) seats[index].classList.add('occupied');
      });
    }

    // const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    // if (selectedMovieIndex !== null) {
    //   movieSelect.selectedIndex = selectedMovieIndex;
    // }
  }

  // movieSelect.addEventListener('change', (e) => {
  //   ticketPrice = +e.target.value;
  //   setMovieData(e.target.selectedIndex, e.target.value);
  //   updateSelectedCount();
  // });

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('wall')) {
      if (e.target.classList.contains('selected')) {
        e.target.classList.remove('selected');
        e.target.classList.add('occupied');
      } else if (e.target.classList.contains('occupied')) {
        e.target.classList.remove('occupied');
        e.target.classList.add('seat');
      } else {
        e.target.classList.add('selected');
      }

      updateSelectedCount();
    }
  });

  window.onload = function() {
    const script = document.createElement("script");
    script.src = "style.js";
    document.body.appendChild(script);
  };

  updateSelectedCount();
});
