# Infor CRM Customizations
The following customization applies to Infors Mobile CRM platform. To get started, you should already have: 

* Infor Saleslogix CRM
* a development environment

The following is taken from the original saleslogix client git, which is linked at the bottom of the section. Use this to set up your argos environment, then head to the next section.

- - -

## Infor CRM Mobile
argos-saleslogix utilized the [argos-sdk](https://github.com/Saleslogix/argos-sdk) to form the Infor CRM Mobile application. It includes list, detail, and edit views for most of the core CRM entities, such as Accounts, Contacts, Tickets, Leads, Opportunities, and Activities. Additional entities are available if the back office extensions (BOE) integration is enabled.

## API
The Infor CRM Mobile team maintains an "argos" documentation site available [here](http://developer.saleslogix.com/argos/). Additional guides are also available on the [argo-sdk](https://github.com/Saleslogix/argos-sdk/wiki) wiki. A sample customization is available [here](https://github.com/Saleslogix/argos-sample).

## Original Saleslogix Client
The original, unaltered Saleslogix Client can be found [here](https://github.com/Saleslogix/argos-saleslogix)

- - -

# Installing argos-statusfields
This is a Product (Add-on) for Infor's Saleslogix CRM Mobile Application. This mod overlays directly on top of the stock argos-saleslogix application. 
1.\ Navigate to your products folder. Run the command:
```
    git clone https://github.com/JAZConsulting/argos-statusfields 
```

2.\ Verify that you have a folder structer that looks like: 

mobile 
      |
      > argos-sdk
      > products
               |
               > argos-saleslogix
               > argos-statusfields

3.\ copy the index-dev-statusfields.html file into the root of argos-saleslogix, you can use this command:
```
    cp ./index-dev-statusfields.html ../argos-saleslogix/
```
4\.	In your browser, open index-dev-sample.html from the file system, or...navigate to the path `/mobile/products/argos-saleslogix/index-dev-sample.html` on your web server, eg:

		http://localhost/mobile/products/argos-saleslogix/index-dev-sample.html
    
5.\ For more resources, please look at the original documentation on the [Saleslogix Page](https://github.com/Saleslogix)    

