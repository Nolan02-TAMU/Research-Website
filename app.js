document.getElementById("year").textContent = new Date().getFullYear();
const projects = [
  { title: "Fatty Acid Chains Affect on Organoid Growth", desc: "How do fatty acid chains affect the growth of organoids?", link: "#" },
  { title: "Olivia Trevino's Project", desc: "What it does", link: "#" }
  { title: "Project 3", desc: "What it does", link: "#" }
  
];
document.getElementById("projects").innerHTML = projects.map(p => `
  <article class="card">
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <a href="${p.link}">View →</a>
  </article>
`).join("");
