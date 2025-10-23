// Set default variable values

// Get Deck Count from Segmented Controller

function deckCount1() {
  var deckCount = 1;
}

function deckCount2() {
  var deckCount = 2;
}

function deckCount3() {
  var deckCount = 3;
}

function deckCount4() {
  var deckCount = 4;
}

function deckCount5() {
  var deckCount = 5;
}

function deckCount6() {
  var deckCount = 6;
}

function deckCount7() {
  var deckCount = 7;
}

function deckCount8() {
  var deckCount = 8;
}

// NEW: Override the calc_true_count function to always use 2 decimals
window.calc_true_count = function(deck, count) {
    var cal_value = parseInt(count, 10) / parseInt(deck, 10);
    console.log("Calculating true count:", count + " / " + deck + " = " + cal_value.toFixed(2));
    return cal_value.toFixed(2);
}

function calc_bet_amt(true_count) {
  var bet_amt = "Bet 1x";
  if (true_count < 2) {
    bet_amt = "Bet 1x";
  }
  if (true_count >= 2 && true_count < 4) {
    bet_amt = "Bet 2x";
  } else if (true_count >= 4 && true_count < 6) {
    bet_amt = "Bet 3x";
  } else if (true_count >= 6 && true_count < 8) {
    bet_amt = "Bet 4x";
  } else if (true_count >= 8) {
    bet_amt = "Bet 5x";
  }
  $("#bet").html(bet_amt);
}

$(function() {
  var deckCount = 8;
  var count = 0;

  // User Clicks 10-A The Running Count Goes Down by 1
  $(".decreaseCount").click(function() {
    count = parseInt($("#runningCount").text());
    $("#runningCount").text(count - 1);
    count = parseInt($("#runningCount").text());
    var trueCount = calc_true_count(deckCount, count);
    $("#trueCount").html(trueCount);
    calc_bet_amt(parseFloat(trueCount));
  });

  // User Clicks 2-6 The Running Count Goes Up by 1
  $(".increaseCount").click(function() {
    count = parseInt($("#runningCount").text());
    $("#runningCount").text(count + 1);
    count = parseInt($("#runningCount").text());
    var trueCount = calc_true_count(deckCount, count);
    $("#trueCount").html(trueCount);
    calc_bet_amt(parseFloat(trueCount));
  });

  // User Clicks 7-9 The Running Count Doesn"t Change
  $(".noCount").click(function() {
    count = parseInt($("#runningCount").text());
    $("#runningCount").text(count);
    count = parseInt($("#runningCount").text());
    var trueCount = calc_true_count(deckCount, count);
    $("#trueCount").html(trueCount);
    calc_bet_amt(parseFloat(trueCount));
  });

  $(".segmented-control__input").click(function() {
    deckCount = $('input[name=option]:checked').val();
    count = parseInt($("#runningCount").text());
    var trueCount = calc_true_count(deckCount, count);
    $("#trueCount").html(trueCount);
    calc_bet_amt(parseFloat(trueCount));
  });
});

// Reset All Values to their Defaults
function resetValues() {
  $("#runningCount").text("0");
  $("#trueCount").text("0.00");
  $("#bet").text("Bet 1x");
  $("input[name=option]").filter("[value='8']").prop("checked", true);
}

// Add keyboard event listener for numpad
$(document).keydown(function(e) {
    // Check if key is from numpad (including with NumLock off)
    var key = e.which;
    
    // Numpad keys: 0-9 (96-105), also support regular number keys (48-57)
    if ((key >= 96 && key <= 105) || (key >= 48 && key <= 57)) {
        e.preventDefault();
        
        var actualNumber = key >= 96 ? key - 96 : key - 48;
        
        if (actualNumber === 0) {
            // Numpad 0 = 10-A (decrease count)
            $(".decreaseCount").first().click();
        } else if (actualNumber >= 2 && actualNumber <= 6) {
            // Numpad 2-6 = increase count
            $(".increaseCount").first().click();
        } else if (actualNumber >= 7 && actualNumber <= 9) {
            // Numpad 7-9 = no count change
            $(".noCount").first().click();
        }
        // Number 1 is not used in card counting system
    }
});
