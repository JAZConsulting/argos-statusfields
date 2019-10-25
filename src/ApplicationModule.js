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
    return dojo.declare('Mobile.StatusFields.ApplicationModule', ApplicationModule, {
/*##############################################################################################
    LOCALIZATION STRINGS
##############################################################################################*/

/*##############################################################################################
    REGISTER CUSTOM VIEWS
##############################################################################################*/

/*##############################################################################################
    REGISTER CUSTOMIZATIONS
##############################################################################################*/
        loadCustomizations: function () {
            this.inherited(arguments);

            this.registerLeadCustomizations();
            this.registerContactCustomizations();

        },
        registerContactCustomizations: function () {

        },
        registerLeadCustomizations: function () {

            // Remove the Add Account/Contact option from the left drawer/global menu
            // ** WOULD PREFER TO CONVER TO ADD LEAD
            this.registerCustomization('left_drawer', 'left_drawer', {
                at: function (row) {
                    return row.name === 'AddAccountContactAction';
                },
                type: 'remove'
            });

            this.registerCustomization('detail', 'lead_detail', {
                at: function (row) { return row.name == 'Owner.OwnerDescription'; },
                type: 'insert',
                where: 'after',
                value: {
                    name: 'Status',
                    label: 'Status',
                    property: 'Status',
                    // CODE FROM ARGOS-SALESLOGIX/SRC/VIEWS/LEAD/EDIT.js
                    renderer: format.picklist(this.app.picklistService, this._model, 'Lead Status'),
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
                    renderer: format.picklist(this.app.picklistService, this._model, 'Lead Status'),
                }
            });
        }
    });
});