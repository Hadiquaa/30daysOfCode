const searchBar = document.querySelector("input");
const searchBtn = document.querySelector(".btn-search");
const userName = document.querySelector("#id");
const avatar = document.querySelector(".avatar");
const blogName = document.querySelector("#blog");
const date = document.querySelector("#date");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const bio = document.querySelector("#bio");
const repos = document.querySelector("#repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const loc = document.querySelector("#location");
const twitter = document.querySelector("#twitter");
const link = document.querySelector("#link");
const company = document.querySelector("#company");
const error = document.querySelector(".error");
const darkbtn = document.querySelector(".dark");
const modeText = document.querySelector(".dark p");
const root = document.querySelector(":root");
const modeicon = document.querySelector(".modeicon");
let darkmode = false;

searchBtn.addEventListener("click", () => {
  let input = searchBar.value;
  if (input !== "") {
    getUserData(input);
  }
});
searchBar.addEventListener("keydown", (e) => {
  let input = searchBar.value;
  if (e.key == "Enter") {
    if (input !== "") {
      getUserData(input);
    }
  }
});

darkbtn.addEventListener("click", () => {
  if (darkmode == false) darkmodeProperties();
  else lightmodeProperties();
});

function getUserData(user) {
  let url = `https://api.github.com/users/${user}`;
  fetch(url)
    .then((Response) => Response.json())
    .then((result) => {
      console.log(result);
      updateProfile(result);
    })
    .catch((error) => {
      throw error;
    });
}

function updateProfile(data) {
  if (data.message == "Not Found") {
    error.style.display = "block";
  } else {
    userName.innerText = data.name;
    avatar.src = data.avatar_url;
    blogName.href = data.html_url;
    blogName.innerText = `@${data.login}`;
    let dateSegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${dateSegments[2]} ${
      months[dateSegments[1] - 1]
    } ${dateSegments[0]}`;
    bio.innerText = data.bio == null ? `This profile has no bio` : data.bio;
    repos.innerText = data.public_repos;
    followers.innerText = data.followers;
    following.innerText = data.following;
    loc.innerText = checkNull(data.location, loc)
      ? `Not Available`
      : data.location;
    twitter.innerText = checkNull(data.twitter_username, twitter)
      ? `Not Available`
      : data.twitter_username;
    twitter.href = checkNull(data.twitter_username, twitter)
      ? "#"
      : `https://twitter.com/${data.twitter_username}`;
    link.innerText = checkNull(data.blog, link) ? `Not Available` : data.blog;
    link.href = checkNull(data.blog, link)
      ? "#"
      : `https://twitter.com/${data.twitter_username}`;
    company.innerText = checkNull(data.company, company)
      ? `Not Available`
      : data.company;
  }
}

function checkNull(param1, param2) {
  if (param1 == "" || param1 == null) {
    param2.style.opacity = 0.5;
    param2.previousElementSibling.style.opacity = 0.5;
    return true;
  } else {
    return false;
  }
}

function darkmodeProperties() {
  root.style.setProperty("--lm-bg", "#141d2f");
  root.style.setProperty("--lm-bg-content", "#1e2a47");
  root.style.setProperty("--lm-text", "white");
  root.style.setProperty("--lm-text-alt", "white");
  darkmode = true;
  modeText.innerText = "LIGHT";
  modeicon.src =
    "https://codehelp-devdetective.netlify.app/assets/images/sun-icon.svg";
  localStorage.setItem("dark-mode", true);
}

function lightmodeProperties() {
  root.style.setProperty("--lm-bg", "#f6f8ff");
  root.style.setProperty("--lm-bg-content", "#fefefe");
  root.style.setProperty("--lm-text", "#4b6a9b");
  root.style.setProperty("--lm-text-alt", "#2b3442");
  darkmode = false;
  modeText.innerText = "DARK";
  modeicon.src =
    "https://codehelp-devdetective.netlify.app/assets/images/moon-icon.svg";
  localStorage.setItem("dark-mode", false);
}
function init() {
  darkmode = false;
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Check if there is a value for "dark-mode" in the user's localStorage
  if (localStorage.getItem("dark-mode") === null) {
    // If there is no value for "dark-mode" in localStorage, check the device preference
    if (prefersDarkMode) {
      // If the device preference is for dark mode, apply dark mode properties
      darkmodeProperties();
    } else {
      // If the device preference is not for dark mode, apply light mode properties
      lightmodeProperties();
    }
  } else {
    // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
    if (localStorage.getItem("dark-mode") === "true") {
      // If the value is "true", apply dark mode properties
      darkmodeProperties();
    } else {
      // If the value is not "true", apply light mode properties
      lightmodeProperties();
    }
  }
  getUserData("thepranaygupta");
}
init();
