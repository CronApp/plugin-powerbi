(function() {
  'use strict';

  this.cronapi = this.cronapi || {};

   /**
   * @categoryName PowerBI
   */
  this.cronapi.myfunctions = this.cronapi.myfunctions || {};
  
  /**
   * @type function
   * @name Embutir Relatório
   * @description Embutir Relatório
   * @multilayer false
   * @param {ObjectType.STRING} embedContainerId Embed Container Id
   * @param {ObjectType.STRING} accessToken Access Token
   * @param {ObjectType.STRING} embedUrl Embed URL
   * @param {ObjectType.STRING} embedReportId Embed Report ID
   * @param {ObjectType.STRING} tokenType Token Type
   * @returns {ObjectType.STRING}
   */
  this.cronapi.myfunctions.powerBIEmbedReport = function(embedContainerId, accessToken, embedUrl, embedReportId, tokenType) {
        // Get models. models contains enums that can be used.
        let models = window['powerbi-client'].models;

        // We give All permissions to demonstrate switching between View and Edit mode and saving report.
        let permissions = models.Permissions.All;

        // Create the embed configuration object for the report
        // For more information see https://go.microsoft.com/fwlink/?linkid=2153590
        let config = {
            type: 'report',
            tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
            accessToken: accessToken,
            embedUrl: embedUrl,
            id: embedReportId,
            permissions: permissions,
            settings: {
                panes: {
                    filters: {
                        visible: true
                    },
                    pageNavigation: {
                        visible: true
                    }
                }
            }
        };

        // Get a reference to the embedded report HTML element
        let embedContainer = $('#' + embedContainerId)[0];
        
        powerbi.bootstrap(embedContainer, { type: "report" });

        // Embed the report and display it within the div container.
        let report = powerbi.embed(embedContainer, config);

        // report.off removes all event handlers for a specific event
        report.off("loaded");

        // report.on will add an event handler
        report.on("loaded", function () {
            loadedResolve();
            report.off("loaded");
        });

        // report.off removes all event handlers for a specific event
        report.off("error");

        report.on("error", function (event) {
            console.log(event.detail);
        });

        // report.off removes all event handlers for a specific event
        report.off("rendered");

        // report.on will add an event handler
        report.on("rendered", function () {
            renderedResolve();
            report.off("rendered");
        });
  };
  

}).bind(window)();