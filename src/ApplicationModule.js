define('Mobile/StatusFields/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/query',
    'dojo/dom-class',
    'crm/Format',
    'crm/Models/Account/SData',
    'argos/ApplicationModule',
    'crm/Application'
], function (
    declare,
    lang,
    string,
    query,
    domClass,
    format,
    AccountSDataModel,
    ApplicationModule,
    CRMApplication
) {
    return declare('Mobile.StatusFields.ApplicationModule', ApplicationModule, {
/*##############################################################################################
    LOCALIZATION STRINGS
##############################################################################################*/

/*##############################################################################################
    REGISTER CUSTOM VIEWS
##############################################################################################*/
        loadViews: function() {
            this.inherited(arguments);
        },
/*##############################################################################################
    REGISTER CUSTOMIZATIONS
##############################################################################################*/
        loadCustomizations: function () {
            this.inherited(arguments);

            this.registerContactCustomizations();
            this.registerLeadCustomizations();
            this.registerGeneralCustomizations();
            this.registerErrorLogCustomizations();

        },
        registerContactCustomizations: function () {

        },
        registerLeadCustomizations: function () {

            this.registerCustomization('detail', 'lead_detail', {
                at: function (row) { return row.name == 'Owner.OwnerDescription'; },
                type: 'insert',
                where: 'after',
                value: {
                    name: 'Status',
                    label: 'Status',
                    property: 'Status',
                    // CODE FROM ARGOS-SALESLOGIX/SRC/VIEWS/LEAD/EDIT.js
                    renderer: format.picklist('Lead Status'),
                }
            });

            this.registerCustomization('detail', 'lead_edit', {
                at: function (row) { return row.name == 'Owner.OwnerDescription'; },
                type: 'insert',
                where: 'after',
                value: {
                    name: 'Status',
                    label: 'Status',
                    property: 'Status',
                    renderer: format.picklist('Lead Status'),
                }
            });
        },
        registerGeneralCustomizations: function () {
            // Remove the Add Account/Contact option from the left drawer/global menu
            // ** WOULD PREFER TO CONVER TO ADD LEAD
            this.registerCustomization('left_drawer', 'left_drawer', {
                at: function (row) {
                    return row.name === 'AddAccountContactAction';
                },
                type: 'remove'
            });

        },
        /* Taken directly from argos-sample*/
        registerErrorLogCustomizations: function(){
            /*
                When a server error occurs the server response is parsed and saved to localStorage (and in current session memory)
                A user may then go to Settings -> View Error Logs and see the last 10 errors
                The Detail view of an error log contains either an email button (mobile devices) or copy to clipboard button (desktops).

                The following properties are exposed so that you may tailor as needed:
             */
            lang.mixin(argos.ErrorManager, {
                // number of error logs to keep on device, defaults to 10
                errorCacheSizeMax: 15
            });

            lang.extend(crm.Views.ErrorLog.Detail, {
                // for mobile devices this string will set as the To: field
                // defaults to empty
                defaultToAddress: 'techs@super-support.com',

                // for mobile devices this string will be set as the Subject: field
                emailSubjectText: 'SLXMobile Error Report',

                // for desktops the message to display when it is copied to clipboard
                copiedSuccessText: 'Error Report copied to clipboard'
            });
        },
    });
});