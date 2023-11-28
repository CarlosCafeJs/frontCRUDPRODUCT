
// Adiciona cada produto do banco de dados na tabela
async function getProdutos() {
  try {
    const response = await fetch('https://api-crudnodejs.vercel.app/product');
    const data = await response.json();

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; 

    data.forEach(item => {
      const newRow = document.createElement('tr'); 
      newRow.innerHTML = `
        <td>${item.produto}</td>
        <td>${item.quantidade}</td>
        <td>
          <div class="container-control">
            <div class="control-produto">
            <button class="update-button">
                  
            <svg xmlns="http://www.w3.org/2000/svg" height="46" viewBox="0 -960 960 960" width="46"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
           
          </button>
          <button class="delete-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="46" viewBox="0 -960 960 960" width="46"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
          </button>
            </div>
          </div>
        </td>
      `;
      tableBody.appendChild(newRow);

      // Adiciona os botões dinaminacemnte para utiliza-los com cada ID
      const deleteButton = newRow.querySelector('.delete-button');
      deleteButton.addEventListener('click', () => {
        deletarProduto(item._id);
      });
      
      const updateButton = newRow.querySelector('.update-button');
      updateButton.addEventListener('click', () => {
        abrirModalEdicao(item._id, item.produto, item.quantidade);
      });
    });

  } catch (error) {
    console.error('Erro ao buscar e inserir dados:', error);
  }
}

//Adiciona a função GETPRODUTOS
document.addEventListener('DOMContentLoaded', getProdutos);



// --------------------------------------------------------------

// MODAL DE CADASTRO DE PRODUTOS ============================================
  function abrirModal() {
    const modal = document.getElementById('modalCadastro');
    modal.style.display = 'block';
  }

  //Fução para fechar o modal
  function fecharModal() {
    const modal = document.getElementById('modalCadastro  ');
    modal.style.display = 'none';
  }

  //evento para enviar o formulário (simulando a adição do produto)
  document.getElementById('formProduto').addEventListener('submit', function(event) {
    event.preventDefault();
    const produto = document.getElementById('produto').value;
    const quantidade = document.getElementById('quantidade').value;
    console.log(`Produto: ${produto}, Quantidade: ${quantidade}`);

    const data = { produto, quantidade }; 

    fetch('https://api-crudnodejs.vercel.app/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // 
    })
    .then(response => {
      if (response.ok) {
        console.log('Produto adicionado com sucesso!');
        fecharModal(); 
      } else {
        console.error('Falha ao adicionar o produto');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
    });

    // Recarrega a página
    location.reload();
    fecharModal(); 
  });

  // ============================================
// MODAL PARA DELETAR PRODUTOS ============================================
  function deletarProduto(idProduto) {
    fetch(`https://api-crudnodejs.vercel.app/${idProduto}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('Produto excluído com sucesso!');
      
        location.reload(); 
      } else {
        console.error('Falha ao excluir o produto');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar a requisição:', error);
    });
  }
  
  // ============================================
  // MODAL PARA ALTERAR PRODUTOS ============================================
  function abrirModalEdicao(_id, produto, quantidade) {
    const modalEdicao = document.getElementById('modalEdicao');
    const produtoEdit = document.getElementById('produtoEdit');
    const quantidadeEdit = document.getElementById('quantidadeEdit');
  
    produtoEdit.value = produto;
    quantidadeEdit.value = quantidade;
  
    modalEdicao.style.display = 'block';
  
    const salvarAlteracoesBtn = document.getElementById('salvarAlteracoesBtn');
    salvarAlteracoesBtn.addEventListener('click', () => {
      console.log('Clique no botão Salvar Alterações'); // Verifica se o evento é acionado
  
      const novoProduto = produtoEdit.value;
      const novaQuantidade = quantidadeEdit.value;
  
      console.log('Novo Produto:', novoProduto); // Verifica se os novos valores estão corretos
      console.log('Nova Quantidade:', novaQuantidade);
  
      fetch(`https://api-crudnodejs.vercel.app/product/${_id}`, {
        method: 'PATCH', // Use PUT ou PATCH conforme apropriado para sua API
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ produto: novoProduto, quantidade: novaQuantidade })
      })
      .then(response => {
        console.log('Resposta:', response); // Verifica a resposta da requisição
  
        if (response.ok) {
          console.log('Produto atualizado com sucesso!');
          // Adicione aqui qualquer lógica adicional, como atualizar a lista de produtos após a edição
        } else {
          console.error('Falha ao atualizar o produto');
        }
      })
      .catch(error => {
        console.error('Erro ao enviar a requisição:', error);
      });
  
      modalEdicao.style.display = 'none';
      
    location.reload();
    });
  
    const cancelarEdicaoBtn = document.getElementById('cancelarEdicaoBtn');
    cancelarEdicaoBtn.addEventListener('click', () => {
      modalEdicao.style.display = 'none';
    });
  }
  
    // ============================================