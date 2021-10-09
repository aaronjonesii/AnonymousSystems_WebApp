export interface FormField {
  fieldName: string;
  fieldType: string;
  required: boolean;
  validator: string;
}

export let dynamicFormFields = [
  {
    "fieldName": "Name",
    "fieldType": "text",
    "required": true,
  },
  {
    "fieldName": "Email",
    "fieldType": "email",
    "required": true,
    "validator": "email",
  },
]
