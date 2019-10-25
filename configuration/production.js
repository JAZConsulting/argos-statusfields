define('configuration/statusfields/production', ['configuration/production', 'Mobile/StatusFields/ApplicationModule'], function(baseConfiguration, StatusFieldsApplicationModule) {
    baseConfiguration.modules.push(new StatusFieldsApplicationModule());
    return baseConfiguration;
});