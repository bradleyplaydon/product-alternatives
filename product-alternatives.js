$(document).ready(function(){
    var sectionTitle = "{{ section.settings.section_title }}";
    $('#brad-alternatives').append("<div class='card'><div class='card__header'><h2 class='card__title heading h3'>"+sectionTitle+"</h2></div><div class='brad-alternatives'></div></div>");
    var productAvailable = {{ product.available }};
     var thisProdType = "{{ product.type }}"; 
    {% for variant in product.variants %}
    var thisProdSKU = "{{ variant.sku }}";
    {% endfor %}
  
    var thisProdTags = {{ product.tags | split: "" }};
    for(var thisProdTag = 0; thisProdTag < thisProdTags.length; thisProdTag++){
      if(thisProdTags[thisProdTag].includes("Size")){
       var thisProdSize = thisProdTags[thisProdTag];
      }
    }
    var thisProdOptions = [];
    var productSizeOptions = []
    {% for product_option in product.options_with_values %}
    {% if product_option.name == 'Size' %}
    {% for val in product_option.values %}
    thisProdOptions.push("{{val}}");
    {% endfor %}
    {% endif %}
    {% endfor %}
    var limittoshow = {{ section.settings.num_recommendations_to_show }};                     
    var loopCount = 0;
  $.ajax({
  type : 'POST',
  url : '/api/2020-07/graphql.json',
  headers: {
    'X-Shopify-Storefront-Access-Token': '235bd1ea4d8c08d31192fbba2cf5b21d',
    'Content-Type': 'application/json',
    'accept': 'application/json'
  },
  data: JSON.stringify({
  query: `query ($productType: String!) {
  products(first: 250, query: $productType) {
    edges {
      node {
        id
        handle
        description
        productType
        title
        tags
        options {
          name
          values
        }
        images(first: 10) {
          edges {
            node {
              src
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              sku
              price
              quantityAvailable
              id
            }
          }
        }
      }
    }
  }
}
`,
  variables: {
      "productType": thisProdType
  }
  }),
  success: function(result) {
    var resultString = JSON.stringify(result);
    var parsedResult = JSON.parse(resultString);
   var productS = result.data.products.edges
   console.log(productS)
   for(var prod in productS){
        
        var productTitle = productS[prod].node.title;
        var productType = productS[prod].node.productType;
        var productTags = productS[prod].node.tags;
        var RightSizes = false; 
        for(var tag = 0; tag < productTags.length; tag++){
          if(productTags[tag].includes("Size_")){
            var Size = productTags[tag].trim(" ");
            if(Size == thisProdSize){
             var RightSizes = true; 
            }
          }
            else {
             var sizeTagExst = false;   
            }
          }
        
        var productHandle = productS[prod].node.handle;
        for(var variant in productS[prod].node.variants.edges){
        var variantSku = productS[prod].node.variants.edges[variant].node.sku;
        var variantPrice = productS[prod].node.variants.edges[variant].node.price;
        var variantID = atob(productS[prod].node.variants.edges[variant].node.id).substring(29);
        var variantInventory = productS[prod].node.variants.edges[variant].node.quantityAvailable;
        }
        for(var img in productS[prod].node.images.edges){
         var prodImages = productS[prod].node.images.edges[0].node.src; 
        }
        for(var option in productS[prod].node.options){
         var productSizeOption = productS[prod].node.options[option].name;
          if(productSizeOption == "Size"){
           var productOptionSizeVal =  productS[prod].node.options[option].values;
            for(var optionVal in productOptionSizeVal){
              productSizeOptions.push(productOptionSizeVal[optionVal]);
            }
          }
            else {
                var sizeOptionExst = false;
            }
        }
        var similarProd = false;
        for(var i = 0; i < productSizeOptions.length; i++){
          if(productSizeOptions[i] == thisProdOptions[0]){
          var similarProd = true;
          }
        }
          /* products that are the same type and same size based upon Size_ tag or product options */
          if(RightSizes == true || similarProd == true){
         if(thisProdType == productType && thisProdSKU != variantSku && productAvailable != true && similarProd == true && variantInventory > 0 || thisProdType == productType && thisProdSKU != variantSku && productAvailable != true && variantInventory > 0 && RightSizes == true){
        loopCount++;
             
      $('#brad-alternatives > .card > .brad-alternatives').append("<div class='product-form__info-item'><div><div class='image-wrapper'><a href="+"/products/"+productHandle+"><img src="+prodImages+"/></a></div><div class='product-item__info'><div class='product-item__info-inner'><div class='product-item__price-list price-list'><span class='price'>£"+variantPrice+"<span style='font-size:12px;'>Exc VAT</span></span></div></div><a class='product-item__title' href="+"/products/"+productHandle+">"+productTitle+"</a></div></div><form method='post' id='usc-recommendations' accept-charset='UTF-8' class='product-item__action-list button-stack' encytype='multipart/form-data'><input type='hidden' name='quantity' value='1'><input type='hidden' name='id' value="+variantID+"><button type='submit' value="+variantID+" class='product-item__action-button usc-add button button--small button--primary' >Add to cart</button> </form></div>");
             
      }
        }
        
      /* 
      if(loopCount == 0 && thisProdType == productType && thisProdSKU != variantSku && productAvailable != true && similarProd == false and RightSizes == false){
          
      }
      */
      if(loopCount == limittoshow){
          break;
      }
      }
      document.querySelectorAll('.usc-add').forEach(item => {
            console.log(item)
    item.addEventListener('click', event => {
        event.preventDefault();
        jQuery.ajax({
            url: '/cart/add.js',
            type: 'post',
            dataType: 'json',
            data: {
                quantity: 1,
                id: item.value
            },
            // Optional: success/error functions
            success: function(itemData) {
                document.documentElement.dispatchEvent(new CustomEvent('product:added', {
                    bubbles: true,
                    detail: {
                        quantity: 1
                    }
                }));
            },
            error: function(XMLHttpRequest) {
                console.log(XMLHttpRequest)
            }
        });
    })
})   
  },
  error: function(status) {
    console.log(status)
  }
});
})
