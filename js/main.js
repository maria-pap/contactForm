// Product complaint required fields

var complaintDepedentFields =
{
    init: function () {
        var contactForm = document.getElementById("contactForm")
        complaintEnquiry = document.getElementById("enquiryType"),
        btnSubmit = document.getElementById("btnSubmit");

        // Event listener for form field change
        //$(complaintEnquiry).on("change", function () { if (complaintEnquiry.value == "complaint") { complaintDepedentFields.changeListener(); } });
        if (complaintEnquiry.addEventListener) {
            complaintEnquiry.addEventListener("change", function () { if (complaintEnquiry.value == "complaint") { complaintDepedentFields.changeListener(); } }, false);
        }
        else {
            complaintEnquiry.attachEvent("onchange", function () { if (complaintEnquiry.value == "complaint") { complaintDepedentFields.changeListener(); } });
        }

        // Event listener for submit button click
        //$(btnSubmit).on("click", complaintDepedentFields.clickListener);
        if (btnSubmit.addEventListener) {
            btnSubmit.addEventListener("click", complaintDepedentFields.clickListener, false);
        }
        else {
            btnSubmit.attachEvent("onclick", complaintDepedentFields.clickListener);
        }

        // Read required fields and their labels
        var depedentFieldContainers = contactForm.getElementsByClassName("complaintDepedent");
        contactForm._dependentLabels = [];
        contactForm._dependentFields = [];

        for (var i = 0, max = depedentFieldContainers.length; i < max; i++) {
            var dependentField = depedentFieldContainers[i].getElementsByTagName("input")[0],
                dependentLabel = depedentFieldContainers[i].getElementsByTagName("label")[0];
            contactForm._dependentLabels[contactForm._dependentLabels.length] = dependentLabel;
            contactForm._dependentFields[contactForm._dependentFields.length] = dependentField;

            //$(dependentField).on("change", function () { if (complaintEnquiry.value == "complaint") { complaintDepedentFields.changeListener(); } });

            if (dependentField.addEventListener) {
                dependentField.addEventListener("change", function () { if (complaintEnquiry.value == "complaint") { complaintDepedentFields.changeListener(); } }, false);
            }
            else {
                dependentField.attachEvent("onchange", function () { if (complaintEnquiry.value == "complaint") { complaintDepedentFields.changeListener(); } });
            }
        }

    },

    changeListener: function (event) {
        // Actions when a form field changes
        complaintDepedentFields.updateDependents();
    },

    clickListener: function (event) {
        // Actions when the submit button is clicked
        var complaintEnquiry = document.getElementById("enquiryType");

        if (complaintEnquiry.value == "complaint") {
            var dependedFields = contactForm._dependentFields,
                empty = false;
            for (var i = 0, max = dependedFields.length; i < max; i++) {
                var fieldValue = dependedFields[i].value;

                if (fieldValue.length == 0) {
                    empty = true;
                }
            }

            if (empty) {
                event.preventDefault();
                complaintDepedentFields.updateDependents();
            }
        }
    },

    updateDependents: function () {
        // Update dependent fields according to input value, empty or not empty
        var dependentLabels = contactForm._dependentLabels,
            dependedFields = contactForm._dependentFields;
        if (!dependedFields) {
            return;
        }

        for (var i = 0, max = dependedFields.length; i < max; i++) {
            var empty = true;
            var fieldValue = dependedFields[i].value;


            if (fieldValue.length > 0) {
                empty = false;
            }

            if (empty) {
                complaintDepedentFields.writeNotification(dependentLabels[i]);
            }
            else {
                complaintDepedentFields.removeNotification(dependentLabels[i]);
            }
        }
    },

    writeNotification: function (field) {
        // Indicate that the field is required and should have a value
        //$(field).addClass("requiredLabel redLetters");
        field.className = "requiredLabel redLetters";
    },

    removeNotification: function (field) {
        // Remove required indication when field gets a value
        //$(field).removeClass("requiredLabel redLetters");
        field.className = "";
    }
};

complaintDepedentFields.init();