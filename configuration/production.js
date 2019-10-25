define('configuration/statusfields/production', ['configuration/production', 'Mobile/StatusFields/ApplicationModule'], function(baseConfiguration, StatusFieldsApplicationModule) {
    return mergeConfiguration(baseConfiguration, {
        modules: [
            new StatusFieldsApplicationModule()
        ]
    });
});