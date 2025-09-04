document.getElementById("year").textContent = new Date().getFullYear();
const projects = [
  { title: "Project One", desc: "What it does", link: "#" },
  { title: "Project Two", desc: "What it does", link: "#" }
];
document.getElementById("projects").innerHTML = projects.map(p => `
  <article class="card">
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <a href="${p.link}">View →</a>
  </article>
`).join("");
