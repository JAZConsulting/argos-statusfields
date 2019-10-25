define('configuration/statusfields/development', ['configuration/development', 'Mobile/StatusFields/ApplicationModule'], function(baseConfiguration, StatusFieldsApplicationModule) {
    baseConfiguration.modules.push(new StatusFieldsApplicationModule());
    return baseConfiguration;
});