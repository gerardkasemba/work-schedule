// import moment from "https://cdn.skypack.dev/moment@2.29.1";

const store = window.localStorage;

const container = $(".container");

const now = moment();

const currentTime = { text: moment().format("h:00 A"), hour: moment().hour() };

$("#day").text(now.format("dddd MMMM DD, YYYY"));

const range = (start, end, step) => {
  return Array.from(
    Array.from(Array(Math.ceil((end - start) / step)).keys()),
    (x) => start + x * step
  );
};

const hoursOfTheDay = Array.from(new Array(24)).map((v, i) => {
  const text = moment().hour(i).format("h:00 A");
  const hour = moment().hour(i);
  return { text, hour };
});

function color(time) {
  return time.text === currentTime.text
    ? "bg-red-300"
    : time.hour < now
    ? "bg-gray-300"
    : "bg-green-200";
}

hoursOfTheDay.forEach((hr) => {
  const grid = $(
    `<form data-name="${hr.text}" class="row" style="margin: 0 0 15px 0;"></form>.`
  );

  const time = $(
    `<div class="col-md-1" style=" border-radius: 5px 0px 0px 5px;
    background:;color: #fff;">${hr.text}</div>`
  );

  const textArea = $(
    `<textarea name="${
      hr.text
    }" maxLength="50" style="resize: none; font-weight: bold; overflow: hidden; background-color: transparent; border: 1px solid #30336b; outline: none; color: #fff;" class="col-md-10 ${color(
      hr
    )}">${store.getItem(hr.text) || ""}</textarea>`
  );

  textArea.keydown((e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      return false;
    }
  });

  const saveButton = $(
    `<button type="submit" style="
    background: rgb(107,48,88); border-radius: 0 5px 5px 0;
    background: linear-gradient(90deg, rgba(107,48,88,1) 0%, rgba(189,86,253,1) 35%, rgba(190,46,221,1) 100%);color: #fff; border: 0; outline: none;" class="col-md-1"><i class="fas fa-save text-xl"></i></button>`
  );

  grid.submit((e) => {
    e.preventDefault();

    const value = $(`textarea[name="${hr.text}"]`).val();

    store.setItem(hr.text, value);
  });

  grid.append(time);
  grid.append(textArea);
  grid.append(saveButton);

  container.append(grid);
});
