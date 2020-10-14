# product-alternatives
This is a section for product pages on Shopify which requires a private app to be created and access to the Storefront API it uses GraphQL to pull products from the Storefront API.

- FLOW -
Section won't show unless the checkbox defined under ID "show_recommendations_on_type" is ticked
Section only shows on products out of stock
Section shows different products based upon whether the "Size_" tag exists for the product or not IF Size tag doesn't exist then it will only pull and match on the same type products.
Products that are pulled in are only shown if that product 1.) Matches Product type 2.) Isn't the same product as you're already on 3.) The product's inventory is > 0

- To use this section - 
1) Create new section in Shopify code editor or your editor of choice
2) Name the section whatever you would like
3) Go to your templates and click product.liquid 
4) Where abouts in the product page you would like the section to show make sure to reference the section in this template {% section 'your-name-for-the-section' %}
5) Define and customize this section within the customize area
