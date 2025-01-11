document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
});


const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects.",
    technology: ["C#"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

document.addEventListener("DOMContentLoaded", () => {

  const allButton = document.querySelector(
    ".home-about-btns button:nth-child(1)"
  );
  const cseButton = document.querySelector(
    ".home-about-btns button:nth-child(2)"
  );
  const wddButton = document.querySelector(
    ".home-about-btns button:nth-child(3)"
  );
  const courseContainer = document.querySelector(".home-about-content");

  const creditDisplay = document.createElement("p");
  creditDisplay.classList.add("credit-total");
  document.querySelector(".home-about-headtext").appendChild(creditDisplay);

  function displayCourses(coursesToShow) {
    courseContainer.innerHTML = "";

    coursesToShow.forEach((course) => {
      const button = document.createElement("button");
      button.textContent = `${course.subject} ${course.number}`;

      if (course.completed) {
        button.classList.add("about-content-brown");
      }

      courseContainer.appendChild(button);
    });
  }


  allButton.addEventListener("click", () => {
    displayCourses(courses);
  });

  cseButton.addEventListener("click", () => {
    const cseCourses = courses.filter((course) => course.subject === "CSE");
    displayCourses(cseCourses);
  });

  wddButton.addEventListener("click", () => {
    const wddCourses = courses.filter((course) => course.subject === "WDD");
    displayCourses(wddCourses);
  });


  displayCourses(courses);
});
