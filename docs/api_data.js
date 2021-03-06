define({ "api": [
  {
    "type": "get",
    "url": "/diagnosis/condtion",
    "title": "ConditionInfo",
    "name": "ConditionInfoAPI",
    "group": "API",
    "version": "1.0.0",
    "description": "<p>Advises for given diagnosis/medical condition</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "condition",
            "description": "<p>Name of the Issue/condtion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"condition\":\"Pneumonia\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Info",
            "description": "<p>List of info about the Issue/condtion as per scrapping function</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Info.Condition",
            "description": "<p>Given query condition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Info.Treatment",
            "description": "<p>Treatment advice for given Issue/condtion</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Info.Prevention",
            "description": "<p>Prevention advice for given Issue/condition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Info.Specialty",
            "description": "<p>Specialty required for given Issue/condition</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"Condition\": \"pneumonia\",\n\t\"Treatment\": null,\n\t\"Prevention\": \"Vaccines, handwashing, not smoking\",\n\t\"Specialty\": \"Pulmonology, Infectious disease\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\nBad Request",
          "type": "text/plain"
        }
      ]
    },
    "filename": "App/routes/apiRoutes.js",
    "groupTitle": "API"
  },
  {
    "type": "post",
    "url": "/diagnosis",
    "title": "Diagnosis",
    "name": "DiagnosisAPI",
    "group": "API",
    "version": "1.0.0",
    "description": "<p>List diagnosis for given symptom(s)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "symptoms",
            "description": "<p>Array of Symptom IDs for which to perform diagnosis</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"male\"",
              "\"female\""
            ],
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of the patient</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year_of_birth",
            "description": "<p>Year of Birth of the patient</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"symptoms\":\"[10,104]\",\n\t\"gender\":\"male\",\n\t\"year_of_birth\":1997\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Conditions",
            "description": "<p>List of medical conditions diagnosed as per given details</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Conditions.Issues",
            "description": "<p>List of properties of a particular medical condition</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Conditions.Specialisation",
            "description": "<p>List of Specialisation for a particular medical condition</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Conditions.Issues.ID",
            "description": "<p>Issue ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Conditions.Issues.Name",
            "description": "<p>Issue Name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Conditions.Issues.Accuracy",
            "description": "<p>Accuracy of Issue based on symptoms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Conditions.Issues.Icd",
            "description": "<p>Issue Icd</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Conditions.Issues.IcdName",
            "description": "<p>Issue Name of Icd</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Conditions.Issues.ProfName",
            "description": "<p>Issue Professional Name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Conditions.Issues.Ranking",
            "description": "<p>Ranking of Issue</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Conditions.Specialisation.ID",
            "description": "<p>Specialisation ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Conditions.Specialisation.Name",
            "description": "<p>Specialisation Name</p>"
          },
          {
            "group": "Success 200",
            "type": "Name",
            "optional": false,
            "field": "Conditions.Specialisation.SpecialistID",
            "description": "<p>ID of specialist for list Specialisation, =0 if unavailable</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n\t\t\"Issue\": {\n\t\t\t\"ID\": 324,\n\t\t\t\"Name\": \"Kidney stones\",\n\t\t\t\"Accuracy\": 89.99999,\n\t\t\t\"Icd\": \"N20\",\n\t\t\t\"IcdName\": \"Calculus of kidney and ureter\",\n\t\t\t\"ProfName\": \"Nephrolith\",\n\t\t\t\"Ranking\": 1\n\t\t},\n\t\t\"Specialisation\": [\n\t\t\t{\n\t\t\t\t\"ID\": 15,\n\t\t\t\t\"Name\": \"General practice\",\n\t\t\t\t\"SpecialistID\": 0\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"ID\": 42,\n\t\t\t\t\"Name\": \"Urology\",\n\t\t\t\t\"SpecialistID\": 0\n\t\t\t}\n\t\t]\n\t}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\nInternal Server Error",
          "type": "text/plain"
        }
      ]
    },
    "filename": "App/routes/apiRoutes.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/diagnosis/medication",
    "title": "MedicationInfo",
    "name": "MedicationInfoAPI",
    "group": "API",
    "version": "1.0.0",
    "description": "<p>Advises for given diagnosis/medical condition</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "condition",
            "description": "<p>Name of the Issue/condtion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"condition\":\"Kidney Stones\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Info",
            "description": "<p>List of info about the Issue/condtion as per scrapping function</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Info.Condition",
            "description": "<p>Given query condition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Info.Treatment",
            "description": "<p>Treatment advice for given Issue/condtion</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Info.Prevention",
            "description": "<p>Prevention advice for given Issue/condition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Info.Specialty",
            "description": "<p>Specialty required for given Issue/condition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Info.Medication",
            "description": "<p>Medication for given Issue/condition</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"Condition\": \"kidney stones\",\n\t\"Treatment\": Pain medication, extracorporeal shock wave lithotripsy, ureteroscopy, percutaneous nephrolithotomy,\n\t\"Prevention\": \"Drinking fluids such that more than two liters of urine are produced per day\",\n\t\"Specialty\": \"Urology, nephrology\",\n\t\"Medication\":\"Allopurinol Cellulose Sodium Phosphate Citrates Diuretics, Thiazide Penicillamine Sodium Bicarbonate Tiopronin\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\nBad Request",
          "type": "text/plain"
        }
      ]
    },
    "filename": "App/routes/apiRoutes.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/symptoms",
    "title": "Symptoms",
    "name": "SymptomsAPI",
    "group": "API",
    "version": "1.0.0",
    "description": "<p>List all symptoms from ApiMedic</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Symptoms",
            "description": "<p>List of symptoms</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Symptoms.ID",
            "description": "<p>Symptom ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Symptoms.Name",
            "description": "<p>Symptom Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n\t\t\"ID\": 10,\n\t\t\"Name\": \"Abdominal pain\"\n\t},\n\t{\n\t\t\"ID\": 238,\n\t\t\"Name\": \"Anxiety\"\n\t},\n\t{\n\t\t\"ID\": 104,\n\t\t\"Name\": \"Back pain\"\n\t},\n\t{\n\t\t\"ID\": 75,\n\t\t\"Name\": \"Burning eyes\"\n\t},\n\t{\n\t\t\"ID\": 46,\n\t\t\"Name\": \"Burning in the throat\"\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "App/routes/apiRoutes.js",
    "groupTitle": "API"
  }
] });
