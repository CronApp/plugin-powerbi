(function() {
  'use strict';

  this.cronapi = this.cronapi || {};

   /**
   * @categoryName Power BI
   */
  this.cronapi.myfunctions = this.cronapi.myfunctions || {};
  
  /**
   * @type function
   * @name Embutir Relatório
   * @description Embutir Relatório
   * @multilayer false
   * @param {ObjectType.STRING} input Param Description
   * @returns {ObjectType.STRING}
   */
  this.cronapi.myfunctions.powerBIEmbedReport = function(/** @type {ObjectType.STRING} @description Parâmetro: Descrição do parâmetro */input) {
    return "INPUT" + input;
  };
  

}).bind(window)();