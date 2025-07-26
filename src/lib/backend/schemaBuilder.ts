// src/lib/backend/schemaBuilder.ts
import { Schema, model } from 'mongoose';

/**
 * Generate Mongoose Schema code based on model name and field definitions.
 * 
 * @param {string} modelName - Name of the model (e.g., 'User', 'Post')
 * @param {object} fields - Fields for the schema with type and validation options.
 * @returns {string} - Generated Mongoose schema as string.
 */
export const generateSchema = (modelName: string, fields: { [key: string]: any }) => {
  let schemaCode = `import { Schema, model } from 'mongoose';

  const ${modelName}Schema = new Schema({`;

  // Loop through each field and build the schema definition
  Object.keys(fields).forEach(field => {
    const fieldOptions = fields[field];
    
    schemaCode += `
    ${field}: { 
      type: ${fieldOptions.type || 'String'}, 
      required: ${fieldOptions.required || false},
      ${fieldOptions.unique ? `unique: true,` : ''}
      ${fieldOptions.default ? `default: ${JSON.stringify(fieldOptions.default)},` : ''}
      ${fieldOptions.enum ? `enum: ${JSON.stringify(fieldOptions.enum)},` : ''}
      ${fieldOptions.ref ? `ref: '${fieldOptions.ref}',` : ''}
    },`;
  });

  // Close schema definition
  schemaCode += `});

  export default model("${modelName}", ${modelName}Schema);`;

  return schemaCode;
};
