define('configuration/statusfields/development', ['configuration/development', 'Mobile/StatusFields/ApplicationModule'], function(baseConfiguration, StatusFieldsApplicationModule) {
    return mergeConfiguration(baseConfiguration, {
        modules: [
            new StatusFieldsApplicationModule()
        ]
    });
});