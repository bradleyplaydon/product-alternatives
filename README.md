# product-alternatives
This is a section for product pages on Shopify which requires a private app to be created and access to the Storefront API it uses GraphQL to pull products from the Storefront API.
## Contents 
  * Worklow
  * Usage
  * Future Updates

## Workflow 
  1. Section won't show unless the checkbox defined under ID "show_recommendations_on_type" is ticked
  2. Section only shows on products out of stock
  3. Section shows different products based upon whether the "Size_" tag exists for the product or not IF Size tag doesn't exist then it will only pull and match on the same type products.
  4. Products that are pulled in are only shown if that product 1.) Matches Product type 2.) Isn't the same product as you're already on 3.) The product's inventory is > 0

## Usage
1. Create new section in Shopify code editor or your editor of choice
2. Name the section whatever you would like
3. Go to your templates and click product.liquid 
4. Where abouts in the product page you would like the section to show make sure to reference the section in this template {% section 'your-name-for-the-section' %}
5. Define and customize this section within the customize area

## Future Updates
In the future I plan on developing the product alternatives section out more so that it is super easy for anyone to integrate with there own shopify store I will create the instructions on how it works and also redevelop it more so it's more of an out of the box solution.
