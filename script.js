const starterItems = [
 {id:1,status:"Lost",name:"Wireless headphones",category:"Electronics",location:"Engineering Block",date:"Today · 9:15 AM",details:"Black over-ear headphones in a soft case.",emoji:"🎧",visual:"visual-blue",contact:"helpdesk@campus.edu"},
 {id:2,status:"Found",name:"Blue water bottle",category:"Accessories",location:"Student Center",date:"Today · 10:42 AM",details:"Reusable blue bottle with a small sticker.",emoji:"🧴",visual:"visual-green",contact:"helpdesk@campus.edu"},
 {id:3,status:"Lost",name:"Calculus notebook",category:"Books & notes",location:"Central Library",date:"Yesterday · 3:20 PM",details:"Spiral notebook with a green cover.",emoji:"📗",visual:"visual-lilac",contact:"helpdesk@campus.edu"},
 {id:4,status:"Found",name:"Keyring with 3 keys",category:"Accessories",location:"Cafeteria",date:"Today · 11:05 AM",details:"Three keys on a simple silver ring.",emoji:"🔑",visual:"visual-yellow",contact:"helpdesk@campus.edu"},
 {id:5,status:"Lost",name:"Canvas tote bag",category:"Accessories",location:"Arts Building",date:"Yesterday · 1:10 PM",details:"Cream tote bag with a blue printed design.",emoji:"👜",visual:"visual-peach",contact:"helpdesk@campus.edu"},
 {id:6,status:"Found",name:"Student ID holder",category:"Other",location:"Sports Complex",date:"Today · 8:30 AM",details:"Clear card holder with a red lanyard. ID details withheld.",emoji:"🪪",visual:"visual-pink",contact:"helpdesk@campus.edu"},
 {id:7,status:"Lost",name:"Grey zip-up hoodie",category:"Clothing",location:"Lecture Hall B",date:"Monday · 2:45 PM",details:"Grey hoodie, medium size, small logo on chest.",emoji:"🧥",visual:"visual-gray",contact:"helpdesk@campus.edu"},
 {id:8,status:"Found",name:"Tablet stylus",category:"Electronics",location:"Design Lab",date:"Yesterday · 4:00 PM",details:"White digital stylus left near a workstation.",emoji:"🖊️",visual:"visual-sky",contact:"helpdesk@campus.edu"}
];
const storageKey = "campusfind-listings-v1";
let items = starterItems.slice();
try { const saved = JSON.parse(localStorage.getItem(storageKey)); if (Array.isArray(saved)) items = [...saved, ...starterItems.filter(s => !saved.some(x => x.id === s.id))]; } catch (_) {}
let activeFilter = "All";
const grid = document.getElementById("listingGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("reportDialog");
const toast = document.getElementById("toast");
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function render() {
  const q = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const filtered = items.filter(item => (activeFilter === "All" || item.status === activeFilter) &&
    (category === "All" || item.category === category) &&
    [item.name,item.location,item.details,item.category].some(v => String(v).toLowerCase().includes(q)));
  grid.innerHTML = filtered.map(item => `
    <article class="item-card">
      <div class="item-visual ${escapeHTML(item.visual || "visual-green")}"><span class="item-status ${item.status.toLowerCase()}">${item.status === "Lost" ? "↗ LOST" : "✓ FOUND"}</span><span class="emoji" aria-hidden="true">${escapeHTML(item.emoji || "📦")}</span></div>
      <div class="item-body"><span class="item-category">${escapeHTML(item.category)}</span><h3>${escapeHTML(item.name)}</h3><p class="item-description">${escapeHTML(item.details)}</p>
      <div class="item-meta"><span class="item-location"><span>⌖</span>${escapeHTML(item.location)}</span><span class="item-date">${escapeHTML(item.date)}</span></div>
      <button class="item-contact" data-contact="${escapeHTML(item.contact || "helpdesk@campus.edu")}" data-name="${escapeHTML(item.name)}">Contact about item ↗</button></div>
    </article>`).join("");
  emptyState.classList.toggle("hidden", filtered.length > 0);
  grid.classList.toggle("hidden", filtered.length === 0);
  document.getElementById("resultsText").textContent = `Showing ${filtered.length} of ${items.length} listings`;
  document.getElementById("allCount").textContent = items.length;
  document.getElementById("statItems").textContent = String(items.length).padStart(2,"0");
  document.getElementById("statFound").textContent = String(items.filter(i => i.status === "Found").length).padStart(2,"0");
}
function openReport() { dialog.showModal(); }
function showToast(message) { toast.textContent = message; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3000); }
document.getElementById("reportTop").addEventListener("click", openReport);
document.getElementById("heroReport").addEventListener("click", openReport);
document.getElementById("reportBrowse").addEventListener("click", openReport);
document.getElementById("emptyReport").addEventListener("click", openReport);
document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
  activeFilter = btn.dataset.filter;
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
  render();
}));
searchInput.addEventListener("input", render);
categoryFilter.addEventListener("change", render);
document.getElementById("clearFilters").addEventListener("click", () => {
  searchInput.value = ""; categoryFilter.value = "All"; activeFilter = "All";
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b.dataset.filter === "All"));
  render();
});
grid.addEventListener("click", e => {
  const btn = e.target.closest("[data-contact]");
  if (!btn) return;
  const email = btn.dataset.contact;
  if (email === "helpdesk@campus.edu") {
    showToast("Demo listing: contact your campus help desk to arrange a handover.");
  } else {
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("CampusFind: " + btn.dataset.name)}`;
  }
});
document.getElementById("reportForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("itemName").value.trim();
  const location = document.getElementById("itemLocation").value.trim();
  const details = document.getElementById("itemDetails").value.trim();
  const contact = document.getElementById("itemContact").value.trim();
  const status = document.getElementById("itemStatus").value;
  const category = document.getElementById("itemCategory").value;
  if (!name || !location || !details || !contact) return;
  const visuals = ["visual-blue","visual-peach","visual-lilac","visual-green","visual-yellow","visual-pink","visual-gray","visual-sky"];
  const emojis = {"Electronics":"🎧","Accessories":"🎒","Books & notes":"📚","Clothing":"🧥","Other":"📦"};
  items.unshift({id:Date.now(),status,name,category,location,date:"Just now",details,contact,emoji:emojis[category],visual:visuals[Math.floor(Math.random()*visuals.length)]});
  try { localStorage.setItem(storageKey, JSON.stringify(items.filter(i => !starterItems.some(s => s.id === i.id)))); } catch (_) {}
  e.target.reset(); dialog.close(); activeFilter = "All";
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b.dataset.filter === "All"));
  categoryFilter.value = "All"; searchInput.value = ""; render();
  document.getElementById("browse").scrollIntoView({behavior:"smooth"});
  showToast("Your listing was added to this browser.");
});
render();
