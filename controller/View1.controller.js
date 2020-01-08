var self;
var myItemSelected;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"./CustomerFormat",
	"./InitPage"
], function(Controller, Filter, FilterOperator, CustomerFormat, InitPage) {
	"use strict";

	return Controller.extend("Z_EPIC_DSB.controller.View1", {
		//onInit
		onInit: function() {

		},
		//Common Function
		onViewLevelChange: function(evt) {

			var viewLevel = evt.getParameter("selectedItem").getKey();
			var navCon = this.byId("navCon");
			navCon.to(this.byId(viewLevel));
			if (viewLevel === "userStoryPage") {
				self = this;
				var sampleOData = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZADOP_UI5_DSB_SRV/", true);
				var sampleDatajson = new sap.ui.model.json.JSONModel();

				sampleOData.read("/ZC_CHART?$select=project_track", null, null, true, function(odata, oResponse) {
					sampleDatajson.setData(odata);
					self.byId("userStoryComboBox").setModel(sampleDatajson, "sampleDatajson");
					self.myItemSelected = sampleDatajson.getProperty("/results/0/project_track");
					self.refreshDataUserStory(self.myItemSelected);
				});
			}
			//this.getView().byId("viewLevelComboBox").setValue("Epic Level");
		},
	/*	onViewLevelChangeUserStory: function(evt) {

			var viewLevel = evt.getParameter("selectedItem").getKey();
			var navCon = this.byId("navCon");
			navCon.to(this.byId(viewLevel));
			if (viewLevel === "epicPage") {
				self = this;
				var sUrl = "/sap/opu/odata/sap/ZADOP_EPIC_DSB_SRV/";
				var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
				sap.ui.getCore().setModel(oModel);
					var sampleOData = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZADOP_UI5_DSB_SRV/", true);
					var sampleDatajson = new sap.ui.model.json.JSONModel();

					sampleOData.read("/ZC_CHART_EP", null, null, true, function(odata, oResponse) {
						sampleDatajson.setData(odata);
						self.byId("userStoryComboBox").setModel(sampleDatajson, "sampleDatajson");
						self.myItemSelected = sampleDatajson.getProperty("/results/0/project_track");
						self.refreshDataUserStory(self.myItemSelected);
					});
			}

		},*/
		//Epic Related Functions
		onRowClickEpic: function(evt) {
			//Get the User Story from the selected row.
			var source = evt.getSource();
			var sPath = source.getBindingContextPath();
			var tableData = this.getView().byId("epicSmartTable").getModel();
			var rowData = tableData.getProperty(sPath);
			var epicId = rowData.EpicId;
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			// generate the Hash to display a Supplier
			var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "ZPROJ_LEAD_EP",
					action: "display"
				}
			})) || "";
			//Generate a  URL for the second application
			var url = window.location.href.split("#")[0] + hash + "&/ZC_ADOP_EPIC('" + epicId + "')";
			//Navigate to second app
			sap.m.URLHelper.redirect(url, true);
		},
		beforeRebindChartEpic: function(oSource) {

		},
		//User Story Related Functions
		onSelectionUserStory: function(oEvent) {
			this.myItemSelected = oEvent.getParameter("selectedItem").getText();
			self.refreshDataUserStory(this.myItemSelected);
		},
		refreshDataUserStory: function(itSelected) {
			this.myItemSelected = itSelected;

			this.getView().byId("userStoryChart1").rebindChart();
			this.getView().byId("userStoryChart2").rebindChart();
			this.getView().byId("userStoryChart3").rebindChart();
			this.getView().byId("userStoryChart4").rebindChart();

			this.getView().byId("userStorySmartTable").attachBeforeRebindTable(this.onBeforeRebindTableUserStory, this);
			this.getView().byId("userStorySmartTable").rebindTable();
			this.getView().byId("userStorySmartTable").detachBeforeRebindTable(this.onBeforeRebindTableUserStory, this);

		},
		beforeRebindChartUserStory: function(oSource) {
			var mBindings = oSource.getParameter("bindingParams");
			var oFilters = [];
			oFilters = [new Filter("project_track", FilterOperator.EQ, this.myItemSelected)];
			mBindings.filters = oFilters;
		},

		onBeforeRebindTableUserStory: function(oSource) {

			var mBindings = oSource.getParameter("bindingParams");
			var oFilters = [];
			oFilters = [new Filter("ProjectTrack", FilterOperator.EQ, this.myItemSelected)];
			mBindings.filters = oFilters;

		},
		onRowClickUserStory: function(evt) {
			//Get the User Story from the selected row.
			var source = evt.getSource();
			var sPath = source.getBindingContextPath();
			var tableData = this.getView().byId("userStorySmartTable").getModel();
			var rowData = tableData.getProperty(sPath);
			var userStoryId = rowData.UserStoryId;
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			// generate the Hash to display a Supplier
			var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "ZPRJ_LEAD",
					action: "track"
				}
			})) || "";
			//Generate a  URL for the second application
			var url = window.location.href.split("#")[0] + hash + "&/ZC_ADOP_USERSTORY('" + userStoryId + "')";
			//Navigate to second app
			sap.m.URLHelper.redirect(url, true);
		}
	});
});