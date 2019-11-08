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
            this.registerLeftDrawerCustomizations();
            this.registerErrorLogCustomizations();

        },
        registerContactCustomizations: function () {

            this.registerCustomization('detail', 'account_detail', {
              at: function(row) { return row.name == 'ContactRelated'; },
              type: 'modify',
              value: {
                where: function (entry) { return "Account.id eq '" + entry['$key'] + "' and ErpStatus eq 'Open'"}
              }
            });

        },
        registerLeadCustomizations: function () {

            // NOTICE: This is the proper method of modifying query parameters for 3.4 and later.
            // querySelect customizations should now go into the model, not the view.
            this.registerCustomization('models/detail/querySelect', 'lead_sdata_model', {
                at: function() { return true; },
                type: 'insert',
                where: 'after',
                value: 'Status'
            });

            this.registerCustomization('detail', 'lead_detail', {
                at: function (row) { return row.name == 'Company'; },
                type: 'insert',
                where: 'after',
                value: {
                    name: 'Status',
                    label: 'Status',
                    property: 'Status',
                    renderer: format.picklist('Status')
                }
            });

            // // NOTICE: This is the depreciated way of editing the querySelect
            // // Left for example only
            // dojo.extend(crm.Views.Lead.Edit, {
            //     querySelect: crm.Views.Lead.Edit.prototype.querySelect.concat([
            //     'Status'
            //     ])
            // });

            // Modify the model to include Status in the query
            this.registerCustomization('models/edit/querySelect', 'lead_sdata_model', {
                at: function() { return true; },
                type: 'insert',
                where: 'after',
                value: 'Status'
            });
            // Insert the new field in the Edit page for leads
            this.registerCustomization('edit', 'lead_edit', {
                at: function (row) { return row.name == 'Company'; },
                type: 'insert',
                where: 'after',
                value: {
                    name: 'Status',
                    label: 'Status',
                    property: 'Status',
                    type: 'picklist',
                    picklist: 'Lead Status',
                    requireSelection: true,
                    title: 'Lead Status'
                }
            });
            // Auto
            // this.registerCustomization('edit','lead_edit',{
            //     at: function(row) { return row.name == 'Company'; }

            // });

        },
        registerLeftDrawerCustomizations: function () {
            // Extend view to add call method to inserting a new lead
            lang.extend(crm.Views.LeftDrawer,{
                addNewLead: function addNewLead() {
                    const view = App.getView('lead_edit');
                    if (view) {
                      view.show({
                        insert: true,
                      });
                      this.closeAppMenu();
                    }
                }
            });
            // Modify existing quick action to add lead instead
            this.registerCustomization('left_drawer', 'left_drawer', {
                at: function (row) {
                    return row.name == 'AddAccountContactAction'
                },
                type: 'modify',
                value: {
                    name: 'AddLeadAction',
                    title: 'Add New Lead',
                    action: 'addNewLead',
                    security: 'Entities/Lead/Add'
                }
            });
            // Set default order and buttons for CRM Left Pane GoTo Menu

        },
        registerErrorLogCustomizations: function(){
            /* Taken directly from argos-sample*/
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
                defaultToAddress: 'itadmin@centralazsupply.com',

                // for mobile devices this string will be set as the Subject: field
                emailSubjectText: 'SLXMobile Error Report',

                // for desktops the message to display when it is copied to clipboard
                copiedSuccessText: 'Error Report copied to clipboard'
            });
        },
    });
});

