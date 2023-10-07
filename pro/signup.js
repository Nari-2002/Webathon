function handleFormSubmit(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
  
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    saveToExcel(data);
  }
  
  function saveToExcel(data) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([data]);
    XLSX.utils.book_append_sheet(wb, ws, 'Signup Data');
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'signup_data.xlsx');
  }
  
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  
  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', handleFormSubmit);
  