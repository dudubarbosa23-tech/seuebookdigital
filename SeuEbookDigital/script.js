const ebooks = [
  {id:1,titulo:"Estrelas Entre Sombras",descricao:"Uma jornada única através da ficção e mistério.",preco:20,imagem:"img/estrela.jpg",link:"https://drive.google.com/file/d/1DBIPF-GMwiSMUFutsQt9HvNB7bbPAHOv/view?usp=sharing"},
  {id:2,titulo:"Magia: Vertentes, História e Caminhos",descricao:"Explore a magia de forma estruturada.",preco:100,imagem:"img/magia.jpg",link:"https://drive.google.com/"}  
];

const magia = [
  {id:101,titulo:"Mapa Astral",descricao:"Promoção por tempo indeterminado.",preco:30},
  {id:102,titulo:"Poções",descricao:"Vitalidade, Disposição, Sensibilidade Energética, Limpeza",preco:50},
  {id:103,titulo:"Feitiços",descricao:"Abertura de Caminhos, Oportunidades Profissionais, Insônia, Quebra de Amarrações",preco:80},
  {id:104,titulo:"Banimento",descricao:"Serviço especializado.",preco:100}
];

let cart = JSON.parse(localStorage.getItem('cart'))||[];
let wishlist = JSON.parse(localStorage.getItem('wishlist'))||[];

function renderItems(){
  const ebooksList=document.getElementById('ebooks-list');
  ebooksList.innerHTML='';
  ebooks.forEach(item=>{
    ebooksList.innerHTML+=`
      <div class="card">
        <img src="${item.imagem}" alt="${item.titulo}">
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
        <p class="price">R$${item.preco}</p>
        <button class="btn" onclick="addToCart(${item.id},'ebook')">Adicionar ao Carrinho</button>
        <button class="btn" onclick="addToWishlist(${item.id},'ebook')">Lista de Desejos</button>
        <a class="btn" href="${item.link}" target="_blank">Ver Amostra</a>
      </div>
    `;
  });

  const magiaList=document.getElementById('magia-list');
  magiaList.innerHTML='';
  magia.forEach(item=>{
    magiaList.innerHTML+=`
      <div class="card">
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
        <p class="price">R$${item.preco}</p>
        <button class="btn" onclick="addToCart(${item.id},'magia')">Adicionar ao Carrinho</button>
        <button class="btn" onclick="addToWishlist(${item.id},'magia')">Lista de Desejos</button>
      </div>
    `;
  });
}

function addToCart(id,type){
  const item = (type==='ebook'? ebooks : magia).find(i=>i.id===id);
  cart.push(item);
  localStorage.setItem('cart',JSON.stringify(cart));
  renderCart();
}

function addToWishlist(id,type){
  const item = (type==='ebook'? ebooks : magia).find(i=>i.id===id);
  wishlist.push(item);
  localStorage.setItem('wishlist',JSON.stringify(wishlist));
  renderWishlist();
}

function renderCart(){
  const cartItems=document.getElementById('cart-items');
  const cartTotal=document.getElementById('cart-total');
  cartItems.innerHTML='';
  let total=0;
  cart.forEach(i=>{
    cartItems.innerHTML+=`<li>${i.titulo} - R$${i.preco}</li>`;
    total+=i.preco;
  });
  cartTotal.textContent=total;
}

function renderWishlist(){
  const wishlistItems=document.getElementById('wishlist-items');
  wishlistItems.innerHTML='';
  wishlist.forEach(i=>{
    wishlistItems.innerHTML+=`<li>${i.titulo} - R$${i.preco}</li>`;
  });
}

const form = document.getElementById('contato-form');
form.addEventListener('submit', async e=>{
  e.preventDefault();
  const data={nome:form.nome.value,email:form.email.value,mensagem:form.mensagem.value};
  const res=await fetch('/.netlify/functions/saveMessage',{
    method:'POST',
    body:JSON.stringify(data)
  });
  if(res.ok) alert("Mensagem enviada!");
  else alert("Erro ao enviar mensagem.");
});

renderItems();
renderCart();
renderWishlist();
