const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый 
  // - done

  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");

  // TODO: помечать target текущим номером
  // - done

  $(divSelector).text(hits + 1);
      
  // FIXME: тут надо определять при первом клике firstHitTime
  // - done

  if (hits === 1) {
        firstHitTime = getTimestamp();
      }
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  // -done 
  
  $(".game-field").hide();


  let totalScore = hits - miss;
  $("#totalScore").text(totalScore);

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  // - done
  
  $(".game-field").text('');

  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else {
    $(event.target).addClass("miss");
    hits = hits + 1;
    miss = miss + 1;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  // - done
  
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке 
  // - done

  $("#button-start").click(round);
  
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
