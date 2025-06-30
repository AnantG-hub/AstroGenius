
  document.getElementById('kundaliForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:5000/api/users/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message || '✅ Data saved!');
    })
    .catch(err => {
      console.error(err);
      alert('❌ Failed to save data.');
    });
  });

const userRoutes=require('./routes/userRoutes');
   