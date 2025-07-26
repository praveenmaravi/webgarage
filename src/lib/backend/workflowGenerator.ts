// src/lib/backend/workflowGenerator.ts

// Function to generate basic CRUD operations for a model
export const generateCrudWorkflow = (modelName: string) => {
  // Capitalize the model name for consistency in function names
  const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);

  return {
    // Create operation - to add a new record
    create: `
    async function create${capitalizedModelName}(data) {
      try {
        const newRecord = await ${modelName}.create(data);
        return newRecord;
      } catch (error) {
        throw new Error("Error creating ${capitalizedModelName}: " + error.message);
      }
    }`,

    // Read operation - to retrieve a record by ID or query
    read: `
    async function get${capitalizedModelName}(id) {
      try {
        const record = await ${modelName}.findById(id);
        if (!record) throw new Error("${capitalizedModelName} not found");
        return record;
      } catch (error) {
        throw new Error("Error fetching ${capitalizedModelName}: " + error.message);
      }
    }`,

    // Update operation - to modify a record based on its ID
    update: `
    async function update${capitalizedModelName}(id, data) {
      try {
        const updatedRecord = await ${modelName}.findByIdAndUpdate(id, data, { new: true });
        if (!updatedRecord) throw new Error("${capitalizedModelName} not found for update");
        return updatedRecord;
      } catch (error) {
        throw new Error("Error updating ${capitalizedModelName}: " + error.message);
      }
    }`,

    // Delete operation - to delete a record by its ID
    delete: `
    async function delete${capitalizedModelName}(id) {
      try {
        const deletedRecord = await ${modelName}.findByIdAndDelete(id);
        if (!deletedRecord) throw new Error("${capitalizedModelName} not found for deletion");
        return deletedRecord;
      } catch (error) {
        throw new Error("Error deleting ${capitalizedModelName}: " + error.message);
      }
    }`,

    // Example for find operation with filters
    find: `
    async function find${capitalizedModelName}s(filters = {}) {
      try {
        const records = await ${modelName}.find(filters);
        return records;
      } catch (error) {
        throw new Error("Error finding ${capitalizedModelName}s: " + error.message);
      }
    }`,

    // Example for paginated find operation
    findPaginated: `
    async function findPaginated${capitalizedModelName}s(page = 1, limit = 10) {
      try {
        const skip = (page - 1) * limit;
        const records = await ${modelName}.find().skip(skip).limit(limit);
        return records;
      } catch (error) {
        throw new Error("Error paginating ${capitalizedModelName}s: " + error.message);
      }
    }`,
  };
};
