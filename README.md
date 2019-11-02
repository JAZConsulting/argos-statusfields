# Infor CRM Customizations
The following customization applies to Infors Mobile CRM platform. To get started, you should already have: 

* Infor Saleslogix CRM
* a development environment

The following is taken from the original saleslogix client git, which is linked at the bottom of the section. Use this to set up your argos environment, then head to the next section.

- - -
- - -

## Infor CRM Mobile
argos-saleslogix utilized the [argos-sdk](https://github.com/Saleslogix/argos-sdk) to form the Infor CRM Mobile application. It includes list, detail, and edit views for most of the core CRM entities, such as Accounts, Contacts, Tickets, Leads, Opportunities, and Activities. Additional entities are available if the back office extensions (BOE) integration is enabled.

## API
The Infor CRM Mobile team maintains an "argos" documentation site available [here](http://developer.saleslogix.com/argos/). Additional guides are also available on the [argo-sdk](https://github.com/Saleslogix/argos-sdk/wiki) wiki. A sample customization is available [here](https://github.com/Saleslogix/argos-sample).

## Original Saleslogix Client
The original, unaltered Saleslogix Client can be found [here](https://github.com/Saleslogix/argos-saleslogix)

- - -
- - -

# Installing argos-statusfields in debug mode
### NOTE: You should not start this until you can run the default saleslogix application in your web browser
This is a Product (Add-on) for Infor's Saleslogix CRM Mobile Application. This mod overlays directly on top of the stock argos-saleslogix application. To install:

1.\ Navigate into your products folder. Run the command:
```
    git clone https://github.com/JAZConsulting/argos-statusfields 
```

2.\ Now is a good time to verify that you have a folder structure that looks like this (NOTE: you will add to this): 
```
mobile 
      |
      > argos-sdk
      > products <=== You are here ===|
               |
               > argos-saleslogix
               > argos-statusfields
```
3.\ copy the index-dev-statusfields.html file into the root of argos-saleslogix, you can use this command (NOTE: the command is relative to the mobile/products folder):
```
    cp ./argos-statusfields/index-dev-statusfields.html ./argos-saleslogix/
```
4.\	([taken from argos-sample](https://github.com/argos-sample/))In your browser, open index-dev-sample.html from the file system, or...navigate to the path `/mobile/products/argos-saleslogix/index-dev-sample.html` on your web server, eg:

		http://localhost/mobile/products/argos-saleslogix/index-dev-sample.html
    
5.\ For more resources/troubleshooting hints, please look at the original documentation on the [Saleslogix Page](https://github.com/Saleslogix) as this module follows the same/similar setup. *DO NOT USE THEIR EXAMPLES/SAMPLES FOR THE index-dev-xxx.html FILES, ESPECIALLY DON'T USE THE ONE IN argos-sample*

# Building argos-statusfields into argos-saleslogix (NO AA)
I have not had the best luck with resources from Infor in regards to CRM Mobile, so I have stuck with the 'bare-bones' method of modifying Infor's CRM Mobile; Plus, the saleslogix team already provides detailed information regarding using AA for deployment. Here is some information on my dev environment:

* Windows 10/2016 Environment
* NPM & Grunt are both installed on the Web Server where I develop/build
* you can GIT Bash or some other linux for some debugging/development processes
* **you must use native windows CMD for the build && release processes**

This guide will pertain to *Windows environments*, though I am sure those using Linux can modify this accordingly; argos-sdk && argos-saleslogix contain all of the 'bare-bones' tools for either linux or windows environments. We will be following the directions [taken from argos-sample](https://github.com/argos-sample/) so you can use those as an extra reference, but we will be deviating from those steps:

1.\ ([taken from argos-sample](https://github.com/argos-sample/)) 
Information about your customization module is defined in the module-info.json file at the root directory. This information will be displayed in Application Architect for easy identification and versioning. Edit this file to include your information.

```
	mobile/products/argos-statusfields/module-info.json
```

2.\ ([taken from argos-sample](https://github.com/argos-sample/)) 
Edit the Gruntfile.js in products/argos-saleslogix, add the product name (argos-statusfields) to the products configuration under grunt.initConfig. The basePath property is relative to products/argos-saleslogix

3.\ Open the windows command prompt and run the following commands (NOTE: assuming you're in products/argos-statusfields):

```
	.\build\release.cmd
  cd ..\..\argos-sdk\
	.\build\release.cmd
	cd ..\products\argos-saleslogix\
	.\build\release.cmd
```

4.\ You should have a deployment folder set up which will hold all of the built, minified code. Here is my full structure, but you can use any deployed site/folder
```
code
	|
	> mobile <=== THIS IS MY PRIVATE DEV ENVIRONMENT ===|
	       |
	       > argos-sdk
	       > products
	                |
	                > argos-saleslogix
	                > argos-statusfields
	> deploy   <=== THIS IS MY PUBLIC DEPLOYMENT FOLDER ===|
```
Copy all of the files from ```products/argos-sdk/deploy/``` into your deploy folder. Copy all of the files from ```products/argos-saleslogix/deploy/``` into your deploy folder. Copy all of the files from ```products/argos-statusfields/deploy/``` into your deploy folder. 

5.\ Open the file ```module-fragment.html``` in your argos-statusfields folder. Copy the text with in the file, it should look like this

```
	<!-- CAS Module -->
	<script type="text/javascript" src="content/javascript/argos-statusfields.js"></script>
```

6.\ ([taken from argos-sample](https://github.com/argos-sample/)) Edit ```index.html```, ```index-nocache.html``` and ```index.ascx``` by copying the lines from module-fragment.html (the ones you added earlier, this file is not copied into the deploy folder so look for it in your normal dev directory) into each file at the designated modules marker:

```
    <!-- Modules -->
    <!--{{modules}}-->
```

To:

```
	<!-- CAS Module -->
	<script type="text/javascript" src="content/javascript/argos-statusfields.js"></script>
```

7.\ Now, we need to edit the ```index.html``` and ```index.nocache.html``` file to include our production config file: Edit the following: 

```
	require(['crm/polyfills/index', 'crm/Bootstrap'], function(polyfills, bootstrap) {
        bootstrap({
          supportedLocales: supportedLocales,
          defaultLocale: defaultLocale,
          currentLocale: currentLocale,
          parentLocale: parentLocale,
          defaultRegionLocale: defaultRegionLocale,
          currentRegionLocale: currentRegionLocale,
          parentRegionLocale: parentRegionLocale,
          isRegionMetric: false,
          configuration: [
            'configuration/production',
            
          ],
          application: 'crm/Application',
          legacyLocalization: [
            'localization/saleslogix/en'
          ],
          legacyLocalizationFallback: [
            'localization/saleslogix/en'
          ],
          localeFiles: [
            './localization/locales/crm/en/strings.l20n',
            './localization/locales/icboe/en/strings.l20n',
            './localization/locales/contour/en/strings.l20n',
            './localization/locales/argos/en/strings.l20n',
          ],
          regionalFiles: [
            './localization/locales/crm/en/regional.l20n',
            './localization/locales/icboe/en/regional.l20n',
            './localization/locales/argos/en/regional.l20n',
          ],
          rootElement: document.getElementById('rootNode')
        });
```

To:

```
 require(['crm/polyfills/index', 'crm/Bootstrap'], function(polyfills, bootstrap) {
        bootstrap({
          supportedLocales: supportedLocales,
          defaultLocale: defaultLocale,
          currentLocale: currentLocale,
          parentLocale: parentLocale,
          defaultRegionLocale: defaultRegionLocale,
          currentRegionLocale: currentRegionLocale,
          parentRegionLocale: parentRegionLocale,
          isRegionMetric: false,
          configuration: [
            'configuration/production',
            'configuration/statusfields/production'
          ],
          application: 'crm/Application',
          legacyLocalization: [
            'localization/saleslogix/en'
          ],
          legacyLocalizationFallback: [
            'localization/saleslogix/en'
          ],
          localeFiles: [
            './localization/locales/crm/en/strings.l20n',
            './localization/locales/icboe/en/strings.l20n',
            './localization/locales/contour/en/strings.l20n',
            './localization/locales/argos/en/strings.l20n',
          ],
          regionalFiles: [
            './localization/locales/crm/en/regional.l20n',
            './localization/locales/icboe/en/regional.l20n',
            './localization/locales/argos/en/regional.l20n',
          ],
          rootElement: document.getElementById('rootNode')
        });
```

8.\ Profit! You should now navigate to your deployment folder and log into your newly customized crm 
