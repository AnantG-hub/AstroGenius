function updateDayTime() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const day = days[now.getDay()];
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById("liveDayTime").textContent = `${day}, ${hours}:${minutes}`;
}
setInterval(updateDayTime, 1000);
updateDayTime();
function updateDate() {
  const now = new Date();   

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];    

  const day = now.getDate();  
    
  const month = months[now.getMonth()]; 
    
    
  const year = now.getFullYear(); 
  document.getElementById("liveDate").textContent = `${day} ${month} ${year}`;

}
setInterval(updateDate, 1000);

let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}
setInterval(showSlides, 4000); // Change slide every 4s 

    

  function showServiceDetails(title, paragraph) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').textContent = paragraph;
    document.getElementById('serviceModal').classList.add('active');
  }

  function closeServiceModal() {
    document.getElementById('serviceModal').classList.remove('active');
  }

  // Example: Milan Details Function
  function showMilanDetails() {
    showServiceDetails(
      'Milan Kundali',
      `Milan Kundali ya Gun Milan, vivaah se pehle 36 gunon ke aadhar par ladka-ladki ki sammilit kundli ka tulnatmak vishleshan hai. Ismein varna, vashya, tara, yoni, grah maitri, gan, bhakoot, aur nadi ka milan hota hai.`
    );
  }

  function showBhagyaDetails() {
    showServiceDetails(
      'Bhagya Kundali',
      `Bhagya Kundali janm samay ke grahon ki dasha, antardasha aur unki sthiti ke aadhar par bhavishya aur safalta ke sambhavit marg ko darshata hai.`
    );
  }

  function showMoolaDetails() {
    showServiceDetails(
      'Moola Kundali',
      `Moola Kundali moola nakshatra ke prabhav se jeevan ke karmic patterns, adhyatmik ruchi aur karmphal ka vishleshan karti hai.`
    );
  }

