
$(".logo").dblclick(function () {
  // document.documentElement.requestFullscreen();
  var step1 = 1;
  var step3 = 0;
  setInterval(function () {
    if ($(".logo").css("opacity") >= "0") {
      step1 -= 0.04;
      $(".logo").css("opacity", `${step1}`);
    }
    if ($(".logo").css("opacity") <= "0") {
      step3 += 0.03;
      $(".main").css("opacity", `${step3}`);
      $(".appbar").css("opacity", `${step3}`);
    }
    setTimeout(function () {
      $(".logo").css("display", "none");
    }, 1000);
  }, 30);
});

$(".fa-chevron-down").click(function () {
  $(this).toggleClass("rotate");
});

$(".fa-chevron-down").click(function () {
  $(this).parent().closest("div").siblings(".middle").toggleClass("hidden");
  $(this).parent().closest("div").siblings(".middle").slideToggle(400);
});

function setData(name) {
  let day = (now.getDay() - 1) % 7;
  fetch("./timetables/" + name + ".json")
    .then((response) => response.json())
    .then((json) => writeData(name, json[day]));
}

function createTimeString(timings) {
  let timeString = "";
  if (timings.length > 0) {
    timeString += timings[0].toString().padStart(2, "0") + ":";
    timeString += timings[1].toString().padStart(2, "0") + "-";
    timeString += timings[2].toString().padStart(2, "0") + ":";
    timeString += timings[3].toString().padStart(2, "0");
  }
  return timeString;
}

function writeData(name, periodsToday) {
  console.log("processing " + name + "...");
  var period = {
    title: "No more today, enjoy!",
    venue: "",
    timings: [],
  };

  var color = "to-be-busy";
  // Find ongoing period
  for (var i = periodsToday.length - 1; i >= 0; i--) {
    let current_period = periodsToday[i];
    let timings = current_period["timings"];

    let start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      timings[0],
      timings[1],
      0
    );
    let end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      timings[2],
      timings[3],
      0
    );

    if (end > now) {
      if (start <= now) {
        color = "busy";
      }
      period = current_period;
    } else {
      break;
    }
  }

  const card = $("." + name);

  // Set class title
  card.find(".subName")[0].innerHTML = period["title"];

  // Set class timings
  card.find(".time")[0].innerHTML = createTimeString(period["timings"]);

  // Set class location
  card.find(".location")[0].innerHTML = period["venue"];

  // Set upcoming classes
  var table = card.find("table")[0];
  for (i += 2; i < periodsToday.length; i++) {
    next_period = periodsToday[i];
    table.innerHTML += `<tr>
      <td>${createTimeString(next_period["timings"])}</td>
      <td>${next_period["venue"]}</td>
      <td>${next_period["title"]}</td>
    </tr>`;
  }

  // Change color and visibilities
  if (period["timings"].length == 0) {
    color = "free";
    card.find(".avatar").css("border", `3px dashed var(--${color})`);
    card.find(".bottom").find("i").css("visibility", "hidden");
    card.find(".timeloc").css("display", "none");
    card.find(".subName").css("display", "none");
    card.find(".right").css("display", "none");
    card.find(".bottom").css("display", "none");
    card.find(".currentBox").css("border-bottom", "3px solid var(--accent)");
    card.find(".currentBox").css("border-bottom-right-radius", "20px");
  } else {
    card.find(".bottom").find("i").css("visibility", "visible");
    card.find(".timeloc").css("display", "");
    card.find(".subName").css("display", "");
    card.find(".right").css("display", "");
    card.find(".bottom").css("display", "");
    card.find(".currentBox").css("border-bottom", "none");
    card.find(".currentBox").css("border-bottom-right-radius", "0");
  }
  card.find(".avatar").css("border", `3px dashed var(--${color})`);
  card.find(".right").css("border", `3px solid var(--${color})`);
  card.find(".subName").css("border-right", `3px solid var(--${color})`);
  card.find(".subName").css("border-bottom", `3px solid var(--${color})`);
  card.find(".subName").css("border-left", `3px solid var(--${color})`);
  card.find(".subName").css("color", `var(--${color})`);
  card.find(".timeloc").css("color", `var(--${color})`);
  card.find(".time").css("color", `var(--${color})`);
  card.find(".time").css("border-right", `3px solid var(--${color})`);
  card.find(".time").css("border-bottom", `3px solid var(--${color})`);
  card.find(".time").css("border-top", `3px solid var(--${color})`);
  card.find(".location").css("color", `var(--${color})`);
  card.find(".location").css("border-left", `3px solid var(--${color})`);
  card.find(".location").css("border-bottom", `3px solid var(--${color})`);
  card.find(".location").css("border-top", `3px solid var(--${color})`);
}

const nameList = [
  "yami",
  "teena",
  "neha",
  "emily",
  "annie",
  "merlin",
  "niranjana",
  "arsha",
  "rohan",
  "georgy",
  "justus",
  "naveen",
];

const now = new Date(Date.now());
for (name of nameList) {
  setData(name);
}
