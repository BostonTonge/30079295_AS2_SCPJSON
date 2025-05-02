// read the information from my JSON file and create the Nav Bar with the page names
function loadNavMenu()
{
    fetch("scp.json")
    .then(response => response.json())
    .then(
        data => {
            const navMenu = document.getElementById("scp-nav");
            // Read through each SCP creature in my JSON file and create a link to each page
            data.forEach(
                scp => {
                const link = document.createElement('a');
                link.href = `#${scp.item}`;
                link.textContent = scp.item;
                link.onclick = function(event){
                    event.preventDefault();
                    loadSCP(scp); 
                }
                navMenu.appendChild(link)
            });
        }
    )
    .catch(error => console.error("error loading data",error))

}

// load details about the SCP into the <main> tags
function loadSCP(scp)
{
    const display = document.getElementById("display");
//Create a display of all information we have for each SCP and include a Read button that reads the unique description
    const content = `
   <h2> Item#:${scp.item}</h2>
   <h3>Object Class:${scp.class}</h3>
   <img src="${scp.image}" alt="${scp.item}" onerror="this.style.display='none'">
   <h4>Special Containment Procedures</h4>
   <p>${scp.procedures}<p>
   <h4>Description</h4>
   <p>${scp.description}<p>
   <button id="read">Read Description</button>
   <h4>References</h4>
   <p>${scp.reference}<p>   
   `;
    
    display.innerHTML = content;
// Command for the Read button to read the information on the unique description of each SCP
    document.getElementById("read").onclick = function () {
        readDescription(scp.description);
    }
}
// Function to vocalise the unique description of each SCP creature out Loud

function readDescription(description)
{
    const speech = new SpeechSynthesisUtterance();
    speech.text = description;
    speech.voice = speechSynthesis.getVoices()[0];
    speechSynthesis.speak(speech);
}