<h2>PRODUCTS VIEW</h2>
<a href='http://localhost:8080/'> <button> Home </button></a>
<h3>Welcome {{currentUser.fullname}} {{curreentUser.cartId}}. ROLE: {{currentUser.role}}</h3>
<button style="width: 120px" id="logout">Logout </button>
To your cart:
    <a href="http://localhost:8080/carts/{{currentUser.cartId}}"></a>
    <div class="product-container">
{{#each products}}
  <div class="product-card">
  <h3 class="product-title">Title: {{title}}</h3>
  <p class="product-description">Description: {{description}}</p>
  <h4 class="product-price">Price: {{price}}</h4>
  <h4>Stock: {{stock}}</h4>
  <h4>Owner: {{owner}}</h4>
<div class="product-container">
  <button id="addToCart" style="width: 120px" type="submit" 
  data-pid="{{_id}}" 
  data-uid="{{../currentUser._id}}" 
  data-cid="{{../currentUser.cartId}}"
  >Add to cart</button>
      <button id="deleteProduct" style="width: 120px" type="submit" 
  data-pid="{{_id}}" 
  data-title="{{title}}" 
  >Delete Product</button>
  </div>
    </div>

{{/each}}
</div>
{{! validacion de queries para el handlebar, limit SIEMPRE llega, porque lo valida el router}}
<div style="flex-direction: row;justify-content: space-around;background-color: #588956">
  {{#if hasPrevPage}}
  <a
    href="http://localhost:8080/products/?limit={{limit}}&sort={{sort}}&page={{prevPage}}{{#if category}}&category={{category}}{{/if}}"><button>Next Page</button></a>
  {{/if}}
  {{#if hasNextPage}}
  <a
    href="http://localhost:8080/products/?limit={{limit}}&sort={{sort}}&page={{nextPage}}{{#if category}}&category={{category}}{{/if}}"><button>Previous Page</button></a>
  {{/if}}
</div>
<script src="/js/logout.js"></script>
<script src="/js/addToCart.js"></script>
