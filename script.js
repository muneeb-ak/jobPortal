const jobTitle = document.querySelector("#job-title");
const companyName = document.querySelector("#company-name");
const jobLocation = document.querySelector("#location");
const jobType = document.querySelector("#job-type");
const addjobBtn = document.querySelector("#sub");
const jobList = document.querySelector("#job-list");
const searchInput = document.querySelector("#search-input")
const sDrop = document.querySelector("#filter-type")


let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function duplicateCheck(){
     let existing = jobs.find((j)=>{
            return  j.title.toLowerCase() === jobTitle.value.toLowerCase()
           && j.company.toLowerCase() === companyName.value.toLowerCase()
           && j.jobLocation.toLowerCase() === jobLocation.value.toLowerCase()
           && j.type.toLowerCase() === jobType.value.toLowerCase(); 
     }) 
     if(existing){
      alert("Job already exists!");
     }
     else{
      addJob();
     }
}

function addJob() {
  if(jobTitle.value.trim() != "" 
  && companyName.value.trim() != "" 
  && jobLocation.value.trim()!= "" 
  && jobType.value.trim()!=""){jobs.push({
    title: jobTitle.value,
    company: companyName.value,
    jobLocation: jobLocation.value,
    type: jobType.value,
    date : new Date().toDateString()
  });
  
  localStorage.setItem("jobs", JSON.stringify(jobs));
  
  form.reset();

  renderJobs();
}
else {
  alert("Please fill out all fields before submitting.");
}
}

function renderJobs() {
  jobList.innerHTML = "";


  let keyword = searchInput.value.toLowerCase();
  let searchDrop  = sDrop.value; 


  let finalJobs = jobs.filter((job)=>{
    const matchJobt =  job.title.toLowerCase().includes(keyword) ||
           job.company.toLowerCase().includes(keyword);
           
     let matchD = searchDrop === "" || searchDrop === job.type;
     
     return matchJobt && matchD;
  }) 

  if(finalJobs.length === 0){
    
    jobList.innerHTML = `
    <p>No jobs yet.</p>
    `
    }

  finalJobs.forEach((job,index) => {
    const div = document.createElement("div");
    div.className = "job-card";
    div.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.jobLocation}</p>
      <p><strong>Type:</strong> ${job.type}</p>
      <button onclick="removeJob(${index})">Remove</button>
      <p>Posted : ${job.date}</p> 
      `;
    jobList.appendChild(div);
  });
}

function removeJob(index){
       jobs.splice(index,1);
       localStorage.setItem("jobs",JSON.stringify(jobs));
       renderJobs();   
}

addjobBtn.addEventListener("click", duplicateCheck);
searchInput.addEventListener("input",renderJobs);
sDrop.addEventListener("change",renderJobs);

renderJobs();
