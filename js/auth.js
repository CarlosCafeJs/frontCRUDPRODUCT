document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        
        window.location.href = 'proxima-pagina.html';
      } else {
    
        

        alert('Erro de autenticação. Por favor, verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
    }
  });
});
